#!/usr/bin/env python3
"""Server TẠM cho app Vừa học vừa chơi - Lớp 1, chạy trên máy này.

Mục đích: cho user test ngay bản mới nhất mà không phải chờ GitHub Pages
(cache Pages từng hiện bản cũ tới vài phút). Pages vẫn là nơi bàn giao chính
thức, lâu dài; server này chỉ là tạm, chết khi VM restart.

Cách dùng (KHUYẾN NGHỊ: chạy bằng Python của Piper để có /tts):
  ~/workspace/stremio-ai-dubbing/piper-spike/.venv/bin/python server.py --port 20200
  # Nếu chạy bằng python3 hệ thống, /tts sẽ trả 503 và app tự về giọng máy.

- Phục vụ index.html ở gốc (chuyển hướng tới dist/...) và file dist mới nhất.
- HTML luôn trả Cache-Control: no-cache để tải lại là thấy bản mới, không
  bị cache trình duyệt / Pages giữ bản cũ.
- /health trả {"ok": true, "dist_mtime": ..., "tts": true/false}.
- /tts?text=... : tổng hợp giọng Việt bằng Piper vi_VN-vais1000-medium
  (giọng đã có sẵn trên máy, nạp 1 lần rồi tổng hợp ~0.15s/câu, cache
  theo hash của câu vào tts-cache/ để câu lặp lại không phải tổng hợp lại).
  Chỉ dùng cho tiếng Việt; tiếng Anh vẫn dùng giọng máy en-US của trình
  duyệt (trình duyệt máy tính thường có sẵn giọng Anh, chỉ thiếu giọng Việt).
  Nếu /tts không có (chạy bằng python hệ thống, hoặc file giọng thiếu),
  app tự động về giọng máy SpeechSynthesis, không hỏng.
- Chỉ bind 127.0.0.1: tunnel (localhost.run) forward tới localhost, không
  mở trực tiếp ra ngoài. KHÔNG dùng cổng 20128 và KHÔNG dùng key tunnl_dich
  của dịch vụ dịch AutoCAD.
"""
import argparse
import hashlib
import http.server
import io
import json
import os
import re
import socketserver
import threading
import urllib.parse
import wave

HERE = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(HERE, "dist", "vua-hoc-vua-choi-lop1-day-du.html")
CACHE_DIR = os.path.join(HERE, "tts-cache")
VOICE_PATH = "/home/hatch/workspace/stremio-ai-dubbing/piper-voices/vi_VN-vais1000-medium.onnx"

_voice = None
_voice_lock = threading.Lock()
_voice_tried = False


def get_voice():
    """Nạp giọng Piper 1 lần, trả None nếu không có piper/giọng (server vẫn chạy)."""
    global _voice, _voice_tried
    if _voice is not None:
        return _voice
    if _voice_tried:
        return None
    _voice_tried = True
    try:
        if not os.path.exists(VOICE_PATH):
            print("[tts] khong co file giong:", VOICE_PATH, flush=True)
            return None
        from piper import PiperVoice

        _voice = PiperVoice.load(VOICE_PATH)
        print("[tts] da nap giong Piper, sample_rate:", _voice.config.sample_rate, flush=True)
        return _voice
    except Exception as e:  # noqa: BLE001 - server van phai song khi khong co piper
        print("[tts] khong nap duoc Piper:", e, flush=True)
        return None


def synthesize_vi(text):
    """Trả bytes WAV cho câu tiếng Việt, dùng cache theo hash."""
    clean = re.sub(r"<[^>]*>", " ", text).strip()
    if not clean or len(clean) > 500:
        return None
    os.makedirs(CACHE_DIR, exist_ok=True)
    key = hashlib.sha256(clean.encode("utf-8")).hexdigest()
    cached = os.path.join(CACHE_DIR, key + ".wav")
    if os.path.exists(cached):
        with open(cached, "rb") as f:
            return f.read()
    voice = get_voice()
    if voice is None:
        return None
    with _voice_lock:
        buf = io.BytesIO()
        with wave.open(buf, "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(voice.config.sample_rate)
            voice.synthesize_wav(clean, w)
        data = buf.getvalue()
    if len(data) <= 44:  # chỉ có header, không có audio
        return None
    with open(cached, "wb") as f:
        f.write(data)
    return data


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=HERE, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/health":
            body = json.dumps(
                {"ok": True, "dist_mtime": os.path.getmtime(DIST) if os.path.exists(DIST) else 0,
                 "tts": os.path.exists(VOICE_PATH)}
            ).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if parsed.path == "/tts":
            qs = urllib.parse.parse_qs(parsed.query)
            text = (qs.get("text", [""])[0] or "").strip()
            if not text:
                self.send_error(400, "thieu text")
                return
            data = synthesize_vi(text)
            if data is None:
                body = json.dumps({"ok": False, "error": "tts unavailable"}).encode()
                self.send_response(503)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Content-Length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)
                return
            self.send_response(200)
            self.send_header("Content-Type", "audio/wav")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Cache-Control", "public, max-age=86400")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        return super().do_GET()

    def end_headers(self):
        if self.path.endswith(".html") or self.path == "/":
            self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, fmt, *args):
        print("[server]", self.address_string(), fmt % args, flush=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--port", type=int, default=20200)
    args = ap.parse_args()
    with socketserver.ThreadingTCPServer(("127.0.0.1", args.port), Handler) as httpd:
        httpd.allow_reuse_address = True
        httpd.daemon_threads = True
        print(f"[server] dang phuc vu {HERE} o http://127.0.0.1:{args.port}/", flush=True)
        print(f"[server] /health: http://127.0.0.1:{args.port}/health", flush=True)
        print(f"[server] /tts: http://127.0.0.1:{args.port}/tts?text=...", flush=True)
        httpd.serve_forever()


if __name__ == "__main__":
    main()

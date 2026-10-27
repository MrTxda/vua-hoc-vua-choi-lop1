# Server tạm cho app Vừa học vừa chơi — Lớp 1

## URL tạm (kiểm chứng ngày 2026-10-27)

- ~~https://30679a5a27f50d.lhr.life/~~ — ĐÃ HỦY ngày 2026-10-27, link này đã chết (no tunnel).
- Mở link trên là vào thẳng app (index chuyển hướng tới file dist mới nhất).
- Kiểm tra server còn sống: https://30679a5a27f50d.lhr.life/health
  phải trả `{"ok": true, ...}`.

## Vì sao dùng server tạm?

GitHub Pages từng hiện bản cũ tới vài phút sau mỗi lần push, gây nhầm
lẫn khi test (đã gặp ở các lần sửa giọng đọc và chân trang). Server này
phục vụ trực tiếp file dist trên máy, HTML trả `Cache-Control: no-cache`,
nên sau mỗi lần build, tải lại trang là thấy bản mới ngay.

Pages vẫn là nơi bàn giao chính thức, lâu dài:
https://mrtxda.github.io/vua-hoc-vua-choi-lop1/

## Cấu hình (đừng đổi tùy tiện)

- Server: `server.py`, cổng **20200**, bind 127.0.0.1, phục vụ thư mục gốc
  của dự án này (`index.html` + `dist/`).
- Tunnel: `localhost.run` qua key `~/.ssh/lr_tunnel`, URL ghi vào
  `server-url.txt`. URL này KHÔNG ổn định: qua restart ngày 2026-10-27
  nó giữ nguyên một lần, nhưng đến 21:20 cùng ngày tunnel tự ngắt vì
  "tunnel activity timeout", kết nối lại ra URL mới
  `https://30679a5a27f50d.lhr.life/` (URL cũ `34fb...` đã chết).
  Luôn lấy URL hiện tại trong `server-url.txt`, không dùng URL cũ.
- **KHÔNG đụng tới dịch vụ dịch AutoCAD**: dịch vụ đó chạy cổng 20128,
  tunnel tunnl.gg key `tunnl_dich`, URL cố định
  https://ruby-river-f322d336.tunnl.gg — server tạm này dùng cổng và key
  hoàn toàn khác, dịch vụ dịch vẫn đang chạy bình thường.

## Giọng Việt từ server (cho trình duyệt máy tính)

Trình duyệt trên máy tính thường không có giọng Tiếng Việt, nên app
không dùng giọng máy cho tiếng Việt khi mở qua server này. Thay vào đó,
app lấy âm thanh từ `/tts` của server: giọng Piper vi_VN-vais1000-medium
đã có sẵn trên máy, nạp 1 lần, tổng hợp ~0.15s/câu, cache theo hash câu
vào `tts-cache/` (câu lặp lại trả ngay trong 0.04s). Tiếng Anh vẫn dùng
giọng en-US của trình duyệt (máy tính thường có sẵn).

Quy tắc trong app (`src/template.html`, hàm `docTiengViet`):
- Có server `/tts` thì dùng âm thanh server, hết câu Việt mới đọc từ Anh
  (bài Nghe và phản hồi Tiếng Anh nối theo Promise, không hẹn giờ cố định).
- Không có server (mở bằng `file://`, Pages, hoặc server tạm tắt) thì
  tự về giọng máy SpeechSynthesis, không hỏng. Chế độ phụ huynh báo rõ
  "Đang dùng giọng Việt từ server" khi server đang bật.

## Khởi động lại (khi VM restart hoặc server/tunnel chết)

Server và tunnel này **không tự khởi động lại** sau VM restart.
Chạy lại 2 lệnh (hoặc nhắn Muse "khởi động lại server tạm app lớp 1").
Lưu ý dùng Python của Piper (không phải python3 hệ thống) để có `/tts`:

```bash
~/workspace/stremio-ai-dubbing/piper-spike/.venv/bin/python ~/workspace/vua-hoc-vua-choi/server.py --port 20200
bash ~/workspace/stremio-ai-dubbing/bin/lr-tunnel.sh 20200 ~/workspace/vua-hoc-vua-choi/server-url.txt
```

Sau đó đọc URL mới trong `server-url.txt` (URL cũ sẽ hết hiệu lực).

## Chia sẻ cho nhiều máy (2026-10-27)

Link https://30679a5a27f50d.lhr.life/ mở được từ nhiều máy, không
cần đăng nhập, vì tunnel localhost.run đưa cổng 20200 ra Internet.
Trước khi chia sẻ rộng đã kiểm tra và chặn: `.git` (từng trả 200),
liệt kê thư mục, `tts-cache/`, `server-url.txt` — tất cả giờ trả 404,
chỉ còn file app, `/health`, `/tts` là mở được.

Giới hạn khi dùng đông: `/tts` tổng hợp nối tiếp (khóa khi tổng hợp),
mỗi câu ~0.15s, nên 30 máy bấm cùng lúc sẽ xếp hàng vài giây; máy chủ
này không phải server sản xuất, không có xác thực (ai có link cũng
dùng được `/tts`). Dùng lâu dài cho nhiều máy thì dùng GitHub Pages
https://mrtxda.github.io/vua-hoc-vua-choi-lop1/ (ổn định, không phụ
thuộc máy này), còn link server tạm chỉ để có giọng Việt trên máy tính.

## Dừng server tạm

Nhắn Muse "dừng server tạm app lớp 1", hoặc dừng 2 tiến trình
`server.py --port 20200` và `lr-tunnel.sh 20200`.

## Quy trình trước mỗi lần sửa (bắt buộc)

```bash
python3 src/build.py
node check-audio.js   # chỉ bàn giao khi AUDIO CHECK: ALL PASS
```

Server phục vụ file dist vừa build, nên không cần push lên Pages
để test — nhưng khi chốt bản cuối, vẫn push lên Pages như bình thường.

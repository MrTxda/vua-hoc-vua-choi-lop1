# Server tạm cho app Vừa học vừa chơi — Lớp 1

## URL tạm (kiểm chứng ngày 2026-10-27)

- https://34fb7a82c4864e.lhr.life/
- Mở link trên là vào thẳng app (index chuyển hướng tới file dist mới nhất).
- Kiểm tra server còn sống: https://34fb7a82c4864e.lhr.life/health
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
  `server-url.txt`. URL dạng `*.lhr.life` này **đổi mỗi lần tunnel restart**,
  không ổn định như tunnel dịch.
- **KHÔNG đụng tới dịch vụ dịch AutoCAD**: dịch vụ đó chạy cổng 20128,
  tunnel tunnl.gg key `tunnl_dich`, URL cố định
  https://ruby-river-f322d336.tunnl.gg — server tạm này dùng cổng và key
  hoàn toàn khác, dịch vụ dịch vẫn đang chạy bình thường.

## Khởi động lại (khi VM restart hoặc server/tunnel chết)

Server và tunnel này **không tự khởi động lại** sau VM restart.
Chạy lại 2 lệnh (hoặc nhắn Muse "khởi động lại server tạm app lớp 1"):

```bash
python3 ~/workspace/vua-hoc-vua-choi/server.py --port 20200
bash ~/workspace/stremio-ai-dubbing/bin/lr-tunnel.sh 20200 ~/workspace/vua-hoc-vua-choi/server-url.txt
```

Sau đó đọc URL mới trong `server-url.txt` (URL cũ sẽ hết hiệu lực).

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

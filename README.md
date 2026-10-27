# Vừa học vừa chơi — Lớp 1 (đủ các môn)

- Repo: https://github.com/MrTxda/vua-hoc-vua-choi-lop1
- Dùng trực tuyến (GitHub Pages): https://mrtxda.github.io/vua-hoc-vua-choi-lop1/

## Dùng ngay (không cần build lại)

Mở file `dist/vua-hoc-vua-choi-lop1-day-du.html` bằng cách nhấp đúp
hoặc kéo thả vào trình duyệt Chrome / Edge / Firefox / Safari.
Không cần server, không cần mạng (trừ giọng đọc có sẵn của trình duyệt).

## Dùng cho nhiều máy

- **Link lâu dài, dùng cho nhiều máy:** GitHub Pages
  https://mrtxda.github.io/vua-hoc-vua-choi-lop1/
  (repo PUBLIC, không cần đăng nhập, máy nào mở cũng được).
  Hạn chế: bản Pages không có server `/tts`, nên trên máy tính
  không có giọng Tiếng Việt thì giọng đọc sẽ về giọng máy.
- **Link server tạm, có giọng Việt cho máy tính:** ĐÃ HỦY ngày
  2026-10-27 theo lệnh của user (xem `SERVER-TAM.md`). Từ nay chỉ
  dùng link Pages ở trên.

## Cấu trúc nguồn (đã tách riêng, theo lựa chọn ngày 2026-10-27)

```
vua-hoc-vua-choi/
  src/
    template.html        Lõi đã kiểm chứng: Tiếng Việt, Toán, TNXH + 1.000 câu cũ
    data-daoduc.js       Đạo đức: 40 câu
    data-mithuat.js      Mĩ thuật: 30 câu + bảng vẽ tự do
    data-thechat.js      Giáo dục thể chất: 30 câu + vận động đếm số
    data-trainghiem.js   Hoạt động trải nghiệm: 30 câu + bảng việc tốt
    data-tienganh.js     Tiếng Anh: 107 từ, 214 câu (107 đọc + 107 nghe)
    data-minigame.js     Khu vui chơi thưởng: bắt bóng, lật thẻ, tìm sao
    data-2048.js        Trò chơi 2048 bản lớp 1 (mục tiêu 128)
    build.py             Gộp nguồn thành 1 file HTML duy nhất
  dist/
    vua-hoc-vua-choi-lop1-day-du.html   File bàn giao, mở là chạy
  SOURCES.md             Folder Drive đã kiểm tra và giới hạn sử dụng
```

Tổng ngân hàng sau khi gộp: **1.344 câu** (1.000 câu cũ + 344 câu mới,
sau khi xóa mục Âm nhạc 30 câu và tăng Tiếng Anh từ 60 lên 214 câu:
Đạo đức 40 + Mĩ thuật 30 + Thể chất 30 + Trải nghiệm 30 + Tiếng Anh 214).
Các bài tương tác (vẽ, vận động, việc tốt) không tính vào số câu trắc nghiệm.

## Build lại sau khi sửa nguồn

```bash
cd src
python3 build.py
```

File mới sẽ ghi đè `dist/vua-hoc-vua-choi-lop1-day-du.html`.
**Không sửa file dist bằng tay** — lần build sau sẽ ghi đè mất.

## Tự kiểm tra âm thanh trước mỗi lần push (bắt buộc từ 2026-10-27)

Lỗi âm thanh ngày 2026-10-27 chỉ lộ khi chạy đúng luồng chơi thật
(kiểm tra ngân hàng thì vẫn đúng): bài Nghe tiếng Anh bị rơi mất
từ cần đọc vì `batDauGame` không giữ `docEn`, beep đè lên giọng đọc,
AudioContext không resume khi bắt đầu ở trạng thái suspended.
Vì vậy, sau mỗi lần sửa, chạy trước khi push:

```bash
python3 src/build.py
node check-audio.js
```

Chỉ push khi kết quả là `AUDIO CHECK: ALL PASS`. File kiểm tra này
mô phỏng AudioContext/SpeechSynthesis/DOM và chạy đúng
`batDauGame` → `renderCauHoi` → `chonDapAn` → `cauTiepTheo`,
không chỉ đếm câu trong ngân hàng.

## Thêm một môn mới

1. Tạo `src/data-tenmon.js` theo mẫu `data-daoduc.js`:
   - `MON_HOC.push({id, ten, icon, lop, moTa})`
   - `GAME_THEO_MON.tenmon = [{id, ten, moTa}, ...]`
   - Mỗi câu: `NGAN_HANG.push({mon, game, cau, dapAn, luaChon: tron([dung, ...sai]), ...})`
2. Chạy lại `python3 build.py`.
3. Kiểm tra: mở file dist, vào môn mới, chơi thử một lượt.

## Vì sao không tách thành JSON rồi fetch?

Khi mở bằng `file://` (nhấp đúp), trình duyệt chặn `fetch()` đọc file
local vì lý do bảo mật, nên app tách JSON sẽ hỏng ngay. Gộp bằng thẻ
`<script>` như build này thì vẫn mở offline được, đồng thời lúc làm
vẫn giữ được nguồn tách riêng từng môn.

## Lưu ý về nội dung

Các bài tập trong app là bài tập tự biên theo khung chương trình
lớp 1, không sao chép nguyên văn trang sách giáo khoa và không nhúng
file PDF của sách vào app. Xem chi tiết trong `SOURCES.md`.

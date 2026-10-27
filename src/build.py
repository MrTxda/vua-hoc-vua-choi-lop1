#!/usr/bin/env python3
"""
BUILD: Nguồn tách riêng -> xuất ra 1 file HTML duy nhất
--------------------------------------------------------
Cách dùng (chạy trong thư mục chứa file này, hoặc từ bất cứ đâu):
    python3 build.py
    python3 build.py --out ../dist/vua-hoc-vua-choi-lop1-day-du.html

Nguyên tắc đã chọn với người dùng ngày 2026-10-27:
- Lúc LÀM: mỗi môn là 1 file src/data-*.js riêng, dễ sửa, dễ thêm môn.
- Lúc GIAO: gộp tất cả vào đúng 1 file HTML, nhấp đúp là chạy,
  không cần server, không cần mạng.
- KHÔNG dùng fetch() để nạp JSON: fetch bị trình duyệt chặn khi mở
  bằng file://, nên tách JSON sẽ hỏng khi nhấp đúp. Gộp bằng
  <script> (như build này làm) thì vẫn mở offline được.

Build làm gì, theo thứ tự:
1. Đọc src/template.html (lõi đã kiểm chứng: 1.000 câu cũ).
2. Đọc tất cả src/data-*.js theo thứ tự tên file.
3. Thay placeholder /* __BUILD_EXTRA__ */ trong template bằng
   nội dung các file dữ liệu đó (chỉ là mã JS, không thêm thẻ
   <script> mới, vì placeholder đã nằm trong một thẻ <script>).
4. Ghi ra dist/*.html và in số file, dung lượng để kiểm tra.

Muốn thêm môn mới:
- Tạo src/data-tenmon.js theo mẫu data-daoduc.js:
  MON_HOC.push(...); GAME_THEO_MON.tenmon = [...];
  rồi NGAN_HANG.push(...) cho từng câu hỏi (đáp án xáo bằng tron()).
- Chạy lại build.py. Không sửa file dist bằng tay, vì lần build
  sau sẽ ghi đè.
"""
import argparse
import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
PLACEHOLDER = "/* __BUILD_EXTRA__ */"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(HERE.parent / "dist" / "vua-hoc-vua-choi-lop1-day-du.html"))
    args = ap.parse_args()

    template_path = HERE / "template.html"
    if not template_path.exists():
        print("Thiếu src/template.html", file=sys.stderr)
        return 1
    template = template_path.read_text(encoding="utf-8")
    if PLACEHOLDER not in template:
        print("Template thiếu placeholder __BUILD_EXTRA__", file=sys.stderr)
        return 1

    data_files = sorted(HERE.glob("data-*.js"))
    if not data_files:
        print("Không tìm thấy file src/data-*.js", file=sys.stderr)
        return 1

    parts = []
    for f in data_files:
        parts.append(f"\n/* ===== {f.name} (gộp bởi build.py) ===== */\n" + f.read_text(encoding="utf-8"))
    extra = "\n".join(parts)

    out_text = template.replace(PLACEHOLDER, extra, 1)
    if PLACEHOLDER in out_text:
        print("Cảnh báo: placeholder vẫn còn sau khi thay", file=sys.stderr)

    out_path = pathlib.Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(out_text, encoding="utf-8")
    print(f"Đã build: {out_path}")
    print(f"Nguồn dữ liệu: {', '.join(f.name for f in data_files)}")
    print(f"Dung lượng file xuất ra: {len(out_text.encode('utf-8')):,} byte, {out_text.count(chr(10)) + 1} dòng")
    print("Mở file xuất ra bằng cách nhấp đúp, không cần server.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

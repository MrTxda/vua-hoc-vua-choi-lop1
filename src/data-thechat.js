// ============================================================
// MÔN GIÁO DỤC THỂ CHẤT - 30 câu trắc nghiệm + bài vận động đếm số
// Bài vận động chỉ là hướng dẫn nhẹ nhàng trong lớp / ở nhà có
// người lớn bên cạnh, không thay thế giờ học thể chất của trường.
// ============================================================
const THECHAT_Q = [
  {nhom:'Khởi động', emoji:'🤸', cau:'Trước khi vận động, bé nên làm gì?', dung:'Khởi động nhẹ nhàng', sai:['Chạy ngay thật nhanh','Ngồi im không cử động']},
  {nhom:'Khởi động', emoji:'🦵', cau:'Khởi động giúp cơ thể bé làm gì?', dung:'Nóng lên, tránh bị đau', sai:['Mệt ngay','Không có tác dụng']},
  {nhom:'Khởi động', emoji:'🙆', cau:'Khởi động tay, bé nên làm gì?', dung:'Xoay tay nhẹ nhàng', sai:['Vung tay thật mạnh','Không cử động tay']},
  {nhom:'Đi bộ', emoji:'🚶', cau:'Đi bộ đúng cách, bé nên làm gì?', dung:'Đi thẳng người, bước đều', sai:['Đi lom khom','Chạy lung tung']},
  {nhom:'Chạy', emoji:'🏃', cau:'Chạy trong sân trường, bé nên chạy ở đâu?', dung:'Chạy ở sân, tránh chỗ đông người', sai:['Chạy trong lớp học','Chạy ra đường']},
  {nhom:'Chạy', emoji:'🛑', cau:'Nghe hiệu lệnh dừng, bé nên làm gì?', dung:'Dừng lại ngay', sai:['Chạy tiếp','Quay lại chạy ngược']},
  {nhom:'Nhảy', emoji:'🦘', cau:'Nhảy lò cò, bé nhảy bằng mấy chân?', dung:'Một chân', sai:['Hai chân cùng lúc','Không cần chân']},
  {nhom:'Nhảy', emoji:'⬆️', cau:'Nhảy lên, bé tiếp đất bằng gì?', dung:'Hai bàn chân, hơi chùng gối', sai:['Đầu gối thẳng cứng','Một bàn chân']},
  {nhom:'Bóng', emoji:'⚽', cau:'Chơi bóng, bé nên làm gì?', dung:'Chơi cùng bạn, không đá vào bạn', sai:['Đá bóng vào bạn','Giành bóng một mình']},
  {nhom:'Bóng', emoji:'🏀', cau:'Ném bóng vào rổ, bé nên làm gì?', dung:'Ngắm rổ rồi ném nhẹ', sai:['Ném thật mạnh vào bạn','Ném bóng ra ngoài sân']},
  {nhom:'An toàn', emoji:'🩹', cau:'Bé bị ngã trầy xước nhẹ, bé nên làm gì?', dung:'Nói với cô giáo, rửa vết thương', sai:['Giấu không nói','Tự bôi thuốc lạ']},
  {nhom:'An toàn', emoji:'🧗', cau:'Chơi cầu trượt, bé nên làm gì?', dung:'Xếp hàng, trượt một mình một lượt', sai:['Chen lấn trượt cùng lúc','Trèo ngược cầu trượt']},
  {nhom:'An toàn', emoji:'🪢', cau:'Chơi xích đu, bé nên làm gì?', dung:'Ngồi chắc, không đứng lên đu', sai:['Đứng lên đu thật cao','Nhảy khỏi đu đang đu']},
  {nhom:'An toàn', emoji:'🌞', cau:'Vận động ngoài nắng, bé cần gì?', dung:'Đội mũ và uống nước', sai:['Không đội mũ, không uống nước','Mặc áo dày']},
  {nhom:'Uống nước', emoji:'💧', cau:'Sau khi vận động, bé nên uống nước thế nào?', dung:'Uống từng ngụm nhỏ', sai:['Uống một hơi thật nhiều','Không uống nước']},
  {nhom:'Uống nước', emoji:'🥤', cau:'Khi khát sau khi chạy, bé nên uống gì?', dung:'Nước lọc', sai:['Nước ngọt có ga','Không uống gì']},
  {nhom:'Nghỉ ngơi', emoji:'😮‍💨', cau:'Sau khi vận động mệt, bé nên làm gì?', dung:'Đi bộ chậm và thở đều', sai:['Ngồi xổm ngay','Chạy tiếp']},
  {nhom:'Nghỉ ngơi', emoji:'🛌', cau:'Tối trước ngày học thể chất, bé nên làm gì?', dung:'Ngủ đủ giấc', sai:['Thức khuya chơi','Không ngủ']},
  {nhom:'Trang phục', emoji:'👟', cau:'Học thể chất, bé nên mang gì?', dung:'Giày thể thao', sai:['Dép lê','Giày cao gót']},
  {nhom:'Trang phục', emoji:'👕', cau:'Học thể chất, bé nên mặc gì?', dung:'Quần áo thoải mái', sai:['Áo dài bó sát','Quần áo dày nhiều lớp']},
  {nhom:'Đội nhóm', emoji:'🤝', cau:'Chơi trò chơi tập thể, bé nên làm gì?', dung:'Chơi cùng đội, tuân thủ luật', sai:['Chơi một mình','Phá luật chơi']},
  {nhom:'Đội nhóm', emoji:'🏆', cau:'Đội bé thua trò chơi, bé nên làm gì?', dung:'Vui vẻ, chúc mừng đội bạn', sai:['Khóc và giận bạn','Đổ lỗi cho bạn']},
  {nhom:'Đội nhóm', emoji:'👏', cau:'Bạn trong đội làm tốt, bé nên làm gì?', dung:'Khen và vỗ tay cho bạn', sai:['Ghen tị với bạn','Không nói gì']},
  {nhom:'Tư thế', emoji:'🧍', cau:'Đứng nghiêm, bé nên làm gì?', dung:'Đứng thẳng, tay xuôi', sai:['Đứng lom khom','Ngồi xuống đất']},
  {nhom:'Tư thế', emoji:'🪑', cau:'Ngồi học, bé nên ngồi thế nào?', dung:'Ngồi thẳng lưng', sai:['Nằm ra bàn','Ngồi vẹo người']},
  {nhom:'Rèn luyện', emoji:'💪', cau:'Tập thể dục mỗi ngày giúp bé làm gì?', dung:'Khỏe mạnh và nhanh nhẹn', sai:['Mệt và ốm','Không có tác dụng']},
  {nhom:'Rèn luyện', emoji:'🌅', cau:'Buổi sáng, bé nên làm gì?', dung:'Tập vài động tác nhẹ', sai:['Nằm mãi trên giường','Chạy ngay không khởi động']},
  {nhom:'Vệ sinh', emoji:'🧼', cau:'Sau giờ thể chất, bé nên làm gì?', dung:'Rửa tay, lau mồ hôi', sai:['Ăn luôn không rửa','Mặc nguyên áo ướt']},
  {nhom:'Vệ sinh', emoji:'👕', cau:'Áo ướt mồ hôi sau khi vận động, bé nên làm gì?', dung:'Thay áo khô', sai:['Mặc tiếp áo ướt','Cởi áo ra ngoài']},
  {nhom:'Nghe hiệu lệnh', emoji:'📣', cau:'Cô giáo thổi còi, bé nên làm gì?', dung:'Dừng lại và nghe cô dặn', sai:['Chạy tiếp không nghe','Hét to hơn còi'], },
];
MON_HOC.push({id:'thechat', ten:'Giáo dục thể chất', icon:'🏃', lop:'mon-toan', moTa:'Khởi động, vận động an toàn và bài đếm số lần vận động!'});
GAME_THEO_MON.thechat = [
  {id:'quiz', ten:'🏃 Trắc nghiệm Thể chất', moTa:'30 câu về khởi động, an toàn và chơi cùng đội.'},
  {id:'vandong', ten:'💪 Bài vận động đếm số', moTa:'Làm theo từng động tác và bấm đếm mỗi lần làm xong.'},
];
THECHAT_Q.forEach(it => {
  NGAN_HANG.push({mon:'thechat', game:'quiz', cau:it.cau, dapAn:it.dung, luaChon:tron([it.dung].concat(it.sai)), nhom:it.nhom, emoji:it.emoji});
});
let _vanDongDem = 0;
function renderVanDong(){
  _vanDongDem = 0;
  const dongTac = ['🤸 Giơ hai tay lên cao', '🦵 Nhún gối 5 lần', '🚶 Đi bộ tại chỗ', '👏 Vỗ tay theo nhịp', '🧍 Đứng thẳng, hít thở sâu'];
  document.getElementById('noiDungGame').innerHTML =
    '<div class="khung-bai"><h2>💪 Bài vận động đếm số</h2><p class="mo-ta">Bé làm theo từng động tác (có người lớn bên cạnh), làm xong một động tác thì bấm “Bé làm xong 1 lần”.</p>'
    + dongTac.map(d => '<p style="font-size:24px;background:#fffbe6;border-radius:16px;padding:12px">' + d + '</p>').join('')
    + '<p style="font-size:28px">Tổng số lần bé đã làm: <b id="demVanDong">0</b></p>'
    + '<div class="ke-trang"><button class="nut nut-xanh" onclick="_vanDongDem++;document.getElementById(\'demVanDong\').textContent=_vanDongDem;amClick()">➕ Bé làm xong 1 lần</button>'
    + '<button class="nut nut-hong" onclick="hoanThanhVanDong()">✅ Hoàn thành vận động</button></div>'
    + '<p style="color:#666;font-size:17px">Lưu ý: chỉ vận động nhẹ nhàng, dừng ngay nếu thấy mệt hoặc đau.</p></div>';
  hienManHinh('manHinhGame');
}
function hoanThanhVanDong(){
  if(_vanDongDem < 5){ toast('Bé làm thêm vài lần nữa nhé, cần ít nhất 5 lần!'); amSai(); return; }
  amHoanThanh(); state.stars += 3; state.points += 20; luu(); kiemTraHuyHieu(); capNhatTieuDe();
  toast('🎉 Tuyệt vời! Bé được +3 sao vì đã vận động xong!');
  veTrangChu();
}

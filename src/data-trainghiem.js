// ============================================================
// MÔN HOẠT ĐỘNG TRẢI NGHIỆM - 30 câu trắc nghiệm + bảng việc tốt
// Bảng việc tốt là danh sách bé tự đánh dấu đã làm trong ngày,
// không chấm điểm đạo đức, chỉ khuyến khích thói quen tốt.
// ============================================================
const TRAINGHIEM_Q = [
  {nhom:'Trường học', emoji:'🏫', cau:'Đến trường, bé nên làm gì đầu tiên?', dung:'Chào cô giáo và các bạn', sai:['Chạy vào lớp không chào','Ngồi một mình']},
  {nhom:'Trường học', emoji:'🎒', cau:'Vào lớp, bé nên để cặp ở đâu?', dung:'Đúng chỗ quy định', sai:['Để giữa lối đi','Ném cặp xuống đất']},
  {nhom:'Trường học', emoji:'🧹', cau:'Lớp học gọn gàng nhờ ai?', dung:'Cả lớp cùng giữ gìn', sai:['Chỉ cô giáo dọn','Một bạn dọn']},
  {nhom:'Bạn bè', emoji:'👫', cau:'Bạn mới chưa quen, bé nên làm gì?', dung:'Làm quen và giúp bạn', sai:['Trêu bạn','Không nói chuyện']},
  {nhom:'Bạn bè', emoji:'🎁', cau:'Sinh nhật bạn, bé nên làm gì?', dung:'Chúc mừng bạn', sai:['Ghen tị với bạn','Không quan tâm']},
  {nhom:'Bạn bè', emoji:'🤝', cau:'Bạn và bé bất đồng, bé nên làm gì?', dung:'Nói nhẹ nhàng và nhường nhau', sai:['Đánh nhau','Không chơi nữa']},
  {nhom:'Gia đình', emoji:'🏠', cau:'Cuối tuần ở nhà, bé có thể giúp gì?', dung:'Dọn đồ chơi, tưới cây', sai:['Chơi cả ngày không làm gì','Quấy khóc']},
  {nhom:'Gia đình', emoji:'🍚', cau:'Bé giúp mẹ dọn bàn ăn, đó là gì?', dung:'Việc tốt trong gia đình', sai:['Việc không cần làm','Việc của mẹ']},
  {nhom:'Gia đình', emoji:'👵', cau:'Thăm ông bà, bé nên làm gì?', dung:'Chào hỏi và kể chuyện trường', sai:['Chạy nhảy ầm ĩ','Đòi quà ngay']},
  {nhom:'Thiên nhiên', emoji:'🌱', cau:'Trồng cây trong trường, bé nên làm gì?', dung:'Tưới nước và chăm cây', sai:['Nhổ cây lên xem','Bẻ lá chơi']},
  {nhom:'Thiên nhiên', emoji:'🌧️', cau:'Trời mưa, bé đi tham quan cần gì?', dung:'Áo mưa và đi cùng người lớn', sai:['Đi một mình không áo mưa','Chạy dưới mưa']},
  {nhom:'Thiên nhiên', emoji:'🐦', cau:'Đi dã ngoại, bé thấy chim, bé nên làm gì?', dung:'Ngắm chim từ xa', sai:['Bắt chim về','Ném đá vào chim']},
  {nhom:'An toàn', emoji:'🚸', cau:'Đi tham quan cùng lớp, bé nên làm gì?', dung:'Đi theo hàng, nghe cô dặn', sai:['Chạy tách khỏi lớp','Đi một mình']},
  {nhom:'An toàn', emoji:'🚌', cau:'Lên xe đi tham quan, bé nên làm gì?', dung:'Ngồi ngay ngắn, thắt dây an toàn', sai:['Đứng lên xe','Thò đầu ra cửa']},
  {nhom:'An toàn', emoji:'🗺️', cau:'Bé bị lạc khỏi lớp khi tham quan, bé nên làm gì?', dung:'Đứng yên và gọi cô giáo', sai:['Chạy tìm lung tung','Đi theo người lạ']},
  {nhom:'Vệ sinh', emoji:'🗑️', cau:'Ăn quà khi tham quan, vỏ bánh bé bỏ đâu?', dung:'Thùng rác', sai:['Vứt xuống đất','Giấu vào túi']},
  {nhom:'Vệ sinh', emoji:'🚰', cau:'Sau khi chơi ngoài sân, bé nên làm gì?', dung:'Rửa tay sạch', sai:['Ăn luôn không rửa','Lau tay vào áo']},
  {nhom:'Kỹ năng', emoji:'🗣️', cau:'Muốn phát biểu, bé nên làm gì?', dung:'Giơ tay xin phép', sai:['Hét to','Nói chen ngang']},
  {nhom:'Kỹ năng', emoji:'👂', cau:'Bạn đang nói, bé nên làm gì?', dung:'Lắng nghe bạn nói hết', sai:['Ngắt lời bạn','Quay đi chỗ khác']},
  {nhom:'Kỹ năng', emoji:'📖', cau:'Kể chuyện trước lớp, bé nên làm gì?', dung:'Nói to, rõ ràng', sai:['Nói nhỏ không ai nghe','Không dám nói']},
  {nhom:'Kỹ năng', emoji:'🧩', cau:'Chơi trò chơi nhóm, bé nên làm gì?', dung:'Chơi cùng nhóm, tuân thủ luật', sai:['Chơi một mình','Phá luật']},
  {nhom:'Kỹ năng', emoji:'🎨', cau:'Làm sản phẩm thủ công, bé nên làm gì?', dung:'Làm cẩn thận và giữ gìn', sai:['Làm ẩu cho xong','Vứt sản phẩm đi']},
  {nhom:'Tình cảm', emoji:'😊', cau:'Bé vui, bé có thể làm gì?', dung:'Chia sẻ niềm vui với bạn', sai:['Giữ niềm vui một mình','Trêu bạn buồn']},
  {nhom:'Tình cảm', emoji:'😢', cau:'Bạn buồn, bé nên làm gì?', dung:'An ủi và chơi cùng bạn', sai:['Cười bạn buồn','Bỏ bạn một mình']},
  {nhom:'Tình cảm', emoji:'😡', cau:'Bé tức giận, bé nên làm gì?', dung:'Hít thở sâu và nói nhẹ nhàng', sai:['Đánh bạn','Hét to']},
  {nhom:'Cộng đồng', emoji:'🏘️', cau:'Sống trong khu phố, bé nên làm gì?', dung:'Chào hỏi hàng xóm lễ phép', sai:['Hét to trong khu phố','Vứt rác ra đường']},
  {nhom:'Cộng đồng', emoji:'🌳', cau:'Công viên gần nhà, bé nên làm gì?', dung:'Giữ gìn sạch sẽ', sai:['Vẽ bậy lên ghế','Bẻ cây']},
  {nhom:'Cộng đồng', emoji:'🚑', cau:'Thấy xe cứu thương, bé nên làm gì?', dung:'Tránh đường cho xe đi', sai:['Chặn đường xe','Chạy theo xe']},
  {nhom:'Tự phục vụ', emoji:'👕', cau:'Buổi sáng đi học, bé nên làm gì?', dung:'Tự mặc quần áo gọn gàng', sai:['Để bố mẹ mặc hộ mọi thứ','Mặc áo ngược']},
  {nhom:'Tự phục vụ', emoji:'🥣', cau:'Ăn sáng xong, bé nên làm gì?', dung:'Dọn bát của mình', sai:['Để bát lung tung','Chạy đi chơi ngay']},
];
MON_HOC.push({id:'trainghiem', ten:'Hoạt động trải nghiệm', icon:'🌟', lop:'mon-song', moTa:'Trường học, bạn bè, gia đình và bảng việc tốt mỗi ngày!'});
GAME_THEO_MON.trainghiem = [
  {id:'quiz', ten:'🌟 Trắc nghiệm Trải nghiệm', moTa:'30 câu về trường học, bạn bè và cộng đồng.'},
  {id:'checklist', ten:'✅ Bảng việc tốt hôm nay', moTa:'Đánh dấu những việc tốt bé đã làm trong ngày.'},
];
TRAINGHIEM_Q.forEach(it => {
  NGAN_HANG.push({mon:'trainghiem', game:'quiz', cau:it.cau, dapAn:it.dung, luaChon:tron([it.dung].concat(it.sai)), nhom:it.nhom, emoji:it.emoji});
});
function renderChecklist(){
  const viec = ['Chào bố mẹ, cô giáo lễ phép', 'Dọn đồ chơi gọn gàng', 'Tưới cây hoặc chăm cây', 'Giúp bố mẹ một việc nhỏ', 'Đọc sách hoặc tập đọc', 'Nhặt rác bỏ vào thùng rác'];
  document.getElementById('noiDungGame').innerHTML =
    '<div class="khung-bai"><h2>✅ Bảng việc tốt hôm nay</h2><p class="mo-ta">Bé đánh dấu những việc bé đã làm thật trong ngày hôm nay nhé!</p>'
    + viec.map((v,i) => '<label style="display:block;text-align:left;font-size:22px;background:#fffbe6;border-radius:14px;padding:12px;margin:10px 0"><input type="checkbox" class="viec-tot" style="width:24px;height:24px"> ' + v + '</label>').join('')
    + '<button class="nut nut-hong" onclick="hoanThanhChecklist()">✅ Bé đã làm xong! Nhận sao</button></div>';
  hienManHinh('manHinhGame');
}
function hoanThanhChecklist(){
  const dem = document.querySelectorAll('.viec-tot:checked').length;
  if(dem === 0){ toast('Bé đánh dấu ít nhất 1 việc đã làm nhé!'); amSai(); return; }
  const sao = Math.min(dem, 5);
  amHoanThanh(); state.stars += sao; state.points += sao * 10; luu(); kiemTraHuyHieu(); capNhatTieuDe();
  toast('🎉 Tuyệt vời! Bé được +' + sao + ' sao vì đã làm ' + dem + ' việc tốt!');
  veTrangChu();
}

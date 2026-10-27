// ============================================================
// MÔN ÂM NHẠC - 30 câu trắc nghiệm + bài tương tác chơi nốt nhạc
// Bài tương tác dùng Web Audio API có sẵn (tone()), không dùng
// file nhạc của sách, không chép lời bài hát trong sách.
// ============================================================
const AMNHAC_Q = [
  {nhom:'Nhạc cụ', emoji:'🥁', cau:'Hình này là nhạc cụ gì?', dung:'Trống', sai:['Đàn guitar','Sáo']},
  {nhom:'Nhạc cụ', emoji:'🎸', cau:'Hình này là nhạc cụ gì?', dung:'Đàn guitar', sai:['Trống','Kèn']},
  {nhom:'Nhạc cụ', emoji:'🎹', cau:'Hình này là nhạc cụ gì?', dung:'Đàn piano', sai:['Sáo','Trống']},
  {nhom:'Nhạc cụ', emoji:'🎺', cau:'Hình này là nhạc cụ gì?', dung:'Kèn', sai:['Đàn guitar','Trống']},
  {nhom:'Nhạc cụ', emoji:'🪈', cau:'Nhạc cụ nào thổi bằng miệng?', dung:'Sáo', sai:['Trống','Đàn piano']},
  {nhom:'Nhạc cụ', emoji:'🥁', cau:'Trống được chơi bằng cách nào?', dung:'Gõ', sai:['Thổi','Kéo']},
  {nhom:'Nhạc cụ', emoji:'🎸', cau:'Đàn guitar được chơi bằng cách nào?', dung:'Gảy dây', sai:['Thổi','Gõ mạnh']},
  {nhom:'Cao thấp', emoji:'🐦', cau:'Tiếng chim hót thường như thế nào?', dung:'Cao và trong', sai:['Trầm và nặng','Rất to và ồn']},
  {nhom:'Cao thấp', emoji:'🐻', cau:'Tiếng gầm của gấu thường như thế nào?', dung:'Trầm và nặng', sai:['Cao và trong','Nhẹ như chim']},
  {nhom:'Nhanh chậm', emoji:'🐇', cau:'Nhạc nhanh giống như con vật nào chạy?', dung:'Thỏ chạy nhanh', sai:['Rùa bò chậm','Gấu ngủ']},
  {nhom:'Nhanh chậm', emoji:'🐢', cau:'Nhạc chậm giống như con vật nào?', dung:'Rùa bò chậm', sai:['Thỏ chạy nhanh','Chim bay nhanh']},
  {nhom:'To nhỏ', emoji:'🔊', cau:'Khi hát to, giọng bé như thế nào?', dung:'To và rõ', sai:['Nhỏ không nghe thấy','Im lặng']},
  {nhom:'To nhỏ', emoji:'🔈', cau:'Khi hát nhỏ, giọng bé như thế nào?', dung:'Nhỏ nhẹ', sai:['Hét thật to','Im lặng luôn']},
  {nhom:'Hát', emoji:'🎤', cau:'Trước khi hát, bé nên làm gì?', dung:'Đứng ngay ngắn, hát rõ lời', sai:['Chạy quanh lớp','Hét to không rõ lời']},
  {nhom:'Hát', emoji:'👏', cau:'Bạn hát hay, bé nên làm gì?', dung:'Vỗ tay khen bạn', sai:['Trêu bạn','Bịt tai lại']},
  {nhom:'Hát', emoji:'🎵', cau:'Bài hát có gì?', dung:'Giai điệu và lời ca', sai:['Chỉ có tiếng ồn','Chỉ có hình vẽ']},
  {nhom:'Nhịp', emoji:'👏', cau:'Vỗ tay theo nhịp giúp bé làm gì?', dung:'Hát đúng nhịp', sai:['Hát nhanh hơn','Không cần nghe nhạc']},
  {nhom:'Nhịp', emoji:'🥁', cau:'Tiếng trống đều đặn giúp bé cảm nhận gì?', dung:'Nhịp của bài hát', sai:['Màu sắc','Hình dạng']},
  {nhom:'Nghe', emoji:'👂', cau:'Nghe nhạc, bé nên làm gì?', dung:'Lắng nghe và cảm nhận', sai:['Hét to át nhạc','Bịt tai lại']},
  {nhom:'Nghe', emoji:'🌧️', cau:'Âm thanh mưa rơi thường như thế nào?', dung:'Nhẹ nhàng, đều đều', sai:['Rất to và chói','Im lặng']},
  {nhom:'Nghe', emoji:'🌊', cau:'Âm thanh sóng biển thường như thế nào?', dung:'Ào ào, lúc to lúc nhỏ', sai:['Im lặng','Chỉ có một nốt']},
  {nhom:'Vận động', emoji:'💃', cau:'Nghe nhạc vui, bé có thể làm gì?', dung:'Nhún nhảy theo nhạc', sai:['Ngồi im không cử động','Chạy ra khỏi lớp']},
  {nhom:'Vận động', emoji:'🕺', cau:'Múa theo nhạc giúp bé làm gì?', dung:'Vận động khỏe và vui', sai:['Mệt và buồn','Không học được gì']},
  {nhom:'Âm thanh', emoji:'🔔', cau:'Tiếng chuông thường như thế nào?', dung:'Trong và vang', sai:['Trầm và nặng','Ồn ào']},
  {nhom:'Âm thanh', emoji:'📣', cau:'Tiếng loa phóng thanh thường như thế nào?', dung:'To và rõ', sai:['Nhỏ không nghe','Chỉ có một nốt']},
  {nhom:'Giữ gìn', emoji:'🎸', cau:'Chơi đàn xong, bé nên làm gì?', dung:'Để đàn gọn gàng', sai:['Ném đàn xuống đất','Để đàn ngoài mưa']},
  {nhom:'Giữ gìn', emoji:'🥁', cau:'Chơi trống xong, bé nên làm gì?', dung:'Để trống đúng chỗ', sai:['Đập trống thật mạnh','Mang trống về nhà']},
  {nhom:'Tập thể', emoji:'🎶', cau:'Cả lớp cùng hát, bé nên làm gì?', dung:'Hát cùng các bạn', sai:['Hát một mình thật to','Không hát gì']},
  {nhom:'Tập thể', emoji:'👫', cau:'Hát tốp ca nghĩa là gì?', dung:'Nhiều bạn cùng hát', sai:['Một bạn hát','Không ai hát']},
  {nhom:'Cảm xúc', emoji:'😊', cau:'Nghe bài hát vui, bé cảm thấy thế nào?', dung:'Vui vẻ', sai:['Buồn ngủ','Sợ hãi']},
];
MON_HOC.push({id:'amnhac', ten:'Âm nhạc', icon:'🎵', lop:'mon-viet', moTa:'Nghe nhạc cụ, cảm nhận cao thấp, nhanh chậm và chơi nốt nhạc!'});
GAME_THEO_MON.amnhac = [
  {id:'quiz', ten:'🎵 Trắc nghiệm Âm nhạc', moTa:'30 câu về nhạc cụ, cao thấp, nhanh chậm.'},
  {id:'notnhac', ten:'🎹 Chơi nốt nhạc', moTa:'Bấm từng nốt Đô Rê Mi để nghe và chơi giai điệu.'},
];
AMNHAC_Q.forEach(it => {
  NGAN_HANG.push({mon:'amnhac', game:'quiz', cau:it.cau, dapAn:it.dung, luaChon:tron([it.dung].concat(it.sai)), nhom:it.nhom, emoji:it.emoji});
});
// Bài tương tác: chơi nốt nhạc bằng Web Audio (tone() có sẵn ở lõi)
function renderNotNhac(){
  const not = [['Đô','C',261],['Rê','D',293],['Mi','E',329],['Fa','F',349],['Sol','G',392],['La','A',440],['Si','B',493]];
  document.getElementById('noiDungGame').innerHTML =
    '<div class="khung-bai"><h2>🎹 Chơi nốt nhạc</h2><p class="mo-ta">Bấm vào từng nốt để nghe. Sau đó bấm “Chơi giai điệu vui” để nghe một đoạn nhạc ngắn!</p>'
    + '<div>' + not.map(n => '<span class="chu-cai" style="width:74px" onclick="tone(' + n[2] + ',0.5)">' + n[0] + '</span>').join('') + '</div>'
    + '<div class="ke-trang"><button class="nut nut-hong" onclick="choiGiaiDieu()">🎶 Chơi giai điệu vui</button>'
    + '<button class="nut nut-xanh" onclick="hoanThanhNhac()">✅ Bé chơi xong! Nhận sao</button></div></div>';
  hienManHinh('manHinhGame');
}
function choiGiaiDieu(){
  [261,329,392,523,392,329,261].forEach((f,i) => tone(f, 0.35, 'triangle', i * 0.3));
}
function hoanThanhNhac(){
  amHoanThanh(); state.stars += 3; state.points += 20; luu(); kiemTraHuyHieu(); capNhatTieuDe();
  toast('🎉 Tuyệt vời! Bé được +3 sao vì đã chơi nốt nhạc!');
  veTrangChu();
}

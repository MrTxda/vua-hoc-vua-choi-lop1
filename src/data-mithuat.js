// ============================================================
// MÔN MĨ THUẬT - 30 câu trắc nghiệm + bảng vẽ tự do (canvas)
// Bảng vẽ chỉ dùng chuột / ngón tay trên chính trình duyệt,
// không tải ảnh lên mạng, không dùng ảnh trong sách.
// ============================================================
const MITHUAT_Q = [
  {nhom:'Màu sắc', emoji:'🔴', cau:'Màu này là màu gì?', dung:'Màu đỏ', sai:['Màu xanh','Màu vàng']},
  {nhom:'Màu sắc', emoji:'🟡', cau:'Màu này là màu gì?', dung:'Màu vàng', sai:['Màu đỏ','Màu tím']},
  {nhom:'Màu sắc', emoji:'🔵', cau:'Màu này là màu gì?', dung:'Màu xanh dương', sai:['Màu đỏ','Màu cam']},
  {nhom:'Màu sắc', emoji:'🟢', cau:'Màu này là màu gì?', dung:'Màu xanh lá', sai:['Màu vàng','Màu hồng']},
  {nhom:'Màu sắc', emoji:'🟠', cau:'Màu cam được tạo từ hai màu nào?', dung:'Đỏ và vàng', sai:['Xanh và đỏ','Vàng và xanh']},
  {nhom:'Màu sắc', emoji:'🟣', cau:'Màu tím được tạo từ hai màu nào?', dung:'Đỏ và xanh dương', sai:['Vàng và đỏ','Xanh lá và vàng']},
  {nhom:'Màu sắc', emoji:'☀️', cau:'Mặt trời thường được tô màu gì?', dung:'Màu vàng', sai:['Màu đen','Màu tím']},
  {nhom:'Màu sắc', emoji:'🌳', cau:'Lá cây thường được tô màu gì?', dung:'Màu xanh lá', sai:['Màu đỏ','Màu trắng']},
  {nhom:'Hình dạng', emoji:'⭕', cau:'Hình này là hình gì?', dung:'Hình tròn', sai:['Hình vuông','Hình tam giác']},
  {nhom:'Hình dạng', emoji:'⬛', cau:'Hình này là hình gì?', dung:'Hình vuông', sai:['Hình tròn','Hình tam giác']},
  {nhom:'Hình dạng', emoji:'🔺', cau:'Hình này là hình gì?', dung:'Hình tam giác', sai:['Hình tròn','Hình vuông']},
  {nhom:'Hình dạng', emoji:'⬛', cau:'Hình chữ nhật khác hình vuông ở điểm nào?', dung:'Có hai cạnh dài, hai cạnh ngắn', sai:['Không có góc','Là hình tròn']},
  {nhom:'Hình dạng', emoji:'🍎', cau:'Quả táo gần giống hình gì?', dung:'Hình tròn', sai:['Hình vuông','Hình tam giác']},
  {nhom:'Hình dạng', emoji:'🏠', cau:'Mái nhà thường giống hình gì?', dung:'Hình tam giác', sai:['Hình tròn','Hình vuông']},
  {nhom:'Dụng cụ', emoji:'🖍️', cau:'Dụng cụ này dùng để làm gì?', dung:'Tô màu', sai:['Cắt giấy','Dán giấy']},
  {nhom:'Dụng cụ', emoji:'✏️', cau:'Bút chì dùng để làm gì?', dung:'Vẽ phác', sai:['Tô màu nước','Cắt giấy']},
  {nhom:'Dụng cụ', emoji:'✂️', cau:'Kéo dùng để làm gì?', dung:'Cắt giấy', sai:['Tô màu','Vẽ']},
  {nhom:'Dụng cụ', emoji:'📄', cau:'Bé vẽ lên đâu?', dung:'Giấy vẽ', sai:['Bàn học','Tường lớp']},
  {nhom:'Dụng cụ', emoji:'🎨', cau:'Bảng màu dùng để làm gì?', dung:'Pha và đựng màu', sai:['Cắt giấy','Dán tranh']},
  {nhom:'Giữ gìn', emoji:'🧹', cau:'Vẽ xong, bé nên làm gì?', dung:'Dọn bàn sạch, cất đồ gọn', sai:['Để đồ lung tung','Vứt màu xuống đất']},
  {nhom:'Giữ gìn', emoji:'👕', cau:'Khi tô màu nước, bé nên làm gì?', dung:'Mặc áo cũ hoặc đeo tạp dề', sai:['Mặc áo trắng mới','Tô lên áo']},
  {nhom:'Quan sát', emoji:'🌸', cau:'Vẽ bông hoa, bé nên quan sát gì?', dung:'Màu hoa, cánh hoa, lá', sai:['Chỉ nhìn lướt qua','Không cần nhìn']},
  {nhom:'Quan sát', emoji:'🐱', cau:'Vẽ con mèo, bé nên quan sát gì?', dung:'Tai, mắt, râu, đuôi mèo', sai:['Chỉ vẽ một đường','Không cần quan sát']},
  {nhom:'Sáng tạo', emoji:'🌈', cau:'Tranh của bé có thể có màu gì?', dung:'Màu bé thích, miễn là đẹp và gọn', sai:['Chỉ được một màu','Màu nào cũng được, vẽ bừa']},
  {nhom:'Sáng tạo', emoji:'🎨', cau:'Bé vẽ tranh về gia đình, bé vẽ ai?', dung:'Bố mẹ và các thành viên trong nhà', sai:['Chỉ vẽ mình bé','Vẽ người lạ']},
  {nhom:'Trưng bày', emoji:'🖼️', cau:'Tranh vẽ xong, bé nên làm gì?', dung:'Giữ gìn và khoe với bố mẹ, cô giáo', sai:['Vò tranh vứt đi','Xé tranh']},
  {nhom:'Trưng bày', emoji:'🏫', cau:'Tranh đẹp của lớp thường được làm gì?', dung:'Treo lên tường lớp', sai:['Cất vào thùng rác','Giấu đi']},
  {nhom:'Màu nóng lạnh', emoji:'🔥', cau:'Màu đỏ, cam, vàng thường gọi là màu gì?', dung:'Màu nóng', sai:['Màu lạnh','Màu tối']},
  {nhom:'Màu nóng lạnh', emoji:'❄️', cau:'Màu xanh dương, xanh lá thường gọi là màu gì?', dung:'Màu lạnh', sai:['Màu nóng','Màu tối']},
  {nhom:'Đường nét', emoji:'〰️', cau:'Đường lượn sóng giống gì?', dung:'Sóng nước', sai:['Đường thẳng','Hình tròn']},
];
MON_HOC.push({id:'mithuat', ten:'Mĩ thuật', icon:'🎨', lop:'mon-toan', moTa:'Nhận biết màu sắc, hình dạng và vẽ tự do trên bảng vẽ!'});
GAME_THEO_MON.mithuat = [
  {id:'quiz', ten:'🎨 Trắc nghiệm Mĩ thuật', moTa:'30 câu về màu sắc, hình dạng, dụng cụ vẽ.'},
  {id:'ve', ten:'🖌️ Bảng vẽ tự do', moTa:'Chọn màu và vẽ bằng chuột hoặc ngón tay.'},
];
MITHUAT_Q.forEach(it => {
  NGAN_HANG.push({mon:'mithuat', game:'quiz', cau:it.cau, dapAn:it.dung, luaChon:tron([it.dung].concat(it.sai)), nhom:it.nhom, emoji:it.emoji});
});
let _veColor = '#ff5d8f', _veDangVe = false;
function renderVe(){
  document.getElementById('noiDungGame').innerHTML =
    '<div class="khung-bai"><h2>🖌️ Bảng vẽ tự do</h2><p class="mo-ta">Chọn màu, rồi vẽ bằng chuột hoặc ngón tay lên bảng dưới đây nhé!</p>'
    + '<div style="margin-bottom:12px">' + ['#ff5d8f','#ff8c42','#ffc93c','#2ec4b6','#4a90e2','#9b5de5','#333333'].map(c =>
        '<button class="nut nut-nho" style="background:' + c + ';color:#fff !important" onclick="_veColor=\'' + c + '\';amClick()">●</button>').join(' ') + '</div>'
    + '<canvas id="veCanvas" width="800" height="380" style="width:100%;max-width:800px;border:3px solid #ffc93c;border-radius:18px;background:#fff;touch-action:none"></canvas>'
    + '<div class="ke-trang"><button class="nut nut-vang" onclick="xoaVe()">🧹 Xóa bảng</button>'
    + '<button class="nut nut-hong" onclick="hoanThanhVe()">✅ Bé vẽ xong! Nhận sao</button></div></div>';
  hienManHinh('manHinhGame');
  const cv = document.getElementById('veCanvas'), ctx = cv.getContext('2d');
  ctx.lineWidth = 6; ctx.lineCap = 'round';
  function pos(e){
    const r = cv.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return {x: (t.clientX - r.left) * cv.width / r.width, y: (t.clientY - r.top) * cv.height / r.height};
  }
  function batDau(e){ e.preventDefault(); _veDangVe = true; const p = pos(e); ctx.strokeStyle = _veColor; ctx.beginPath(); ctx.moveTo(p.x, p.y); }
  function ve(e){ if(!_veDangVe) return; e.preventDefault(); const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); }
  function ketThuc(){ _veDangVe = false; }
  cv.addEventListener('mousedown', batDau); cv.addEventListener('mousemove', ve);
  window.addEventListener('mouseup', ketThuc);
  cv.addEventListener('touchstart', batDau, {passive:false}); cv.addEventListener('touchmove', ve, {passive:false});
  cv.addEventListener('touchend', ketThuc);
}
function xoaVe(){
  const cv = document.getElementById('veCanvas'); if(!cv) return;
  cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); amClick();
}
function hoanThanhVe(){
  amHoanThanh(); state.stars += 3; state.points += 20; luu(); kiemTraHuyHieu(); capNhatTieuDe();
  toast('🎉 Tuyệt vời! Bé được +3 sao vì đã vẽ xong!');
  veTrangChu();
}

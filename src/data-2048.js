// ============================================================
// TRÒ 2048 - BẢN LỚP 1
// Luật chuẩn 2048 (lưới 4x4, trượt để gộp 2 ô giống nhau), nhưng
// điều chỉnh cho bé 6 tuổi:
// - Mục tiêu thắng là ghép đến 128 (thay vì 2048, vốn rất khó
//   với học sinh lớp 1). Đạt 128 là được +2 sao thưởng, bé vẫn
//   được chơi tiếp để ghép lên cao hơn nếu muốn.
// - Điều khiển 3 cách: phím mũi tên / WASD, vuốt trên màn hình
//   cảm ứng, và 4 nút bấm to ⬆️⬇️⬅️➡️ dưới bàn cờ.
// - Điểm tốt nhất lưu riêng ở localStorage (khóa lop1_2048_best),
//   không làm lệch thống kê đúng/sai theo môn.
// Phần logic gộp ô (_2048Move) là hàm thuần túy (không chạm DOM)
// để có thể kiểm tra bằng Node: _2048Move([2,2,0,0], 'left') phải
// cho ra [4,0,0,0] và điểm +4.
// ============================================================
const _2048_MAU = {0:'#eeeeee', 2:'#ffecb3', 4:'#ffd54f', 8:'#ffb74d', 16:'#ff8a65', 32:'#f06292', 64:'#ba68c8', 128:'#4db6ac', 256:'#4a90e2', 512:'#9b5de5', 1024:'#ff5d8f', 2048:'#ffc93c'};
let _2048Ban = [], _2048Diem = 0, _2048DaThuong = false, _2048KetThuc = false;
let _2048PhimHandler = null, _2048ChamX = 0, _2048ChamY = 0;

function _2048GopHang(hang){
  // Gộp 1 hàng sang trái: [2,2,4] -> [4,4], điểm cộng theo ô gộp được
  const loc = hang.filter(x => x !== 0);
  const ra = [];
  let diem = 0;
  for(let i = 0; i < loc.length; i++){
    if(i + 1 < loc.length && loc[i] === loc[i + 1]){
      const gop = loc[i] * 2;
      ra.push(gop); diem += gop; i++;
    } else {
      ra.push(loc[i]);
    }
  }
  while(ra.length < 4) ra.push(0);
  return {hang: ra, diem: diem};
}
function _2048Move(ban, huong){
  // ban: mảng 16 số. huong: 'left' | 'right' | 'up' | 'down'.
  // Trả về {banMoi, diem, daDiChuyen}. Không sửa mảng gốc.
  const moi = ban.slice();
  let diem = 0, daDi = false;
  function xuLyHang(hang, datLai){
    const kq = _2048GopHang(hang);
    diem += kq.diem;
    datLai(kq.hang);
  }
  if(huong === 'left'){
    for(let r = 0; r < 4; r++){
      const hang = moi.slice(r * 4, r * 4 + 4);
      xuLyHang(hang, h => { for(let c = 0; c < 4; c++) moi[r * 4 + c] = h[c]; });
    }
  } else if(huong === 'right'){
    for(let r = 0; r < 4; r++){
      const hang = moi.slice(r * 4, r * 4 + 4).reverse();
      xuLyHang(hang, h => { const dao = h.slice().reverse(); for(let c = 0; c < 4; c++) moi[r * 4 + c] = dao[c]; });
    }
  } else if(huong === 'up'){
    for(let c = 0; c < 4; c++){
      const hang = [moi[c], moi[4 + c], moi[8 + c], moi[12 + c]];
      xuLyHang(hang, h => { for(let r = 0; r < 4; r++) moi[r * 4 + c] = h[r]; });
    }
  } else if(huong === 'down'){
    for(let c = 0; c < 4; c++){
      const hang = [moi[12 + c], moi[8 + c], moi[4 + c], moi[c]];
      xuLyHang(hang, h => { const dao = h.slice().reverse(); for(let r = 0; r < 4; r++) moi[r * 4 + c] = dao[r]; });
    }
  }
  for(let i = 0; i < 16; i++) if(moi[i] !== ban[i]) daDi = true;
  return {banMoi: moi, diem: diem, daDiChuyen: daDi};
}
function _2048ThemO(ban){
  const trong = [];
  for(let i = 0; i < 16; i++) if(ban[i] === 0) trong.push(i);
  if(!trong.length) return ban;
  const chon = trong[Math.floor(Math.random() * trong.length)];
  ban[chon] = Math.random() < 0.9 ? 2 : 4;
  return ban;
}
function _2048HetNuocDi(ban){
  for(let i = 0; i < 16; i++) if(ban[i] === 0) return false;
  for(let r = 0; r < 4; r++) for(let c = 0; c < 4; c++){
    const v = ban[r * 4 + c];
    if(c < 3 && ban[r * 4 + c + 1] === v) return false;
    if(r < 3 && ban[(r + 1) * 4 + c] === v) return false;
  }
  return true;
}
function _2048Best(){
  try{ return parseInt(localStorage.getItem('lop1_2048_best') || '0', 10) || 0; }catch(e){ return 0; }
}
function render2048(){
  _2048Ban = []; for(let i = 0; i < 16; i++) _2048Ban.push(0);
  _2048Ban = _2048ThemO(_2048Ban); _2048Ban = _2048ThemO(_2048Ban);
  _2048Diem = 0; _2048DaThuong = false; _2048KetThuc = false;
  document.getElementById('noiDungGame').innerHTML =
    '<div class="khung-bai"><h2>🔢 Trò chơi 2048</h2>'
    + '<p class="mo-ta">Trượt các ô giống nhau để gộp lại: 2 + 2 = 4, 4 + 4 = 8... Bé ghép đến <b>128 là thắng</b> nhé!</p>'
    + '<button class="nut nut-vang nut-nho" onclick="docTiengViet(\'Trượt các ô giống nhau để gộp lại. Bé ghép đến 128 là thắng nhé!\')">🔊 Nghe hướng dẫn</button>'
    + '<p style="font-size:22px">Điểm: <b id="diem2048">0</b> &nbsp;|&nbsp; Điểm cao nhất: <b id="best2048">' + _2048Best() + '</b></p>'
    + '<div id="thongBao2048" style="font-size:21px; font-weight:bold; min-height:30px"></div>'
    + '<div id="bang2048" style="display:grid; grid-template-columns:repeat(4,1fr); gap:10px; max-width:380px; margin:14px auto; background:#d9c7a5; padding:10px; border-radius:18px; touch-action:none"></div>'
    + '<div style="display:grid; grid-template-columns:repeat(3,72px); gap:8px; justify-content:center; margin-top:8px">'
    + '<span></span><button class="nut nut-vang" style="padding:10px" onclick="di2048(\'up\')">⬆️</button><span></span>'
    + '<button class="nut nut-vang" style="padding:10px" onclick="di2048(\'left\')">⬅️</button><button class="nut nut-vang" style="padding:10px" onclick="di2048(\'down\')">⬇️</button><button class="nut nut-vang" style="padding:10px" onclick="di2048(\'right\')">➡️</button>'
    + '</div>'
    + '<p style="font-size:17px; color:#555">Bé cũng có thể dùng phím mũi tên, phím WASD, hoặc vuốt trên màn hình.</p>'
    + '<div class="ke-trang"><button class="nut nut-hong" onclick="render2048()">🔄 Chơi ván mới</button></div></div>';
  hienManHinh('manHinhGame');
  ve2048();
  // Gắn phím + vuốt 1 lần cho ván này; gỡ handler cũ trước để không nhân đôi
  if(_2048PhimHandler && window.removeEventListener) window.removeEventListener('keydown', _2048PhimHandler);
  _2048PhimHandler = function(e){
    if(!document.getElementById('bang2048')) return;
    const banPhim = {ArrowLeft:'left', ArrowRight:'right', ArrowUp:'up', ArrowDown:'down', a:'left', d:'right', w:'up', s:'down', A:'left', D:'right', W:'up', S:'down'};
    const huong = banPhim[e.key];
    if(huong){ e.preventDefault(); di2048(huong); }
  };
  window.addEventListener('keydown', _2048PhimHandler);
  const bang = document.getElementById('bang2048');
  bang.addEventListener('touchstart', function(e){ const t = e.touches[0]; _2048ChamX = t.clientX; _2048ChamY = t.clientY; }, {passive:true});
  bang.addEventListener('touchend', function(e){
    const t = e.changedTouches[0];
    const dx = t.clientX - _2048ChamX, dy = t.clientY - _2048ChamY;
    if(Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
    if(Math.abs(dx) > Math.abs(dy)) di2048(dx > 0 ? 'right' : 'left');
    else di2048(dy > 0 ? 'down' : 'up');
  }, {passive:true});
}
function ve2048(){
  const bang = document.getElementById('bang2048'); if(!bang) return;
  bang.innerHTML = _2048Ban.map(v =>
    '<div style="height:76px; line-height:76px; text-align:center; font-size:' + (v >= 1000 ? 22 : v >= 100 ? 26 : 30) + 'px; font-weight:bold; color:#222; background:' + (_2048_MAU[v] || '#ffc93c') + '; border-radius:12px">' + (v === 0 ? '' : v) + '</div>').join('');
  const d = document.getElementById('diem2048'); if(d) d.textContent = _2048Diem;
}
function di2048(huong){
  if(_2048KetThuc) return;
  const kq = _2048Move(_2048Ban, huong);
  if(!kq.daDiChuyen) return;
  _2048Ban = _2048ThemO(kq.banMoi);
  _2048Diem += kq.diem;
  if(kq.diem > 0) amDung(); else amClick();
  const lonNhat = Math.max.apply(null, _2048Ban);
  const tb = document.getElementById('thongBao2048');
  if(lonNhat >= 128 && !_2048DaThuong){
    _2048DaThuong = true;
    state.stars += 2; state.points += 10; luu(); kiemTraHuyHieu(); capNhatTieuDe();
    try{ if(_2048Diem > _2048Best()) localStorage.setItem('lop1_2048_best', String(_2048Diem)); }catch(e){}
    if(tb) tb.textContent = '🎉 Bé đã ghép đến 128! Được +2 sao thưởng! Bé chơi tiếp để ghép cao hơn nhé!';
    amHoanThanh();
  }
  if(_2048HetNuocDi(_2048Ban)){
    _2048KetThuc = true;
    try{ if(_2048Diem > _2048Best()) localStorage.setItem('lop1_2048_best', String(_2048Diem)); }catch(e){}
    const b = document.getElementById('best2048'); if(b) b.textContent = _2048Best();
    if(tb) tb.textContent = '😅 Hết nước đi rồi! Bé bấm “Chơi ván mới” để chơi lại nhé!';
    amSai();
  }
  ve2048();
  const b2 = document.getElementById('best2048'); if(b2) b2.textContent = Math.max(_2048Best(), _2048Diem);
}

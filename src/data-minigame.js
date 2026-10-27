// ============================================================
// KHU VUI CHƠI THƯỞNG - 3 trò chơi nho nhỏ
// Quy tắc mở khóa (hiển thị rõ cho bé và phụ huynh):
// - Chưa hoàn thành bài học nào: khu vui chơi bị khóa, hiện 🔒.
// - Hoàn thành 1 bài học (state.daLamBai = true, lưu localStorage):
//   mở khóa cả 3 trò. Sau mỗi bài học, màn hình hoàn thành cũng
//   hiện luôn 3 nút này để bé chơi ngay.
// - Đạt 30 sao trong ngày: hiện thêm banner "Đã đạt mục tiêu!".
// Thưởng: mỗi trò hoàn thành được +2 sao, +10 điểm (không tính
// vào thống kê đúng/sai theo môn, để không làm lệch báo cáo
// phụ huynh). Mỗi lượt chơi chỉ thưởng 1 lần khi bấm nút kết thúc.
// ============================================================
function renderKhuVuiChoi(){
  const el = document.getElementById('khuVuiChoi');
  if(!el) return;
  if(!state.daLamBai){
    el.innerHTML = '<div style="text-align:center; font-size:22px; padding:14px; background:#fffbe6; border-radius:18px">🔒 Khu vui chơi đang khóa.<br><span style="font-size:19px; color:#555">Bé hoàn thành 1 bài học là mở khóa ngay nhé!</span></div>';
    return;
  }
  const banner = state.stars >= 30
    ? '<p style="text-align:center; font-size:21px; font-weight:bold; margin:0 0 12px">🏆 Bé đã đạt mục tiêu 30 sao hôm nay! Chơi thỏa thích nhé!</p>'
    : '<p style="text-align:center; font-size:19px; color:#555; margin:0 0 12px">🎉 Khu vui chơi đã mở khóa vì bé đã hoàn thành bài học!</p>';
  el.innerHTML = banner + '<div class="luoi-game">'
    + '<div class="mini-game-card" onclick="renderMiniBong(); amClick()"><span style="font-size:52px">🎈</span><b>Bắt bóng bay</b><span>Bấm vỡ 10 quả bóng bay.</span></div>'
    + '<div class="mini-game-card" onclick="renderMiniLatThe(); amClick()"><span style="font-size:52px">🃏</span><b>Lật thẻ trí nhớ</b><span>Tìm 4 cặp thẻ giống nhau.</span></div>'
    + '<div class="mini-game-card" onclick="renderMiniTimSao(); amClick()"><span style="font-size:52px">⭐</span><b>Tìm sao khác biệt</b><span>Tìm ngôi sao khác trong 3 vòng.</span></div>'
    + '</div>';
}
function thuongMiniGame(ten){
  // Thưởng 1 lần cho 1 lượt chơi xong; nút kết thúc sẽ bị vô hiệu sau khi bấm
  amHoanThanh(); state.stars += 2; state.points += 10; luu(); kiemTraHuyHieu(); capNhatTieuDe();
  toast('🎉 Bé chơi xong ' + ten + '! Được +2 sao thưởng!');
  veTrangChu();
}
// ---------- Trò 1: Bắt bóng bay (bấm vỡ 10 quả) ----------
let _bongDem = 0;
function renderMiniBong(){
  _bongDem = 0;
  document.getElementById('noiDungGame').innerHTML =
    '<div class="khung-bai"><h2>🎈 Bắt bóng bay</h2><p class="mo-ta">Bấm vào quả bóng để làm vỡ nó. Vỡ đủ 10 quả là thắng!</p>'
    + '<p style="font-size:26px">Đã vỡ: <b id="demBong">0</b> / 10 quả</p>'
    + '<div id="sanBong" style="position:relative; height:300px; background:#e0f7f5; border-radius:20px; overflow:hidden"></div>'
    + '<div class="ke-trang"><button class="nut nut-hong" id="nutXongBong" onclick="thuogMiniGameBong()">✅ Bé bắt xong! Nhận sao</button></div></div>';
  hienManHinh('manHinhGame');
  taoBong();
}
function taoBong(){
  const san = document.getElementById('sanBong'); if(!san) return;
  san.innerHTML = '';
  const b = document.createElement('button');
  b.textContent = '🎈'; b.style.cssText = 'position:absolute; font-size:56px; background:none; border:0; cursor:pointer; left:' + (5 + Math.random() * 75) + '%; top:' + (5 + Math.random() * 65) + '%;';
  b.onclick = function(){ amClick(); _bongDem++; const d = document.getElementById('demBong'); if(d) d.textContent = _bongDem; if(_bongDem >= 10){ san.innerHTML = '<p style="font-size:28px; padding-top:110px">🎉 Bé bắt đủ 10 quả rồi! Bấm nút nhận sao nhé!</p>'; } else { taoBong(); } };
  san.appendChild(b);
}
function thuogMiniGameBong(){
  if(_bongDem < 10){ toast('Bé bắt thêm bóng nữa nhé, cần đủ 10 quả!'); amSai(); return; }
  document.getElementById('nutXongBong').disabled = true;
  thuongMiniGame('Bắt bóng bay');
}
// ---------- Trò 2: Lật thẻ trí nhớ (4 cặp) ----------
let _latThe = [], _latDangMo = [], _latCapDung = 0, _latKhoa = false;
function renderMiniLatThe(){
  const cap = ['🐱','🐶','🍎','⭐'];
  _latThe = tron(cap.concat(cap));
  _latDangMo = []; _latCapDung = 0; _latKhoa = false;
  document.getElementById('noiDungGame').innerHTML =
    '<div class="khung-bai"><h2>🃏 Lật thẻ trí nhớ</h2><p class="mo-ta">Bấm vào 2 thẻ. Nếu 2 thẻ giống nhau thì giữ lại, khác nhau thì úp lại nhé!</p>'
    + '<p style="font-size:22px">Đã tìm đúng: <b id="demCap">0</b> / 4 cặp</p>'
    + '<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; max-width:480px; margin:0 auto">' + _latThe.map((c,i) =>
        '<button class="dap-an" id="the-' + i + '" onclick="latThe(' + i + ')">❓</button>').join('') + '</div>'
    + '<div class="ke-trang"><button class="nut nut-hong" id="nutXongLat" onclick="thuogMiniGameLat()">✅ Bé tìm xong! Nhận sao</button></div></div>';
  hienManHinh('manHinhGame');
}
function latThe(i){
  if(_latKhoa) return;
  const nut = document.getElementById('the-' + i); if(!nut || nut.disabled) return;
  nut.textContent = _latThe[i]; amClick(); _latDangMo.push(i);
  if(_latDangMo.length === 2){
    const a = _latDangMo[0], b = _latDangMo[1];
    if(_latThe[a] === _latThe[b]){
      amDung(); _latCapDung++;
      document.getElementById('the-' + a).disabled = true; document.getElementById('the-' + b).disabled = true;
      const d = document.getElementById('demCap'); if(d) d.textContent = _latCapDung;
      _latDangMo = [];
    } else {
      _latKhoa = true;
      setTimeout(function(){
        document.getElementById('the-' + a).textContent = '❓';
        document.getElementById('the-' + b).textContent = '❓';
        _latDangMo = []; _latKhoa = false;
      }, 800);
    }
  }
}
function thuogMiniGameLat(){
  if(_latCapDung < 4){ toast('Bé tìm thêm cặp thẻ nữa nhé, cần đủ 4 cặp!'); amSai(); return; }
  document.getElementById('nutXongLat').disabled = true;
  thuongMiniGame('Lật thẻ trí nhớ');
}
// ---------- Trò 3: Tìm sao khác biệt (3 vòng) ----------
let _timSaoVong = 0;
function renderMiniTimSao(){
  _timSaoVong = 0;
  veVongTimSao();
}
function veVongTimSao(){
  const viTriKhac = Math.floor(Math.random() * 9);
  const cacSao = [];
  for(let i = 0; i < 9; i++) cacSao.push(i === viTriKhac ? '🌟' : '⭐');
  document.getElementById('noiDungGame').innerHTML =
    '<div class="khung-bai"><h2>⭐ Tìm sao khác biệt</h2><p class="mo-ta">Trong 9 ngôi sao, có 1 ngôi sao khác biệt. Bé tìm và bấm vào nó nhé!</p>'
    + '<p style="font-size:22px">Vòng: <b>' + (_timSaoVong + 1) + '</b> / 3</p>'
    + '<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px; max-width:420px; margin:0 auto">' + cacSao.map((c,i) =>
        '<button class="dap-an" onclick="chonSao(' + i + ',' + viTriKhac + ')">' + c + '</button>').join('') + '</div>'
    + '<div class="ke-trang"><button class="nut nut-hong" id="nutXongSao" style="display:none" onclick="thuogMiniGameSao()">✅ Bé tìm xong! Nhận sao</button></div></div>';
  hienManHinh('manHinhGame');
}
function chonSao(i, dung){
  if(i === dung){
    amDung(); _timSaoVong++;
    if(_timSaoVong >= 3){
      document.getElementById('noiDungGame').innerHTML =
        '<div class="khung-bai"><div class="emoji-lon">🎉⭐🎉</div><h2>Bé tìm đủ 3 vòng rồi!</h2>'
        + '<div class="ke-trang"><button class="nut nut-hong" onclick="thuogMiniGameSao()">✅ Nhận sao thưởng</button></div></div>';
    } else {
      toast('🎉 Đúng rồi! Sang vòng tiếp theo!');
      veVongTimSao();
    }
  } else {
    amSai(); toast('💪 Chưa đúng rồi, bé nhìn kỹ lại nhé!');
  }
}
function thuogMiniGameSao(){
  thuongMiniGame('Tìm sao khác biệt');
}

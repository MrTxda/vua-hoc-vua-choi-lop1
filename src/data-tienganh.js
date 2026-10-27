// ============================================================
// MÔN TIẾNG ANH (Global Success lớp 1, từ vựng cơ bản)
// - 30 câu đọc từ vựng: nhìn hình, chọn từ tiếng Anh đúng.
// - 30 câu nghe: nghe từ tiếng Anh (giọng máy en-US, docEn) rồi
//   chọn đúng hình + từ. Từ vựng cơ bản (màu, số, con vật,
//   gia đình, cơ thể, đồ dùng học tập) là từ thông dụng, không
//   chép bài đọc / lời thoại trong sách.
// ============================================================
const TIENGANH_TUVUNG = [
  {emoji:'🔴', en:'red', vn:'màu đỏ'}, {emoji:'🔵', en:'blue', vn:'màu xanh dương'}, {emoji:'🟡', en:'yellow', vn:'màu vàng'},
  {emoji:'🟢', en:'green', vn:'màu xanh lá'}, {emoji:'🟠', en:'orange', vn:'màu cam'}, {emoji:'🟣', en:'purple', vn:'màu tím'},
  {emoji:'1️⃣', en:'one', vn:'số một'}, {emoji:'2️⃣', en:'two', vn:'số hai'}, {emoji:'3️⃣', en:'three', vn:'số ba'},
  {emoji:'4️⃣', en:'four', vn:'số bốn'}, {emoji:'5️⃣', en:'five', vn:'số năm'}, {emoji:'6️⃣', en:'six', vn:'số sáu'},
  {emoji:'🐱', en:'cat', vn:'con mèo'}, {emoji:'🐶', en:'dog', vn:'con chó'}, {emoji:'🐟', en:'fish', vn:'con cá'},
  {emoji:'🐔', en:'chicken', vn:'con gà'}, {emoji:'🐦', en:'bird', vn:'con chim'}, {emoji:'🐷', en:'pig', vn:'con lợn'},
  {emoji:'👩', en:'mother', vn:'mẹ'}, {emoji:'👨', en:'father', vn:'bố'}, {emoji:'👧', en:'girl', vn:'bé gái'},
  {emoji:'👦', en:'boy', vn:'bé trai'}, {emoji:'👵', en:'grandmother', vn:'bà'}, {emoji:'👴', en:'grandfather', vn:'ông'},
  {emoji:'📚', en:'book', vn:'quyển sách'}, {emoji:'✏️', en:'pencil', vn:'bút chì'}, {emoji:'🎒', en:'bag', vn:'cái cặp'},
  {emoji:'✂️', en:'scissors', vn:'cái kéo'}, {emoji:'🪑', en:'chair', vn:'cái ghế'}, {emoji:'🍎', en:'apple', vn:'quả táo'},
  {emoji:'👋', en:'hello', vn:'xin chào'}, {emoji:'🙏', en:'thank you', vn:'cảm ơn'}, {emoji:'👋', en:'goodbye', vn:'tạm biệt'},
  {emoji:'🖐️', en:'hand', vn:'bàn tay'}, {emoji:'👁️', en:'eye', vn:'mắt'}, {emoji:'👂', en:'ear', vn:'tai'},
  {emoji:'👃', en:'nose', vn:'mũi'}, {emoji:'🦶', en:'foot', vn:'bàn chân'}, {emoji:'😊', en:'happy', vn:'vui vẻ'},
  {emoji:'☀️', en:'sun', vn:'mặt trời'}, {emoji:'🌙', en:'moon', vn:'mặt trăng'}, {emoji:'⭐', en:'star', vn:'ngôi sao'},
  {emoji:'🏠', en:'house', vn:'ngôi nhà'}, {emoji:'🏫', en:'school', vn:'trường học'}, {emoji:'⚽', en:'ball', vn:'quả bóng'},
  {emoji:'🍌', en:'banana', vn:'quả chuối'}, {emoji:'🥛', en:'milk', vn:'sữa'}, {emoji:'🍚', en:'rice', vn:'cơm'},
  {emoji:'🚗', en:'car', vn:'ô tô'}, {emoji:'🚲', en:'bike', vn:'xe đạp'}, {emoji:'🌸', en:'flower', vn:'bông hoa'},
  {emoji:'🐘', en:'elephant', vn:'con voi'}, {emoji:'🐵', en:'monkey', vn:'con khỉ'}, {emoji:'🦁', en:'lion', vn:'con sư tử'},
  {emoji:'7️⃣', en:'seven', vn:'số bảy'}, {emoji:'8️⃣', en:'eight', vn:'số tám'}, {emoji:'9️⃣', en:'nine', vn:'số chín'},
  {emoji:'🔟', en:'ten', vn:'số mười'}, {emoji:'🦆', en:'duck', vn:'con vịt'}, {emoji:'🖊️', en:'pen', vn:'bút mực'},
];
// Lưu ý: danh sách trên có 60 mục; 30 mục đầu làm bài đọc, 30 mục sau làm bài nghe.
MON_HOC.push({id:'tienganh', ten:'Tiếng Anh', icon:'🔤', lop:'mon-viet', moTa:'Từ vựng cơ bản: màu sắc, số, con vật, gia đình và đồ dùng học tập!'});
GAME_THEO_MON.tienganh = [
  {id:'tuvung', ten:'🔤 Từ vựng tiếng Anh', moTa:'Nhìn hình, chọn từ tiếng Anh đúng.'},
  {id:'nghe', ten:'🔊 Nghe và chọn hình', moTa:'Nghe từ tiếng Anh rồi chọn đúng hình.'},
];
TIENGANH_TUVUNG.slice(0, 30).forEach(it => {
  const sai = tron(TIENGANH_TUVUNG.filter(x => x.en !== it.en).map(x => x.en)).slice(0, 3);
  NGAN_HANG.push({mon:'tienganh', game:'tuvung', cau:'Từ tiếng Anh của hình trên là gì?', dapAn:it.en, luaChon:tron([it.en].concat(sai)), emoji:it.emoji, giai:it.en + ' nghĩa là ' + it.vn});
});
TIENGANH_TUVUNG.slice(30).forEach(it => {
  const sai = TIENGANH_TUVUNG.filter(x => x.en !== it.en).map(x => x.emoji + ' ' + x.en);
  const saiChon = tron(sai).slice(0, 3);
  const dap = it.emoji + ' ' + it.en;
  NGAN_HANG.push({mon:'tienganh', game:'nghe', cau:'Bé nghe từ tiếng Anh và chọn đúng hình nhé!', dapAn:dap, luaChon:tron([dap].concat(saiChon)), emoji:'🔊', docEn:it.en, giai:it.en + ' nghĩa là ' + it.vn});
});

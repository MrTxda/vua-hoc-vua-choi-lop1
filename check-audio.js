// Kiểm tra âm thanh qua LUỒNG CHƠI THẬT (không chỉ ngân hàng).
// Cách chạy: node check-audio.js   (sau mỗi lần sửa template/data, chạy lại trước khi push)
// File này chỉ là runner: nó gộp mock + toàn bộ script trong dist + test vào 1 file tạm
// rồi chạy bằng node, vì các biến const/let trong app không lọt qua eval() được.
// Các assert: 1) batDauGame giữ docEn cho bài Nghe; 2) bài Nghe đọc hướng dẫn VI rồi mới đọc từ EN;
// 3) tone() resume AudioContext đang suspended; 4) beep đáp án không đè lên giọng phản hồi
// (giọng phải hẹn giờ sau beep, không gọi ngay cùng tick); 5) giọng câu hỏi không gọi ngay
// cùng tick với beep chuyển câu; 6) mọi câu trắc nghiệm đều có dapAn trong luaChon.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const os = require('os');

const html = fs.readFileSync(path.join(__dirname, 'dist/vua-hoc-vua-choi-lop1-day-du.html'), 'utf-8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);

const mock = `
let failures = 0;
function check(name, ok, detail) {
  console.log((ok ? 'PASS' : 'FAIL') + ' | ' + name + (detail ? ' | ' + detail : ''));
  if (!ok) failures++;
}
const elements = {};
function mockEl(id) {
  if (!elements[id]) elements[id] = { innerHTML: '', textContent: '', style: {}, disabled: false, classList: { add(){}, remove(){} } };
  return elements[id];
}
global.document = { getElementById: (id) => mockEl(id), querySelectorAll: () => [] };
global.window = { scrollTo(){}, addEventListener(){}, removeEventListener(){} };
global.localStorage = { _:{}, getItem(k){return this._[k]||null}, setItem(k,v){this._[k]=v}, removeItem(k){delete this._[k]} };
let resumeCalls = 0, oscCount = 0;
class MockOsc { constructor(){ this.type=''; this.frequency={value:0}; } connect(){} start(){} stop(){} }
class MockGain { constructor(){ this.gain={ setValueAtTime(){}, exponentialRampToValueAtTime(){} }; } connect(){} }
class MockAC {
  constructor(){ this.state='suspended'; this.currentTime=0; this.destination={}; }
  resume(){ resumeCalls++; this.state='running'; return Promise.resolve(); }
  createOscillator(){ oscCount++; return new MockOsc(); }
  createGain(){ return new MockGain(); }
}
global.window.AudioContext = MockAC;
global.window.webkitAudioContext = MockAC;
let speechLog = [];
global.window.speechSynthesis = {
  cancel(){}, getVoices(){ return [{lang:'vi-VN'}, {lang:'en-US'}]; },
  speak(u){ speechLog.push(u.lang + ':' + u.text); }, onvoiceschanged: null,
};
global.speechSynthesis = global.window.speechSynthesis;
global.SpeechSynthesisUtterance = function(txt){ this.text = txt; this.lang=''; this.rate=1; this.voice=null; };
let delayed = [];
global.setTimeout = (fn, ms) => { delayed.push({fn, ms}); return delayed.length; };
`;

const test = `
speechLog = []; delayed = [];
batDauGame('tienganh', 'nghe');
const q0 = current.cauHoi[0];
check('batDauGame giu docEn cho bai Nghe', !!q0.docEn, 'docEn=' + q0.docEn);
const d1 = [...delayed]; delayed = []; d1.forEach(d => d.fn());
const d2 = [...delayed]; delayed = []; d2.forEach(d => d.fn());
check('Bai Nghe: co huong dan VI roi tu EN', speechLog.some(s => s.startsWith('vi-VN:')) && speechLog.some(s => s.startsWith('en-US:')), speechLog.join(' || '));
AC = null; resumeCalls = 0; oscCount = 0;
tone(440, 0.2);
check('tone() resume AudioContext suspended', resumeCalls >= 1, 'resumeCalls=' + resumeCalls + ', osc=' + oscCount);
speechLog = []; delayed = [];
const nutMock = { classList: { add(){} } };
const qCur = current.cauHoi[current.viTri];
const idxDung = qCur.luaChon.indexOf(qCur.dapAn);
chonDapAn(nutMock, idxDung);
check('Phan hoi sau dap an: giong hen sau beep, khong noi ngay cung tick', speechLog.length === 0 && delayed.length > 0, 'speechNgay=' + speechLog.length + ', delayed=' + delayed.length);
delayed.forEach(d => d.fn());
check('Phan hoi sau delay van noi duoc', speechLog.length > 0, speechLog.join(' || '));
speechLog = []; delayed = [];
cauTiepTheo();
check('Cau tiep theo: giong cau hoi hen sau beep, khong noi ngay', speechLog.length === 0 && delayed.length > 0, 'speechNgay=' + speechLog.length + ', delayed=' + delayed.length);
const bad = NGAN_HANG.filter(q => !q.luaChon.includes(q.dapAn));
check('Moi cau deu co dap an dung trong lua chon', bad.length === 0, 'bad=' + bad.length + ', total=' + NGAN_HANG.length);
speechLog = []; delayed = [];
batDauGame('toan', 'cong10');
docDapAn(0);
const optSpeech = [...speechLog];
const dOpt = [...delayed]; delayed = []; dOpt.forEach(d => d.fn());
check('Bam loa dap an ngay: giong cau hoi dang cho bi huy, chi nghe dap an', speechLog.length === optSpeech.length, 'speech=' + speechLog.join(' || '));
const qSong = NGAN_HANG.find(q => q.cau === 'Bé ăn cơm xong, bé nên làm gì?');
speechLog = []; delayed = [];
current = {mon:'life', game:'song', cauHoi:[qSong], viTri:0, dung:0};
docCauHoiHienTai();
check('Cau Be an com xong: giong VI giu dau ? o cuoi', speechLog.length === 1 && speechLog[0].endsWith('?'), speechLog.join(' || '));
check('Cau Be an com xong: vietHoa giu dau ?', vietHoaCauHoi('Bé ăn cơm xong, bé nên làm gì?') === 'Bé ăn cơm xong, bé nên làm gì?' && vietHoaCauHoi('60 ? 97') === '60 lớn hơn, bé hơn hay bằng 97' && vietHoaCauHoi('5 + 3 = ?') === '5 cộng 3 bằng bao nhiêu', vietHoaCauHoi('Bé ăn cơm xong, bé nên làm gì?'));
check('Khong con mon Am nhac', !MON_HOC.some(m => m.id === 'amnhac'), 'mon=' + MON_HOC.map(m=>m.id).join(','));
console.log(failures === 0 ? 'AUDIO CHECK: ALL PASS' : 'AUDIO CHECK: ' + failures + ' FAIL');
process.exit(failures === 0 ? 0 : 1);
`;

const runFile = path.join(os.tmpdir(), 'check-audio-run-' + process.pid + '.js');
fs.writeFileSync(runFile, mock + '\n' + scripts.slice(0, -1).join('\n') + '\n' + test);
try {
  execFileSync('node', [runFile], { stdio: 'inherit' });
} catch (e) {
  process.exit(e.status || 1);
} finally {
  try { fs.unlinkSync(runFile); } catch (e) {}
}

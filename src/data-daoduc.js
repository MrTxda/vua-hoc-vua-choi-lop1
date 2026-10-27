// ============================================================
// MÔN ĐẠO ĐỨC - 40 câu trắc nghiệm (bài tập tự biên, không sao
// chép nguyên văn sách). Chủ đề: lễ phép, trung thực, yêu thương,
// giữ vệ sinh, tiết kiệm, giúp đỡ, tôn trọng.
// Định dạng chung: {nhom, emoji, cau, dung, sai:[...], giai}
// Khi nạp, đáp án được xáo trộn bằng tron().
// ============================================================
const DAODUC_Q = [
  {nhom:'Lễ phép', emoji:'🙏', cau:'Gặp cô giáo buổi sáng, bé nên làm gì?', dung:'Chào cô giáo', sai:['Quay mặt đi','Hét to'], giai:'Chào hỏi lễ phép là bé ngoan.'},
  {nhom:'Lễ phép', emoji:'🍚', cau:'Trước khi ăn cơm, bé nên làm gì?', dung:'Mời ông bà, bố mẹ ăn cơm', sai:['Ăn trước một mình','Vừa ăn vừa chạy'], giai:'Mời người lớn trước là lễ phép.'},
  {nhom:'Lễ phép', emoji:'🚪', cau:'Muốn vào phòng của người khác, bé nên làm gì?', dung:'Gõ cửa và xin phép', sai:['Xông thẳng vào','Mở cửa lén'], giai:'Gõ cửa là tôn trọng người khác.'},
  {nhom:'Lễ phép', emoji:'🙇', cau:'Bé làm phiền người khác, bé nên nói gì?', dung:'Xin lỗi', sai:['Cười to','Bỏ đi'], giai:'Xin lỗi khi làm phiền là lịch sự.'},
  {nhom:'Trung thực', emoji:'💯', cau:'Bé làm bài sai, bé nên làm gì?', dung:'Nói thật với cô giáo', sai:['Chép bài bạn','Giấu bài đi'], giai:'Trung thực giúp bé tiến bộ.'},
  {nhom:'Trung thực', emoji:'🥛', cau:'Bé làm vỡ cốc, bé nên làm gì?', dung:'Nhận lỗi và nói thật', sai:['Đổ lỗi cho em','Giấu mảnh vỡ'], giai:'Nhận lỗi là dũng cảm và trung thực.'},
  {nhom:'Trung thực', emoji:'🔍', cau:'Bé nhặt được tiền, bé nên làm gì?', dung:'Đưa cho cô giáo hoặc người lớn', sai:['Giữ làm của mình','Tiêu hết'], giai:'Nhặt được của rơi phải trả lại.'},
  {nhom:'Trung thực', emoji:'📝', cau:'Trong giờ kiểm tra, bé nên làm gì?', dung:'Tự làm bài của mình', sai:['Nhìn bài bạn','Hỏi bạn đáp án'], giai:'Tự làm bài là trung thực.'},
  {nhom:'Yêu thương', emoji:'❤️', cau:'Bạn bị ốm nghỉ học, bé nên làm gì?', dung:'Hỏi thăm bạn', sai:['Trêu bạn ốm','Mặc kệ bạn'], giai:'Hỏi thăm bạn là yêu thương.'},
  {nhom:'Yêu thương', emoji:'👵', cau:'Ông bà mệt, bé nên làm gì?', dung:'Nhẹ nhàng, không làm ồn', sai:['Hét to','Chạy nhảy ầm ĩ'], giai:'Yêu thương ông bà bằng hành động nhẹ nhàng.'},
  {nhom:'Yêu thương', emoji:'🐱', cau:'Bé thấy mèo con bị ướt mưa, bé nên làm gì?', dung:'Gọi người lớn giúp mèo', sai:['Ném đá vào mèo','Bỏ mặc mèo'], giai:'Yêu thương cả con vật.'},
  {nhom:'Yêu thương', emoji:'🤝', cau:'Bạn mới vào lớp chưa quen ai, bé nên làm gì?', dung:'Làm quen và chơi cùng bạn', sai:['Trêu bạn mới','Không chơi với bạn'], giai:'Chào đón bạn mới là yêu thương.'},
  {nhom:'Giữ vệ sinh', emoji:'🪥', cau:'Sau khi ăn, bé nên làm gì?', dung:'Đánh răng', sai:['Đi ngủ ngay','Ăn thêm kẹo'], giai:'Đánh răng giữ răng sạch khỏe.'},
  {nhom:'Giữ vệ sinh', emoji:'🧼', cau:'Trước khi ăn, bé nên làm gì?', dung:'Rửa tay sạch', sai:['Ăn luôn không rửa','Lau tay vào áo'], giai:'Rửa tay trước khi ăn.'},
  {nhom:'Giữ vệ sinh', emoji:'🗑️', cau:'Vỏ bánh kẹo sau khi ăn, bé bỏ ở đâu?', dung:'Thùng rác', sai:['Sân trường','Gầm bàn'], giai:'Bỏ rác đúng nơi.'},
  {nhom:'Giữ vệ sinh', emoji:'👕', cau:'Áo quần bẩn, bé nên làm gì?', dung:'Thay áo sạch', sai:['Mặc tiếp nhiều ngày','Vứt áo đi'], giai:'Mặc áo sạch là giữ vệ sinh.'},
  {nhom:'Tiết kiệm', emoji:'💡', cau:'Ra khỏi phòng, bé nên làm gì với đèn?', dung:'Tắt đèn', sai:['Để đèn sáng cả ngày','Bật thêm đèn'], giai:'Tắt đèn khi không dùng là tiết kiệm điện.'},
  {nhom:'Tiết kiệm', emoji:'🚰', cau:'Đánh răng xong, bé nên làm gì với vòi nước?', dung:'Khóa vòi nước', sai:['Để nước chảy','Mở vòi to hơn'], giai:'Khóa vòi là tiết kiệm nước.'},
  {nhom:'Tiết kiệm', emoji:'📄', cau:'Giấy còn viết được, bé nên làm gì?', dung:'Dùng hết giấy rồi mới lấy tờ mới', sai:['Vò giấy chơi','Xé giấy'], giai:'Tiết kiệm giấy là bảo vệ cây xanh.'},
  {nhom:'Tiết kiệm', emoji:'🍚', cau:'Ăn cơm, bé nên làm gì?', dung:'Ăn hết phần cơm của mình', sai:['Bỏ thừa nhiều cơm','Đổ cơm đi'], giai:'Không lãng phí thức ăn.'},
  {nhom:'Giúp đỡ', emoji:'🧹', cau:'Lớp học bẩn, bé nên làm gì?', dung:'Cùng bạn dọn lớp', sai:['Đứng xem','Vứt thêm rác'], giai:'Cùng dọn lớp là giúp đỡ tập thể.'},
  {nhom:'Giúp đỡ', emoji:'🎒', cau:'Bạn quên mang bút, bé nên làm gì?', dung:'Cho bạn mượn bút', sai:['Cười bạn','Giấu bút đi'], giai:'Cho mượn đồ là giúp bạn.'},
  {nhom:'Giúp đỡ', emoji:'👶', cau:'Em nhỏ ngã, bé nên làm gì?', dung:'Đỡ em dậy', sai:['Cười em','Bỏ đi'], giai:'Đỡ em dậy là giúp đỡ.'},
  {nhom:'Giúp đỡ', emoji:'🌱', cau:'Cây trong lớp héo, bé nên làm gì?', dung:'Tưới nước cho cây', sai:['Nhổ cây lên','Mặc kệ cây'], giai:'Chăm cây là giúp lớp xanh.'},
  {nhom:'Tôn trọng', emoji:'🤫', cau:'Cô giáo đang giảng bài, bé nên làm gì?', dung:'Ngồi nghe và giơ tay khi muốn nói', sai:['Nói chuyện riêng','Hét to'], giai:'Nghe cô giảng là tôn trọng cô.'},
  {nhom:'Tôn trọng', emoji:'📚', cau:'Mượn sách của bạn, bé nên làm gì?', dung:'Giữ sách sạch, trả đúng hẹn', sai:['Vẽ bậy vào sách','Không trả sách'], giai:'Giữ gìn đồ mượn là tôn trọng bạn.'},
  {nhom:'Tôn trọng', emoji:'🎵', cau:'Bạn đang hát, bé nên làm gì?', dung:'Lắng nghe bạn hát', sai:['Hét to át tiếng bạn','Trêu bạn hát dở'], giai:'Lắng nghe là tôn trọng bạn.'},
  {nhom:'Tôn trọng', emoji:'🧑‍🤝‍🧑', cau:'Bạn khác với bé, bé nên làm gì?', dung:'Tôn trọng và chơi cùng bạn', sai:['Trêu bạn','Không chơi với bạn'], giai:'Mọi bạn đều đáng được tôn trọng.'},
  {nhom:'An toàn', emoji:'🔥', cau:'Bé thấy diêm và bật lửa, bé nên làm gì?', dung:'Không nghịch, nói với người lớn', sai:['Bật lửa chơi','Giấu diêm đi'], giai:'Không nghịch lửa.'},
  {nhom:'An toàn', emoji:'🔌', cau:'Ổ điện trong nhà, bé nên làm gì?', dung:'Không chọc tay vào ổ điện', sai:['Chọc que vào ổ điện','Sờ vào ổ điện'], giai:'Ổ điện rất nguy hiểm.'},
  {nhom:'An toàn', emoji:'🚸', cau:'Đi học một mình, bé nên đi đường nào?', dung:'Đường quen, có người lớn dặn', sai:['Đường vắng một mình','Đi theo người lạ'], giai:'Đi đường an toàn, quen thuộc.'},
  {nhom:'Bảo vệ môi trường', emoji:'🌳', cau:'Bé nên làm gì để sân trường xanh?', dung:'Trồng và chăm cây', sai:['Bẻ cành cây','Giẫm lên cỏ'], giai:'Trồng cây làm sân trường xanh.'},
  {nhom:'Bảo vệ môi trường', emoji:'🐦', cau:'Bé nên làm gì với chim trong sân trường?', dung:'Để chim tự do bay', sai:['Bắt chim nhốt','Ném đá vào chim'], giai:'Bảo vệ chim là bảo vệ thiên nhiên.'},
  {nhom:'Bảo vệ môi trường', emoji:'♻️', cau:'Chai nhựa đã dùng, bé nên làm gì?', dung:'Bỏ vào thùng tái chế', sai:['Vứt xuống sông','Đốt chai'], giai:'Phân loại rác giúp môi trường sạch.'},
  {nhom:'Kỷ luật', emoji:'⏰', cau:'Đến giờ học, bé nên làm gì?', dung:'Vào lớp đúng giờ', sai:['Đi học muộn','Chơi ở sân không vào lớp'], giai:'Đúng giờ là kỷ luật.'},
  {nhom:'Kỷ luật', emoji:'🪑', cau:'Trong giờ học, bé nên làm gì?', dung:'Ngồi ngay ngắn, chú ý nghe', sai:['Chạy quanh lớp','Nằm ra bàn'], giai:'Ngồi học nghiêm túc.'},
  {nhom:'Kỷ luật', emoji:'🎒', cau:'Tối trước khi đi học, bé nên làm gì?', dung:'Chuẩn bị sách vở gọn gàng', sai:['Để sách vở lung tung','Không chuẩn bị gì'], giai:'Chuẩn bị trước giúp bé không quên đồ.'},
  {nhom:'Chăm chỉ', emoji:'📖', cau:'Bài tập khó, bé nên làm gì?', dung:'Cố gắng làm, hỏi cô khi cần', sai:['Bỏ bài không làm','Nhờ bạn làm hộ'], giai:'Chăm chỉ giúp bé giỏi lên.'},
  {nhom:'Chăm chỉ', emoji:'✏️', cau:'Chữ bé viết chưa đẹp, bé nên làm gì?', dung:'Luyện viết mỗi ngày', sai:['Không viết nữa','Viết ẩu cho xong'], giai:'Luyện tập mỗi ngày sẽ đẹp lên.'},
  {nhom:'Hiếu thảo', emoji:'❤️', cau:'Mẹ mệt sau ngày làm việc, bé nên làm gì?', dung:'Rót nước mời mẹ, nói nhẹ nhàng', sai:['Đòi mẹ chơi cùng ngay','Hét to đòi đồ'], giai:'Hiếu thảo với bố mẹ.'},
];
// Đăng ký môn + nạp câu hỏi vào ngân hàng chung
MON_HOC.push({id:'daoduc', ten:'Đạo đức', icon:'❤️', lop:'mon-song', moTa:'Lễ phép, trung thực, yêu thương và giúp đỡ mọi người!'});
GAME_THEO_MON.daoduc = [
  {id:'quiz', ten:'🌟 Trắc nghiệm Đạo đức', moTa:'40 câu hỏi về cách cư xử đẹp.'},
];
DAODUC_Q.forEach(it => {
  NGAN_HANG.push({mon:'daoduc', game:'quiz', cau:it.cau, dapAn:it.dung, luaChon:tron([it.dung].concat(it.sai)), nhom:it.nhom, emoji:it.emoji, giai:it.giai});
});

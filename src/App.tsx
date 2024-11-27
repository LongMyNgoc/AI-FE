import './App.css'

function App() {
  return (
    <div className="app-container">
      <h1 className="title">Hệ Thống Tạo Đề Thi Trắc Nghiệm CNTT</h1>
      <div className="content-container">
        <textarea
          className="input-area"
          placeholder="Nhập đoạn văn về CNTT tại đây..."
        ></textarea>
        <button className="generate-btn">Tạo Đề Thi</button>
      </div>
      <div className="exam-container">
        {/* Phần này hiển thị đề thi trắc nghiệm (chưa có dữ liệu) */}
        <p>Đề thi trắc nghiệm sẽ hiển thị tại đây.</p>
      </div>
    </div>
  );
}

export default App;

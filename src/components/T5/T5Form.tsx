import React, { useState } from 'react';
import './T5Form.css';

interface T5FormProps {}

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

const T5Form: React.FC<T5FormProps> = () => {
  const [text, setText] = useState<string>('');
  const [quizResults, setQuizResults] = useState<Question[]>([]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/t5/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }

      const result = await response.json();
      setQuizResults(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="t5-form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Đoạn Văn:</label>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Nhập đoạn văn ở đây"
            rows={4}
            cols={50}
          />
        </div>

        <button type="submit" className="submit-button">Tạo Đề Thi</button>
      </form>

      <div className="quiz-results">
        <h3>Kết quả:</h3>
        {quizResults.length > 0 ? (
          quizResults.map((quiz, index) => (
            <div key={index} className="quiz-card">
              <p><b>Câu hỏi:</b> {quiz.question}</p>
              <p><b>Đáp án:</b></p>
              <ul className="options-list">
                {quiz.options.map((option, i) => (
                  <li key={i}>
                    {String.fromCharCode(97 + i)}. {option} {/* Thêm a, b, c, d */}
                  </li>
                ))}
              </ul>
              <p><b>Đáp án chính xác:</b> {quiz.correct_answer}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>Không có dữ liệu nào được hiển thị.</p>
        )}
      </div>
    </div>
  );
};

export default T5Form;

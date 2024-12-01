import React, { useState } from 'react';
import './TextInputForm.css';

interface TextInputFormProps {}

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

const TextInputForm: React.FC<TextInputFormProps> = () => {
  const [text, setText] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>(['']);
  const [quizResults, setQuizResults] = useState<Question[]>([]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/qa/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          questions,
        }),
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
    <div className="text-input-form">
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

        <div className="input-container">
          <label>Danh sách câu hỏi:</label>
          {questions.map((question, index) => (
            <div key={index} className="question-input">
              <input
                type="text"
                value={question}
                onChange={(event) => handleQuestionChange(event, index)}
                placeholder={`Câu hỏi ${index + 1}`}
              />
              {/* Button to remove the question */}
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="remove-button"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>

        <button type="button" className="add-button" onClick={handleAddQuestion}>
          Thêm câu hỏi
        </button>
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

export default TextInputForm;

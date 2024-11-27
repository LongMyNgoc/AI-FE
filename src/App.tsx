import './App.css';
import axios from 'axios';
import { useState } from 'react';

// Định nghĩa kiểu dữ liệu cho câu hỏi
interface MCQ {
  questionStem: string;
  answerChoices: string[];
  correctAnswer: string;
}

function App() {
  const [inputText, setInputText] = useState<string>(''); // Văn bản nhập vào
  const [numQuestions, setNumQuestions] = useState<number>(5); // Số lượng câu hỏi
  const [questions, setQuestions] = useState<MCQ[]>([]); // Danh sách câu hỏi

  const handleGenerateQuiz = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-quiz', {
        text: inputText,
        num_questions: numQuestions,
      });
      const formattedQuestions: MCQ[] = response.data.questions.map((q: [string, string[], string]) => ({
        questionStem: q[0],
        answerChoices: q[1],
        correctAnswer: q[2],
      }));
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Hệ Thống Tạo Đề Thi Trắc Nghiệm CNTT</h1>
      <textarea
        placeholder="Nhập đoạn văn tại đây..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <input
        type="number"
        value={numQuestions}
        onChange={(e) => setNumQuestions(Number(e.target.value))}
        min="1"
        max="10"
        placeholder="Số lượng câu hỏi"
      />
      <button onClick={handleGenerateQuiz}>Tạo Đề Thi</button>
      <div>
        {questions.map((q, index) => (
          <div key={index}>
            <h3>Câu hỏi {index + 1}: {q.questionStem}</h3>
            <ul>
              {q.answerChoices.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
            <p><strong>Đáp án đúng:</strong> {q.correctAnswer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

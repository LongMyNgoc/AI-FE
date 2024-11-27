import './App.css';
import axios from 'axios';
import { useState } from 'react';
import QuizForm from './components/QuizForm';
import QuestionList from './components/QuestionList';

interface MCQ {
  questionStem: string;
  answerChoices: string[];
  correctAnswer: string;
}

function App() {
  const [questions, setQuestions] = useState<MCQ[]>([]);

  const handleGenerateQuiz = async (text: string, numQuestions: number) => {
    try {
      console.log('Generating quiz with', numQuestions, 'questions');
      const response = await axios.post('http://localhost:5000/generate-quiz', {
        text: text,
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
      <QuizForm onGenerateQuiz={handleGenerateQuiz} />
      <QuestionList questions={questions} />
    </div>
  );
}

export default App;

import './App.css';
import { useState } from 'react';
import QuizForm from './components/Spacy/QuizForm';
import QuestionList from './components/Spacy/QuestionList';
import TextInputForm from './components/Bert/TextInputForm';
import T5Form from './components/T5/T5Form';
import { generateQuiz } from './fetch/useFetchSpacy';
import { MCQ } from './types';
import { AiOutlineForm, AiOutlineRobot, AiOutlineExperiment } from "react-icons/ai";

function App() {
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showTextInputForm, setShowTextInputForm] = useState<boolean>(false);
  const [showT5Form, setShowT5Form] = useState<boolean>(false);

  const handleGenerateQuiz = async (text: string, numQuestions: number) => {
    try {
      const quizQuestions = await generateQuiz(text, numQuestions);
      setQuestions(quizQuestions);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

  const handleBackToMain = () => {
    setShowForm(false);
    setShowTextInputForm(false);
    setShowT5Form(false);
  };

  return (
    <div className="app-container">
      <h1>Hệ Thống Tạo Đề Thi Trắc Nghiệm CNTT</h1>
      
      {/* Show/hide QuizForm button */}
      {!showForm && !showTextInputForm && !showT5Form && (
        <>
          <button onClick={() => setShowForm(true)} className="action-button">
            <AiOutlineForm style={{ marginRight: "8px" }} />
            SPACY
          </button>
          <button onClick={() => setShowTextInputForm(true)} className="action-button">
            <AiOutlineRobot style={{ marginRight: "8px" }} />
            BERT
          </button>
          <button onClick={() => setShowT5Form(true)} className="action-button">
            <AiOutlineExperiment style={{ marginRight: "8px" }} />
            T5
          </button>
        </>
      )}

      {/* Show the "Back to Main" button and hide forms */}
      {(showForm || showTextInputForm || showT5Form) && (
        <button onClick={handleBackToMain} className="action-button">
          Trở về giao diện chính
        </button>
      )}

      {/* Show QuizForm or QuestionList */}
      {showForm && (
        <>
          <QuizForm onGenerateQuiz={handleGenerateQuiz} />
          <QuestionList questions={questions} />
        </>
      )}

      {/* Show TextInputForm */}
      {showTextInputForm && <TextInputForm />}

      {/* Show T5 Form */}
      {showT5Form && <T5Form />}
    </div>
  );
}

export default App;

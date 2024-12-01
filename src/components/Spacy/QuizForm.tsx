import { useState } from 'react';

interface QuizFormProps {
  onGenerateQuiz: (text: string, numQuestions: number) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ onGenerateQuiz }) => {
  const [inputText, setInputText] = useState<string>('');
  const [numQuestions, setNumQuestions] = useState<number>(5);

  const handleGenerateQuiz = () => {
    onGenerateQuiz(inputText, numQuestions);
  };

  return (
    <div className="quiz-form">
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
    </div>
  );
};

export default QuizForm;

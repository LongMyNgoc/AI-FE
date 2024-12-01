interface QuestionProps {
    questionStem: string;
    answerChoices: string[];
    correctAnswer: string;
  }
  
  const Question: React.FC<QuestionProps> = ({ questionStem, answerChoices, correctAnswer }) => {
    return (
      <div className="question">
        <h3>{questionStem}</h3>
        <ul>
          {answerChoices.map((option, idx) => (
            <li key={idx}>{option}</li>
          ))}
        </ul>
        <p><strong>Đáp án đúng:</strong> {correctAnswer}</p>
      </div>
    );
  };
  
  export default Question;
  
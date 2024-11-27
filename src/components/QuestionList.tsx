import Question from './Question';

interface MCQ {
  questionStem: string;
  answerChoices: string[];
  correctAnswer: string;
}

interface QuestionListProps {
  questions: MCQ[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <div className="question-list">
      {questions.map((q, index) => (
        <Question
          key={index}
          questionStem={q.questionStem}
          answerChoices={q.answerChoices}
          correctAnswer={q.correctAnswer}
        />
      ))}
    </div>
  );
};

export default QuestionList;

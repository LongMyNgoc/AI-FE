// src/api.ts
import axios from 'axios';

interface MCQ {
  questionStem: string;
  answerChoices: string[];
  correctAnswer: string;
}

export const generateQuiz = async (text: string, numQuestions: number): Promise<MCQ[]> => {
  try {
    console.log('Generating quiz with', numQuestions, 'questions');
    const response = await axios.post('http://localhost:5000/spacy/generate-quiz', {
      text: text,
      num_questions: numQuestions,
    });
    
    const formattedQuestions: MCQ[] = response.data.questions.map((q: [string, string[], string]) => ({
      questionStem: q[0],
      answerChoices: q[1],
      correctAnswer: q[2],
    }));
    return formattedQuestions;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error; // Throw error lên để có thể xử lý ở App.tsx
  }
};

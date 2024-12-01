// src/types.ts

// Định nghĩa interface cho câu hỏi trắc nghiệm
export interface MCQ {
    questionStem: string;  // Câu hỏi
    answerChoices: string[];  // Các đáp án
    correctAnswer: string;  // Đáp án đúng
  }
  
  // Định nghĩa các interface khác nếu cần (ví dụ: cho form nhập dữ liệu, kết quả trả về...)
  
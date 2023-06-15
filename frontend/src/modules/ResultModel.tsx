 // The "Result" interface defines the structure of a quiz result object containing information about the teacher,
// the quiz, the student, the answers to the questions, and other details of the result.
interface Result
{
  _id: String;
  teacher_code: String,
  quiz_title: String,
  grade: String,
  student: String,
  travel_time: String,
  date: String,
  answer_history: 
  [
    {
      question: String,
      userAnswer: String,
      correctAnswer: String
    }
  ],
  verified: String
}

export default Result;
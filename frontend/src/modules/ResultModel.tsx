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
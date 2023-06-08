import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
{
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
});

const Result = mongoose.model('results', resultSchema);

export default Result;
import mongoose from 'mongoose';

 // This code defines the schema and model for the "results" collection in MongoDB, 
// which allows you to work with the data in this collection through Mongoose.
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

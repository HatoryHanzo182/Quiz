import mongoose, { Schema, Document } from 'mongoose';

const quizSchema = new Schema(  // Quiz model.
{
  id: String,
  title: String,
  questions: [
    {
      question: String,
      answers: [{ answer: String, isCorrect: Boolean }]
    },
  ],
});

const Quiz = mongoose.model('quizes', quizSchema);  // Create a Quiz Model.

export default Quiz;
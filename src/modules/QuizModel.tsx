import mongoose, { Schema, Document } from 'mongoose';

interface QuizSchema extends Document  // Defining a Schema for a Quiz model. 
{
  id: string;
  title: string;
  questions: Array<
  {
    question: string;
    answers: Array<
    {
      answer: string;
      isCorrect: boolean;
    }>;
  }>;
}

const quizSchema = new Schema<QuizSchema>(  // Quiz model.
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


const Quiz = mongoose.model<QuizSchema>('Quiz', quizSchema);  // Create a Quiz Model.

export default Quiz;
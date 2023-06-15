import mongoose, { Schema } from 'mongoose';

 // This code is used to define the schema and model for the "quizes" 
// collection in MongoDB using Mongoose.
const quizSchema = new Schema( 
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

const Quiz = mongoose.model('quizes', quizSchema);

export default Quiz;
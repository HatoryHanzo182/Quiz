  // The "Question" interface defines the structure of the question for the quiz, 
 // where there is a question text and an array with answer options, 
// each of which has an answer text and a correct flag.
interface Question 
{
  question: string;
  answers: 
  {
    answer: string;
    isCorrect: boolean;
  }[];
}

export default Question 
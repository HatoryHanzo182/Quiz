import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from '../modules/Question'; 
import '../styles/Quiz.css';

const Quiz = () => {
  //useState Hook
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questionBank, setQuestionBank] = useState<Question[]>([]);   // Data about the quiz that we received by ID are stored here

  useEffect(() =>  // The hook runs after the page is loaded.
  {
    const fetchQuizData = async () =>  // In the method we read data from the database.
    {
        try 
        {
          const response = await axios.get('http://localhost:3001/quizzes');
          const quiz = response.data.find((quiz: { id: string }) => quiz.id === '7A16E2CB489F4C41853CFE40B13623D2');  // Looking for quiz data by our id.
      
          if (quiz)  // If the data is found, we loop through it to our questionBank hook.
          {
            const updatedQuestionBank = quiz.questions.map((question: Question) => 
            {
              return {
                question: question.question,
                answers: question.answers.map((answer) => (
                {
                    answer: answer.answer,
                    isCorrect: answer.isCorrect
                }))
              };
            });

            setQuestionBank(updatedQuestionBank);  // 
          }
        } catch (error) { console.error('Error while fetching quiz data:', error); }
      };
    
      fetchQuizData();
  }, []);

  const handleAnswerResponse = (isCorrect: any) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionBank.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  if (questionBank.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="app">
        {showScore ? (
          <div className="score-section">
            You have scored {score} out of {questionBank.length}
            <>
              <button className="score-button" type="submit" onClick={resetQuiz}>
                Restart
              </button>
            </>
          </div>
        ) : (
          <div>
            <div className="question-section">
              <div className="question-count">
                <span>{currentQuestion + 1}</span>/{questionBank.length}
              </div>

              <div className="question-text">{questionBank[currentQuestion].question}</div>
            </div>

            <div className="answer-section">
              {questionBank[currentQuestion].answers.map((answer, index) => (
                <button className="btnquiz"key={index} onClick={() => handleAnswerResponse(answer.isCorrect)}>
                  {answer.answer}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
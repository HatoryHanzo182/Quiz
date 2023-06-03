import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Question from '../modules/Question'; 
import { VscAccount } from "react-icons/vsc";
import '../styles/Quiz.css';

const Quiz = () => {
  //useState Hook
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questionBank, setQuestionBank] = useState<Question[]>([]);   // Data about the quiz that we received by ID are stored here.
  const { quiz_id } = useParams();  // Getting id quiz from menu component.
  const [time, setTime] = useState(900);  // Hook to get the actual time for the timer.
  const navigate = useNavigate();  // Navigation to transfer to the menu after the end of the quiz.

  useEffect(() =>  // The hook runs after the page is loaded.
  {
    const fetchQuizData = async () =>  // In the method we read data from the database.
    {
        try 
        {
          console.log(quiz_id);
          const response = await axios.get(`http://localhost:3000/quizzes/${quiz_id}`);
          const quizData = response.data;
          
          const updatedQuestionBank = quizData.questions.map((questionData: Question) => 
          {
            const { question, answers } = questionData;
            const transformedAnswers = answers.map((answer) => ({ answer: answer.answer, isCorrect: answer.isCorrect }));
      
            return { question, answers: transformedAnswers };
          });
      
          setQuestionBank(updatedQuestionBank);
      } 
      catch (error) { console.error('Error while fetching quiz data:', error); }
    };
    
      fetchQuizData();
  }, [quiz_id]);

  useEffect(() =>  // Hook to get up-to-date time
  {
    const timer = setInterval(() => { setTime((prevTime) => prevTime - 1); }, 1000);

    if (time === 0) 
    {
      clearInterval(timer);
      navigate('/Menu');
    }

    return () => { clearInterval(timer); };
  }, [time, navigate]);

  const formatTime = (seconds: number) => 
  {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };


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

  if (questionBank.length === 0) { return <div>Loading...</div>;}

  return (
    <>
<div className="navbar"> 
  <a className='profile' href='.'><VscAccount size={25}></VscAccount></a>
   </div>
      <div className="timer-section">{formatTime(time)}</div>
      <div className="app">
        {showScore ? (
          <div className="score-section">
            You have scored {score} out of {questionBank.length}
            <>
          <input type='text' placeholder='Teachers code'></input>
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
                <button className="btnquiz" key={index} onClick={() => handleAnswerResponse(answer.isCorrect)}>
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
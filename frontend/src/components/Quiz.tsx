import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VscAccount,VscHome } from "react-icons/vsc";
import axios from 'axios';
import User from "../modules/UserDataModel";
import Question from '../modules/QuestionModel'; 
import '../styles/Quiz.css';
import '../styles/bg.css'

const Quiz = () => 
{
  const { quiz_id } = useParams();  // Getting id quiz from menu component.
  const [questionBank, setQuestionBank] = useState<Question[]>([]);   // Data about the quiz that we received by ID are stored here.
  const [quizTitle, setQuizTitle] = useState('');
  const [userData, setUserData] = useState<User>();  // Hook to get user data. 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(900);  // Hook to get the actual time for the timer.
  const [teachersCode, setTeachersCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [answerHistory, setAnswerHistory] = useState<{ question: string; userAnswer: string | undefined; correctAnswer: string | undefined; }[]>([]);

  const navigate = useNavigate();  // Navigation to transfer to the menu after the end of the quiz.
  
  useEffect(() =>  // The hook runs after the page is loaded.
  {
    const ariownUserData = async () =>  // Get user data from browser local storage.
    {
      const storedUserData = sessionStorage.getItem('userData');
    
      if (storedUserData) 
      {
        setUserData(JSON.parse(storedUserData));
        sessionStorage.removeItem('ansHistory');
      }
      else
        navigate('/')
    }

    const fetchQuizData = async () =>  // In the method we read data from the database.
    {
        try 
        {
          const response = await axios.get(`http://localhost:3000/quizzes/${quiz_id}`);
          const quizData = response.data;
          
          setQuizTitle(quizData.title);

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

      ariownUserData();
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

  const handleAnswerResponse = (isCorrect: any) => 
  {
    if (isCorrect)
      setScore(score + 1);
    
      const answeredQuestion = questionBank[currentQuestion];
      const answerData = 
      {
        question: answeredQuestion.question,
        userAnswer: answeredQuestion.answers.find(answer => answer.isCorrect === isCorrect)?.answer,
        correctAnswer: answeredQuestion.answers.find(answer => answer.isCorrect)?.answer
      };
      setAnswerHistory(prevHistory => [...prevHistory, answerData]);

    const nextQuestion = currentQuestion + 1;
    
    if (nextQuestion < questionBank.length)
      setCurrentQuestion(nextQuestion);
    else 
      setShowScore(true);
  };

  const exitQuiz = () => { navigate('/Menu'); };

  const handleInputChange = (event: any) => { setTeachersCode(event.target.value); };

  const sendResult = async () =>
  {
    try
    {
      const user_response = await axios.get('http://localhost:3000/users');
      const users = user_response.data;

      if(teachersCode.trim() === "" || teachersCode.charAt(0) == " ")
        setCodeError("*This field cannot be empty");
      else if (users.find((user: User) => user.teacher_code === teachersCode)) 
      {        
        const currentDate = new Date();
        const new_result = 
        {
          teacher_code: teachersCode, 
          quiz_title: quizTitle, 
          grade: `${Math.round((((score / questionBank.length) * 100) / 100) * 12)}`, 
          student: `${userData?.name} ${userData?.surname}`,
          travel_time: formatTime(900 - time),
          date: `${currentDate.toDateString()}`,
          answer_history: answerHistory,
          verified: 'false'
        }

        await axios.post('http://localhost:3000/results', new_result);

        alert("Code sent successfully");
        navigate('/Menu');
      } 
      else 
        setCodeError("*Teacher not found");
    }
    catch(error) {  console.error('Error while getting data:', error); };
  }

  const handleHomeClick = (event:any) => 
  {
    event.preventDefault();

    navigate(`/Menu`);
  }

  const toggleAnswerHistory = () => 
  { 
    sessionStorage.setItem('ansHistory', JSON.stringify(answerHistory));
    
    window.open(`/Menu/Quiz/${quiz_id}/AnswerHistory`, '_blank');
  };

  if(questionBank.length === 0) 
  { 
    return(
      <>
        <div className="loader">
          <div className="loader-text">Loading...</div>
          <div className="loader-bar"></div>
        </div>
      </>)
  }
  
  return (
  <>
    <div className="navbar">
      <a className='home' href='.' onClick={(event) => handleHomeClick(event)}><VscHome size={25}></VscHome></a>
    </div>

    <div className="timer-section">{formatTime(time)}</div>
    <div className="app">{showScore ? (
      <div className="score-section">You have {score} correct answers out of {questionBank.length} <br/>
        Your score: {`${Math.round((((score / questionBank.length) * 100) / 100) * 12)}`} 
      <>
        <div className="form-container">
          <input type='text' placeholder='Teachers code' value={teachersCode} onChange={handleInputChange}></input>
          {codeError && <span className="error">{codeError}</span>}
          <div className="button-container">
            <button className="score-button" type="submit" onClick={exitQuiz}>Back to menu</button>
            <button className="score-button" type="submit" onClick={sendResult}>Send code</button>
          </div>
          <button className="anser-button" onClick={toggleAnswerHistory}>Show Answer History</button>
        </div>
      </>
    </div>
  ) : (
    <div>
      <div className="question-section">
        <div className="question-count"><span>{currentQuestion + 1}</span>/{questionBank.length}</div>
        <div className="question-text">{questionBank[currentQuestion].question}</div>
      </div>
      <div className="answer-section">
        {questionBank[currentQuestion].answers.map((answer, index) => 
        (<button className="btnquiz" key={index} onClick={() => handleAnswerResponse(answer.isCorrect)}>{answer.answer}</button>))}
      </div>
    </div>)}
    </div>
  </>);
};

export default Quiz;
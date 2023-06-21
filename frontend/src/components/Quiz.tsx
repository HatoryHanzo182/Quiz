import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VscHome } from "react-icons/vsc";
import axios from 'axios';
import User from "../modules/UserDataModel";
import Question from '../modules/QuestionModel'; 
import style from '../styles/Quiz.module.css';

const Quiz = () => 
{
  /*
      * The Quiz component is an interactive quiz where the user can answer questions and get results.
      * Hooks are used inside the component to manage state and perform various actions. Here are the main hooks that are used in the 
      * component.
      * 
      * The component also defines several event handler functions such as handleAnswerResponse, toggleAnswerHistory,
      *  handleInputChange, sendResult, handleHomeClick, and exitQuiz. They are responsible for processing the user's responses, 
      * displaying the history of responses, entering and submitting the teacher code, navigating and exiting the quiz.
      * 
      * The component also contains markup that displays the current question, answer options, timer, score, and 
      * other information based on the state of the component.
      * 
      * If the questionBank is empty (i.e. the quiz data hasn't been loaded yet), a loading indicator is displayed.
      * 
      * In general, the Quiz component provides the user with an interactive experience of taking the quiz and 
      * interacting with questions and answers.
   */
  
  // Hooks.
  //================================================================================================
          // All hooks related to quiz data.
  const { quiz_id } = useParams();  // Getting id quiz from menu component.
  const [questionBank, setQuestionBank] = useState<Question[]>([]);   // Data about the quiz that we received by ID are stored here.
  const [quizTitle, setQuizTitle] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
          
          // Hook storing user data.
  const [userData, setUserData] = useState<User>();  // Hook to get user data. 

          // Timer.
  const [time, setTime] = useState(900);  // Hook to get the actual time for the timer.
  
          // Working on the output of the result.
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [teachersCode, setTeachersCode] = useState('');
  const [answerHistory, setAnswerHistory] = useState<{ question: string; userAnswer: string | undefined; correctAnswer: string | undefined; }[]>([]);
  const [codeError, setCodeError] = useState('');
  
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
          const response = await axios.get(`http://localhost:3000/quizes/${quiz_id}`);
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
  
  // Timer.
  //================================================================================================
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
  //================================================================================================


  // Response event handlers.
  //================================================================================================
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

  const toggleAnswerHistory = () => 
  { 
    sessionStorage.setItem('ansHistory', JSON.stringify(answerHistory));
    
    window.open(`/Menu/Quiz/${quiz_id}/AnswerHistory`, '_blank');
  };
  //================================================================================================

  // Send result event.
  //================================================================================================
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
  //================================================================================================

  // Transition events.
  //================================================================================================
  const handleHomeClick = (event:any) => 
  {
    event.preventDefault();

    navigate(`/Menu`);
  }

  const exitQuiz = () => { navigate('/Menu'); };
  //================================================================================================

  if(questionBank.length === 0) 
  { 
    return(
    <>
      {/*Loading content.*/}
      <div className={style.loader}>
        <div className={style['loader-text']}>Loading...</div>
        <div className={style['loader-bar']}></div>
      </div>
    </>)
  }
  
  return (
  <>
    {/* Home */}
    <div className={style.navbar}>
      <a className={style.home} href='.' onClick={(event) => handleHomeClick(event)}><VscHome size={25}/></a>
    </div>
    {/* Timer */}
    <div className={style['timer-section']}>{formatTime(time)}</div>
    {/* Main content */}
    <div className={style.app}>
      {showScore ? ( /* Score section */
        <div className={style['score-section']}>You have {score} correct answers out of {questionBank.length}
        <br />
        Your score: {`${Math.round((((score / questionBank.length) * 100) / 100) * 12)}`}
        {/* Form */}
        <div className={style['form-container']}>
          <input className={style['i-send-code']} type='text' placeholder='Teachers code' value={teachersCode} onChange={handleInputChange} />
          {codeError && <span className={style.error}>{codeError}</span>}
          <div className={style['button-container']}>
            <button className={style['score-button']} type="submit" onClick={exitQuiz}>Back to menu</button>
            <button className={style['score-button']} type="submit" onClick={sendResult}>Send code</button>
          </div>
          <button className={style['answer-button']} onClick={toggleAnswerHistory}>Show Answer History</button>
        </div>
      </div>
    ) : ( /* Question section */
    <div>
      <div className={style['question-section']}>
        <div className={style['question-count']}>
          <span>{currentQuestion + 1}</span>/{questionBank.length}
        </div>
        <div className={style['question-text']}>{questionBank[currentQuestion].question}</div>
      </div>
      {/* Answer section */}
      <div className={style['answer-section']}>
        {questionBank[currentQuestion].answers.map((answer, index) => (
          <button className={style.btnquiz} key={index} onClick={() => handleAnswerResponse(answer.isCorrect)}>{answer.answer}</button>
        ))}
      </div>
    </div>
    )}
    </div>
  </>);
};

export default Quiz;
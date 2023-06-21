import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import User from "../modules/UserDataModel";
import style from '../styles/AnswerHistory.module.css';

function AnswerHistory()
{
    const [userData, setUserData] = useState<User>();  // Hook to get user data. 
    const [answerHistory, setAnswerHistory] = useState<{ question: string; userAnswer: string | undefined; correctAnswer: string | undefined; }[]>([]);

    const navigate = useNavigate();  // Navigation to transfer to the menu.
  
    useEffect(() =>  // The hook runs after the page is loaded.
    {
        const ariownUserData = async () =>  // Get user data from browser local storage.
        {
          const storedUserData = sessionStorage.getItem('userData');
        
          if (storedUserData) 
            setUserData(JSON.parse(storedUserData));
          else
            navigate('/')
        }

        function pullHistory()
        {
            const storedHistory = sessionStorage.getItem('ansHistory');
            
            if (storedHistory) 
                setAnswerHistory(JSON.parse(storedHistory));
        }

        ariownUserData();
        pullHistory();
    }, [])

    return (
    <>
      {/*Response story content.*/}
      <div className={style.card}>
        <h1>Answers</h1>
        <div className={style['card-content']}>{answerHistory.map((answer, index) => (
          <div key={index}>
            <hr />
            <br />
            <p>{answer.question}</p>
            <p className={answer.userAnswer === answer.correctAnswer ? style.correct : style.incorrect}>
              Your answer: {answer.userAnswer}
            </p>
            <p className={style.correct}>Correct answer: {answer.correctAnswer}</p>
            <br />
          </div>))}
        </div>
      </div>
    </>)
}

export default AnswerHistory;
import React from 'react'
import { useState } from 'react';
import '../styles/quizstyle.css'


const Quiz = () => {
    var Questionbank = [
        {
            Question: "What is AAA abrjs jkljdf jlf jfl kwf lkf kofo kwofj jwehsi nvn fjkvnfjnsbv jdbfjsb jdbj bdj wsn wk mm m kdk k ?",
            Answers: [
                { Answer: "AAA", isCorrect: true },
                { Answer: "BBB", isCorrect: false },
                { Answer: "CCC", isCorrect: false },
                { Answer: "DDD", isCorrect: false }
            ]
        },
        {
            Question: "What is BBB?",
            Answers: [
                { Answer: "AAA", isCorrect: false },
                { Answer: "BBB", isCorrect: true },
                { Answer: "CCC", isCorrect: false },
                { Answer: "DDD", isCorrect: false }
            ]
        }, {
            Question: "What is GGG?",
            Answers: [
                { Answer: "GGG", isCorrect: true },
                { Answer: "BBB", isCorrect: false },
                { Answer: "CCC", isCorrect: false },
                { Answer: "DDD", isCorrect: false }
            ]
        },
        {
            Question: "What is DDD?",
            Answers: [
                { Answer: "AAA", isCorrect: false },
                { Answer: "BBB", isCorrect: false },
                { Answer: "CCC", isCorrect: false },
                { Answer: "DDD", isCorrect: true }
            ]
        },
        {
            Question: "What is CCC?",
            Answers: [
                { Answer: "AAA", isCorrect: false },
                { Answer: "BBB", isCorrect: false },
                { Answer: "CCC", isCorrect: true},
                { Answer: "DDD", isCorrect: false }
            ]
        }
    ]

    //useState Hook
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

const handleAnswerResponse=(isCorrect:any)=>
{
    if(isCorrect)
    {
        setScore(score+1);
    }

   const nextQuestion= currentQuestion+1;
   if(nextQuestion<Questionbank.length)
   {
    setCurrentQuestion(nextQuestion);
   }
   else{
    setShowScore(true);
   }
}

const resetQuiz=()=>
{
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
}

    return (
        <>
        <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
        <div className='app'>
          
            {showScore ? (
                <div className='score-section'>
                    You have scored {score} out of {Questionbank.length}
                    <>
                       <button className="score-button" type="submit" onClick={resetQuiz}>Restart</button>
                    </>
                </div>
            )
                : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                               <span>{currentQuestion+1}</span>/{Questionbank.length}
                            </div>

                            <div className='question-text'>
                             {Questionbank[currentQuestion].Question}
                            </div>
                        </div>

                        <div className='answer-section'>
                          {Questionbank[currentQuestion].Answers.map((answer)=>
                          (
                              <button onClick={()=>handleAnswerResponse(answer.isCorrect)}>{answer.Answer}</button>
                          ))}
                        </div>
                    </>
                )
            }

        </div>
        </>
    );
}

export default Quiz;
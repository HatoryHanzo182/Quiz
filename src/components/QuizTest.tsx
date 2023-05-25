import React from 'react'
import '../styles/Quiztest.css'


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function QuizTest() {

const questions = [
    {
        question:"Which is which?",
        answers: [
            {text:"Shark1",correct:false},
            {text:"Sha21rk",correct:false},
            {text:"Shark",correct:true},
            {text:"Shar231k",correct:false},
        ]
    },
    {
        question:"Which is which?",
        answers: [
            {text:"Shark1",correct:false},
            {text:"Sha21rk",correct:false},
            {text:"Shark",correct:true},
            {text:"Shar231k",correct:false},
        ]
    },
    {
        question:"Which is which?",
        answers: [
            {text:"Shark1",correct:false},
            {text:"Sha21rk",correct:false},
            {text:"Shark",correct:true},
            {text:"Shar231k",correct:false},
        ]
    },
    {
        question:"Which is which?",
        answers: [
            {text:"Shark1",correct:false},
            {text:"Sha21rk",correct:false},
            {text:"Shark",correct:true},
            {text:"Shar231k",correct:false},
        ]
    },
    {
        question:"Which is which?",
        answers: [
            {text:"Shark1",correct:false},
            {text:"Sha21rk",correct:false},
            {text:"Shark",correct:true},
            {text:"Shar231k",correct:false},
        ]
    },
]




currentQuestionIndex = 0;
score = 0;
// nextButton?.innerHTML = "Next";
// showQuestion();




  return (
<>
<div className="Testapp">
    <h1>Quiz</h1>
    <div className="quiz">
        <h2 id='question'>Question goes here</h2>
        <div id="answer-buttons">
            <button className='btnQ'>Answer 1 </button>
            <button className='btnQ'>Answer 2</button>
            <button className='btnQ'>Answer 3</button>
            <button className='btnQ'>Answer 4</button>
        </div>
        <button id="next-btn">Next</button>
    </div>
</div>
 
</>
  );
}

export default QuizTest
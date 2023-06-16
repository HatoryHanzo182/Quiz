import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import User from '../modules/UserDataModel';
import Result from '../modules/ResultModel';
import axios from 'axios';
import '../styles/TeacherMenu.css';
import '../styles/bg.css'

function TeacherMenu()
{
    const [userData, setUserData] = useState<User>();  // Hook to get user data.
    const [resultsQuizzes, setResultsQuizzes] = useState<Result[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Result | null>(null);

    const navigate = useNavigate();

    useEffect(() =>  // Hook for processing data when the page is fully loaded.
    {
        const ariownUserData = async () =>  // Get teacher data from browser local storage.
        {
            const storedUserData = sessionStorage.getItem('userData');

            if (storedUserData) 
                setUserData(JSON.parse(storedUserData));
            else
                navigate('/')
        }
        
        const fetchStudentData = async () => 
        {
            try 
            {
                const response = await axios.get('http://localhost:3000/results');
                
                setResultsQuizzes(response.data);
            } 
            catch (error) { console.error('Error while fetching student data:', error); }
        };
        
        ariownUserData();
        fetchStudentData();
    }, []);

    const handleProfileClick = (event: any) =>  // Profile transition event. 
    {
      event.preventDefault(); 
  
      navigate(`/TeacherMenu/Profile`);
    };

    const handleRowClick = (student: any) => 
    {
      setSelectedStudent(student);
    
      if (student.verified === "false") 
      {
        const updatedStudent = { ...student, verified: "true" };
        const updatedResults = resultsQuizzes.map((s) => s._id === student._id ? updatedStudent : s);
    
        setResultsQuizzes(updatedResults);

        console.log(student._id);

        axios.put(`http://localhost:3000/results/${student._id}`, { verified: "true" }).then(() => 
        {
          const updatedResultsLocal = resultsQuizzes.map((s) => s._id === student._id ? updatedStudent : s);

          setResultsQuizzes(updatedResultsLocal);
        }).catch((error) => { console.error("Error updating student verification:", error); });
      }
    };

    if (!resultsQuizzes || resultsQuizzes.length === 0)
    {
      return (
      <>
        <div>
          <div className="navbar">
            <a className="profile" href="." onClick={(event) => handleProfileClick(event)}><VscAccount size={25} /></a>
          </div>
          <div className="mycent">
            <div className="container1">
              <div className="content">
                <h1 className={userData && userData.teacher_code.toString()}>Teacher code: {userData && userData.teacher_code}</h1>
                <h2>You don't have new results</h2>
              </div>
            </div>
          </div>
        </div>
      </>)
    }

    return(
      <>
      <div>
        <div className="navbar">
          <a className="profile" href="." onClick={(event) => handleProfileClick(event)}>
            <VscAccount size={25} />
          </a>
        </div>
        <div className="mycent">
          <div className="container1">
            <div className="content">
              <h1 className={userData && userData.teacher_code.toString()}>Teacher code: {userData && userData.teacher_code}</h1>
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Quiz</th>
                    <th>Grade</th>
                    <th>Travel time</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsQuizzes.slice().reverse().map((student) => (
                    <tr key={student._id.toString()} onClick={() => handleRowClick(student)}>
                      <td className="student-cell">
                        {student.verified === "false" && <span className="new-result-label">New</span>}
                        {student.student}
                      </td>
                      <td>{student.quiz_title}</td>
                      <td>{student.grade}</td>
                      <td>{student.travel_time}</td>
                      <td>{student.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="quiz-history">
              {selectedStudent && (
                <div>
                  <h2>{selectedStudent.quiz_title} for {selectedStudent.student}</h2>
                  {selectedStudent.answer_history && selectedStudent.answer_history.map((answer, index) => (
                    <div key={index}>
                      <hr />
                      <br />
                      <p>{answer.question}</p>
                      <p className={answer.userAnswer === answer.correctAnswer ? "correct" : "incorrect"}>Answer: {answer.userAnswer}</p>
                      <p className='correct'>Correct Answer: {answer.correctAnswer}</p>
                      <br/>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>)
} 

export default TeacherMenu;
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import axios from 'axios';
import User from '../modules/UserDataModel';
import Result from '../modules/ResultModel';
import style from '../styles/TeacherMenu.module.css';

function TeacherMenu() 
{
  const [userData, setUserData] = useState<User>();
  const [resultsQuizzes, setResultsQuizzes] = useState<Result[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Result | null>(null);

  const navigate = useNavigate();

  useEffect(() => 
  {
    const fetchUserData = async () => 
    {
      const storedUserData = sessionStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        navigate('/');
      }
    };

    const fetchResultsQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/results');
        setResultsQuizzes(response.data);
      } catch (error) {
        console.error('Error while fetching student data:', error);
      }
    };

    fetchUserData();
    fetchResultsQuizzes();
  }, []);

  const handleProfileClick = (event: any) => 
  {
    event.preventDefault();
    
    navigate('/TeacherMenu/Profile');
  };

  const handleRowClick = (student: Result) =>  // Sets the selected student to the selectedStudent state using the setSelectedStudent(student) function.
  {                                           // setSelectedStudent(student) function.
                                             // Checks the value of the verified property of the student. If it is equal to the string "false", then additional actions are performed.
                                            // A copy of the selected student is created with the verified property updated to "true". The updated student is stored in the updatedStudent variable.
    setSelectedStudent(student);

    if (student.verified === "false") 
    {
      const updatedStudent = { ...student, verified: "true" };
      const updatedResults = resultsQuizzes.map((s) => (s._id === student._id ? updatedStudent : s));

      setResultsQuizzes(updatedResults);

      axios.put(`http://localhost:3000/results/${student._id}`, { verified: "true" }).then(() => 
      {
        const updatedResultsLocal = resultsQuizzes.map((s) => (s._id === student._id ? updatedStudent : s));
        
        setResultsQuizzes(updatedResultsLocal);
      }).catch((error) => { console.error("Error updating student verification:", error);});
    }
  };

  const filteredResults = resultsQuizzes.filter((result) => result.teacher_code === (userData && userData.teacher_code));  // Filter results based on teacher code.

  if (!filteredResults || filteredResults.length == 0)  // Displayed if there are still no results.
  {
    return (
      <>
        {/*Content in the absence of data.*/}
        <div>
          <div className={style.navbar}>
            {/*Profile exit icon.*/}
            <a className={style.profile} href="." onClick={handleProfileClick}>
              <VscAccount size={25} />
            </a>
          </div>
          {/*Main content.*/}
          <div className={style.mycent}>
            <div className={style.container1}>
              <div className={style.content}>
                <h1 className={userData && userData.teacher_code.toString()}>Teacher code: {userData && userData.teacher_code}</h1>
                <h2>You don't have new results</h2>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }


  return (
  <>
    {/*Markup with a table of results and and passing history.*/}
    <div className={style.container}>
      <div className={style.navbar}>
        {/*Profile exit icon.*/}
        <a className={style.profile} href="." onClick={handleProfileClick}>
          <VscAccount size={25} />
        </a>
      </div>
      <div className={style.mycent}>
        <div className={style.container1}>
          <div className={style.content}>
            <h1 className={userData && userData.teacher_code.toString()}>Teacher code: {userData && userData.teacher_code}</h1>
            <div className={style.tableWrapper}>
              {/*Results table.*/}
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
                  {filteredResults.slice().reverse().map((student) => (
                    <tr key={student._id.toString()} onClick={() => handleRowClick(student)}>
                      <td className={style['student-cell']}>
                        {student.verified === "false" && <span className={style['new-result-label']}>New</span>}
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
          </div>
        </div>
        {/*History panel.*/}
        <div className={style['quiz-history-panel']}>
          {selectedStudent ? (
            <div className={style['quiz-history']}>
              <h2>{selectedStudent.quiz_title} for {selectedStudent.student}</h2>
              {selectedStudent.answer_history && selectedStudent.answer_history.map((answer, index) => (
                <div key={index}>
                  <hr />
                  <br />
                  <p>{answer.question}</p>
                  <p className={answer.userAnswer === answer.correctAnswer ? style.correct : style.incorrect}>Answer: {answer.userAnswer}</p>
                  <p className={style.correct}>Correct Answer: {answer.correctAnswer}</p>
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <div className={style['centered-text']}>
              <h3>History of answers to quizzes</h3>
              <p>To see the history, click on the student in the table on the right.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </>);
}

export default TeacherMenu;

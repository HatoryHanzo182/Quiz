import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import User  from '../modules/UserDataModel';
import axios from 'axios';
import '../styles/TeacherMenu.css';
import '../styles/bg.css'

function TeacherMenu()
{
    const [userData, setUserData] = useState<User>();  // Hook to get user data.
    const [resultsQuizzes, setResultsQuizzes] = useState<any[]>([]);
    
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
                const rsults = response.data;
                
                setResultsQuizzes(rsults);
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

    const handleExitClick = (event: React.MouseEvent<HTMLAnchorElement>) => 
    {
      event.preventDefault();
      sessionStorage.removeItem('userData');
      window.history.replaceState(null, '', '/');
      
      navigate('/');
    };

    return(
    <>
        <div className="navbar">
            <a className='profile' href='.' onClick={(event) => handleProfileClick(event)}><VscAccount size={25}></VscAccount></a>
        </div>
        <div className="container">
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
                    <tbody>{resultsQuizzes.map((student, index) => 
                    (
                        <tr key={index}>
                        <td>{student.student}</td>
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
        <a href="#" className='aExit' onClick = {handleExitClick}>
            <span>Exit</span>
            <div className="liquid"></div>
        </a>
    </>)
} 

export default TeacherMenu;
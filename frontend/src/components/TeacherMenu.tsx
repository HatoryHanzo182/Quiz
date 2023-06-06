import React, { useEffect, useState } from 'react';
import User  from '../modules/UserDataModel';
import axios from 'axios';
import '../styles/TeacherMenu.css';
import '../styles/bg.css'

function TeacherMenu()
{
    const [userData, setUserData] = useState<User>();  // Hook to get user data.
    const [resultsQuizzes, setResultsQuizzes] = useState<any[]>([]);

    useEffect(() =>  // Hook for processing data when the page is fully loaded.
    {
        const ariownUserData = async () =>  // Get teacher data from browser local storage.
        {
          const storedUserData = sessionStorage.getItem('userData');
        
          if (storedUserData) 
            setUserData(JSON.parse(storedUserData));
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

    return(
    <>
        <h1 className={userData && userData.teacher_code.toString()}>{userData && userData.teacher_code}</h1>
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
 </>)
} 

export default TeacherMenu;
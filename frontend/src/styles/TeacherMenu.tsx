import React, { useEffect } from 'react';
import { TeacherMenuProps } from '../modules/TeacherMenuProps';
import '../styles/TeacherMenu.css';

function TeacherMenu({ userData }: TeacherMenuProps)
{
    useEffect(() =>  // Hook for processing data when the page is fully loaded.
    {
        console.log(userData.teacher_code);
    }, [userData ]);

    return(
    <>
        <h1 className={userData && userData.teacher_code}>{userData && userData.teacher_code}</h1>
    </>)
} 

export default TeacherMenu;
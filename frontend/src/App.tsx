import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext,useEffect } from 'react';
import Auth from './components/Auth';
import TeacherMenu from './components/TeacherMenu';
import Menu from './components/Menu';
import Quiz from './components/Quiz';
import './App.css';
import TMenu from './components/TMenu';

function App() 
{
  const [userData, setUserData] = useState(null);  // This hook receives user data and passes it to other components.

  return (
<TMenu/>
    // <BrowserRouter>
    //   <Routes>
    //   <Route path="/" element={<Auth updateUserData={setUserData} />}/>
    //   <Route path="/TeacherMenu" element={userData && <TeacherMenu userData={userData} />} />
    //   <Route path="/Menu" element={<Menu />} />
    //   <Route path="/Menu/Quiz/:quiz_id" element={ <Quiz />} />
    //   </Routes>
    // </BrowserRouter>
  );
}


export default App;
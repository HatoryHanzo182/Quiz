import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Menu from './components/Menu';
import TeacherMenu from './components/TeacherMenu';
import './App.css';

function App() 
{
  const [userData, setUserData] = useState(null);  // This hook receives user data and passes it to other components.

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Auth updateUserData={setUserData} />}/>
      <Route path="/TeacherMenu" element={userData && <TeacherMenu userData={userData} />} />
      <Route path="/Menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
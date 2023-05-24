import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Quiz from './components/Quiz';
import Menu from './components/Menu';

function App() 
{
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Auth />}/>
      <Route path="/Menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
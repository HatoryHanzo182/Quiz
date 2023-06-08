import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import TeacherMenu from './components/TeacherMenu';
import Menu from './components/Menu';
import Quiz from './components/Quiz';
import Profile from './components/Profile';
import './App.css';



function App() 
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/Menu" element={<Menu/>}/>
        <Route path="/TeacherMenu" element={<TeacherMenu/>}/>
        <Route path="/Menu/Profile" element={<Profile />} />
        <Route path="/TeacherMenu/Profile" element={<Profile />} />
        <Route path="/Menu/Quiz/:quiz_id" element={<Quiz />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
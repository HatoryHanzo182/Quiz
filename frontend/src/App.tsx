import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import TeacherMenu from './components/TeacherMenu';
import Menu from './components/Menu';
import Quiz from './components/Quiz';
import TMenu from './components/TMenu';
import './App.css';

function App() 
{
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/TeacherMenu" element={<TeacherMenu/>}/>
        <Route path="/Menu" element={<Menu/>}/>
        <Route path="/TMenu" element={<TMenu/>}/>
        <Route path="/Menu/Quiz/:quiz_id" element={<Quiz />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
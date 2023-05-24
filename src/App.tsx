import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Menu from './components/Menu';
import QuizTest from './components/QuizTest';

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
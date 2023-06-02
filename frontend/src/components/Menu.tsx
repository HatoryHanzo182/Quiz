import React from 'react'
import ReactDOM from "react-dom/client";
import { useNavigate } from 'react-router-dom';
import Quiz from './Quiz';
import { VscAccount } from "react-icons/vsc";
import '../styles/Menu.css';

function Menu() 
{
  const navigate = useNavigate();

  const handleQuizClick = (quiz_id: string) => { navigate(`/Menu/Quiz/${quiz_id}`); };

  return (
  <>

<nav>
  <div className="navbar">
    <a className="logo" href=".">Лого</a>
   <a className='profile' href='.'><VscAccount size={25}></VscAccount></a>
   

    </div>
</nav>
    <div className="ag-format-container">
      <div className="ag-courses_box">
        <div className="ag-courses_item">
          <a className="ag-courses-item_link" onClick={() => handleQuizClick("64775e84880214b8b0d307ad")}>
          <div className="ag-courses-item_bg"></div>
          <div className="ag-courses-item_title">Basic Quiz C++</div>
          </a>
        </div>



    <div className="ag-courses_item">
      <a  className="ag-courses-item_link" onClick={()=> handleQuizClick("6479134a880214b8b0757a03")}>
        <div className="ag-courses-item_bg"></div>
        <div className="ag-courses-item_title">
          Basic Quiz HTML
        </div>

     
      </a>
    </div>

    <div className="ag-courses_item">
      <a className="ag-courses-item_link"  onClick={()=> handleQuizClick("6479117c880214b8b073b080")}>
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
        Basic Quiz CSS
        </div>

       
      </a>
    </div>

    <div className="ag-courses_item">
      <a  className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
         Basic Quiz JavaScript
        </div>

       
      </a>
    </div>

    <div className="ag-courses_item">
      <a  className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Motion Design
        </div>

      
      </a>
    </div>

    <div className="ag-courses_item">
      <a  className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Front-end development
        </div>
      </a>
    </div>

   

    <div className="ag-courses_item">
      <a  className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Interior Design
        </div>

     
      </a>
    </div>

  </div>
</div>


</>
  );
}

export default Menu;
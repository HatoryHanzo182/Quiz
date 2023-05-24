import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from './Quiz';
import '../styles/Menu.css';

function Menu() {
  return (
<>
<div className="ag-format-container">
  <div className="ag-courses_box">
    <div className="ag-courses_item">
      <a className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
         Software Developer C++
        </div>

      
      </a>
    </div>

    <div className="ag-courses_item">
      <a  className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Software developer JavaScript
        </div>

     
      </a>
    </div>

    <div className="ag-courses_item">
      <a className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
        UI/UX designer
        </div>

       
      </a>
    </div>

    <div className="ag-courses_item">
      <a  className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Graphic Design
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
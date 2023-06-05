import React from 'react';
import '../styles/TeacherMenu.css';
import test from '../img/test.png'
import '../styles/bg.css'

function TMenu() {
  return (
    <>



<div className="profcont">
  <div className="pcolumn">
    <div className="pcard">
    <div className="pic">
        <img src={test}></img> 
      </div>
      <div className="ptext">
    <h3>name + surname</h3>
      <p>Login</p>
      <p>email</p>
      </div>
    </div>
  </div>

  <div className="pcolumn">
    <div className="pcard">
    <div className="pic">
        <img src={test}></img> 
      </div>
      <div className="ptext">
    <h3>name + surname</h3>
      <p>Login</p>
      <p>email</p>
      </div>
    </div>
  </div>

 
</div>


  
    </>
  )
}

export default TMenu;
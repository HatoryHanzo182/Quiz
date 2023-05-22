import React from 'react'
import '../styles/Auth.css';

function Auth() {
    return (
      <>
        <div>
        <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      
      <form>
        <h3>Verification</h3>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Login" id="username"/>
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password"/>
        <button>Log In</button>
        <button>Registration</button>
      </form>
      </div>
      </>);
    }

export default Auth
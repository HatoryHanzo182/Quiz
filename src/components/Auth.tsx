import React, { useState } from 'react';
import '../styles/Auth.css';



function Auth() 
{
  const [showRegistration, setShowRegistration] = useState(false);
  const handleRegistrationClick = (event: any) => 
  {
    event.preventDefault();
    setShowRegistration(true);
  };

  return (
    <>
      { showRegistration ? (
        <div>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <form>
            <h3>Registration</h3>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="real name" id="regist_name"/>
            <label htmlFor="surname">Surname</label>
            <input type="password" placeholder="real surname" id="regist_surname"/>
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="@gmail.com" id="regist_email"/>
            <label htmlFor="login">Login</label>
            <input type="text" placeholder="login" id="regist_login"/>
            <label htmlFor="Password">Password</label>
            <input type="password" placeholder="password" id="regist_password"/>
            <label htmlFor="Password">Password confirmation</label>
            <input type="password" placeholder="confirmation" id="regist_confirmation"/>
            <button>Register</button>
          </form>
        </div>
      ) : (
        <div>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <form>
            <h3>Auth</h3>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Login" id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" />
            <button>Log In</button>
            <button onClick={handleRegistrationClick}>Registration</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Auth;
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

function Auth() 
{
  const [showRegistration, setShowRegistration] = useState(false);
  const ShowRegistrationPlateClick = (event: any) => 
  {
    event.preventDefault();
    setShowRegistration(true);
  };

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistrationClick = async (event: any) => 
  {
    event.preventDefault();
    const userData = { name, surname, email, login, password };

    try 
    {
      await axios.post('http://localhost:3000/users', userData);

      setName('');
      setSurname('');
      setEmail('');
      setLogin('');
      setPassword('');
    } catch (error) { console.error('Registration failed:', error); }
  };

  return (
    <>
      {showRegistration ? (
        <div>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <form>
            <h3>Registration</h3>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="real name" value={name} onChange={(e) => setName(e.target.value)}/>
            <label htmlFor="surname">Surname</label>
            <input type="text" placeholder="real surname" value={surname} onChange={(e) => setSurname(e.target.value)}/>
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="login">Login</label>
            <input type="text" placeholder="login" value={login} onChange={(e) => setLogin(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleRegistrationClick}>Register</button>
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
            <input type="text" placeholder="Login" id="username" value={login} onChange={(e) => setLogin(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Log In</button>
            <button onClick={ShowRegistrationPlateClick}>Registration</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Auth;

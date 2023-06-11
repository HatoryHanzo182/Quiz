import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs'
import '../styles/Auth.css';
import '../styles/bg.css'

declare module 'bcryptjs';

function Auth()
{
  // Hooks.
  //================================================================================================
        // Getting data from fields.
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [teacher_code, setCode] = useState('null');

        // Passing validity error messages.
  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const [showRegistration, setShowRegistration] = useState(false);  // Button event handler opens registration window.
  const [isTeacher, setIsChecked] = useState(false);  // Hook for defining teacher checkbox logic.
  
  const navigate = useNavigate();  // Page navigation hook.
  //================================================================================================

  // Login.
  //================================================================================================
  const handleLoginClick = async (event: any) =>  // Login button event.
  {
    event.preventDefault();

    try
    { 
      const response = await axios.get('http://localhost:3000/users');
      const { role, user } = checkLoginAndPassword(response.data);

      if(role === "teacher")
      { 
        sessionStorage.setItem('userData', JSON.stringify(user));

        navigate('/TeacherMenu');
      }
      else if(role === "student")
      {
        sessionStorage.setItem('userData', JSON.stringify(user));

        navigate('/Menu');
      }
    }
    catch(error) {  console.error('Error while getting data:', error); };
  }

  // Login authentication.
  //================================================================================================
  function checkLoginAndPassword(data: any[]) 
  {
    if(login.trim() === "" || login.charAt(0) == " ")
      setLoginError("*This field cannot be empty");
    else if(login.trim() === "" || login.charAt(0) == " ")
      setPasswordError("*This field cannot be empty");

    const user = data.find(item => item.login === login);
  
    if (user) 
    {
      if (unhashPassword(user.hesh_pass)) 
      {
        setLogin('');
        setPassword('');
        setLoginError("");
        setPasswordError("");

        if(user.teacher_code !== "null")
          return { role: "teacher", user: user };
        
        return { role: "student", user: user }
      }
      else 
        setPasswordError("*Incorrect password");
    } 
    else 
      setLoginError("*This user was not found");
    
      return { role: "null", user: null };
  }
  //================================================================================================
  //================================================================================================

  // Registration.
  //================================================================================================
  const ShowRegistrationPlateClick = (event: any) =>  // Method shows registration layout.
  {
    event.preventDefault();
    setShowRegistration(true);
  };

  const handleRegistrationClick = async (event: any) => // Register button event.
  {
    event.preventDefault();

    if(IsValidRegistrationPanel())
    {
      const hesh_pass = await hashPassword(password);
      const new_user = { name, surname, email, login, hesh_pass, teacher_code};

      try
      {
        await axios.post('http://localhost:3000/users', new_user);

        setName('');
        setSurname('');
        setEmail('');
        setLogin('');
        setPassword('');
        setShowRegistration(false);
        setCode('null');
        
        alert("Welcome");
      } 
      catch (error) { console.error('Registration failed:', error); }
    }
  };

  const handleCheckboxChange = () =>  { setIsChecked(!isTeacher); };

  // Verification of fields during registration.
  //================================================================================================
  const IsValidRegistrationPanel = () =>
  {
    if(ValidName() && ValidSurname() && ValidEmail() && ValidLogin() && ValidPass())
      return true;
    return false;
  }

  const ValidName = () =>
  {
    if(name.trim() === "" || name.charAt(0) == " ")
    {
      setNameError("*This field cannot be empty");
      return false;
    }
    else if((name.length <= 2 || name.length > 16))
    {
      setNameError("*The allowed number of characters in this field is from 2 to 15");
      return false;
    }
    else if(!/^[a-zA-Z]+$/.test(name))
    {
      setNameError("*Only characters are allowed in this field.");
      return false;
    }
    else
      setNameError("");
    
    return true;
  }

  const ValidSurname = () =>
  {
    if(surname.trim() === "" || surname.charAt(0) == " ")
    {
      setSurnameError("*This field cannot be empty");
      return false;
    }
    else if((surname.length <= 2 || surname.length > 20))
    {
      setSurnameError("*The allowed number of characters in this field is from 2 to 19");
      return false;
    }
    else if(!/^[a-zA-Z]+$/.test(surname))
    {
      setSurnameError("*Only characters are allowed in this field.");
      return false;
    }
    else
      setSurnameError("");
    
    return true;
  }

  const ValidEmail = () =>
  {
    if(email.trim() === "" || email.charAt(0) == " ")
    {
      setEmailError("*This field cannot be empty");
      return false;
    }
    else if((email.length <= 2))
    {
      setEmailError("*The allowed number of characters in this field");
      return false;
    }
    else if(!email.includes("@"))
    {
      setEmailError("*string does not contain mail index (@)");
      return false;
    }
    else
      setEmailError("");
    
    return true;
  }

  const ValidLogin = () =>
  {
    if(login.trim() === "" || login.charAt(0) == " ")
    {
      setLoginError("*This field cannot be empty");
      return false;
    }
    else if(login.length <= 1 || surname.length > 38)
    {
      setLoginError("*The allowed number of characters in this field is from 2 to 37");
      return false;
    }
    else if(!/^[a-zA-Z0-9]+$/.test(login))
    {
      setLoginError("*Only characters are allowed in this field.");
      return false;
    }
    else
      setLoginError("");
    
    return true;
  }

  const ValidPass = () =>
  {
    if(password.trim() === "" || password.charAt(0) == " ")
    {
      setPasswordError("*This field cannot be empty");
      return false;
    }
    else if(password.length <= 8 || password.length > 38)
    {
      setPasswordError("*The allowed number of characters in this field is from 8 to 37");
      return false;
    }
    else if(!/^[a-zA-Z0-9]+$/.test(login))
    {
      setPasswordError("*This field must contain only numbers and letters");
      return false;
    }
    else
      setPasswordError("");
    
    return true;
  }
  //================================================================================================
  //================================================================================================

  // Password hashing.
  //================================================================================================
  const hashPassword = (user_pass: string) => 
  {
    return new Promise<string>((resolve, reject) => 
    {
      bcrypt.genSalt(10, function(err: any, salt: any)
       {
        bcrypt.hash(user_pass, salt, function(err: any, hash: any)
         {
          if (err) 
          {
            console.error(err);
            reject(err);
          } 
          else
            resolve(hash);
        });
      });
    });
  };

  const unhashPassword = (user_pass: string) => { return bcrypt.compareSync(password, user_pass); }
  //================================================================================================  

  // Teacher code.
  //================================================================================================  
  useEffect(() =>  // Hook for asynchronous checkbox definition.
  {
    if (isTeacher) 
      setCode(generateCode());
    else 
      setCode("null");
  }, [isTeacher, teacher_code]);

  function generateCode() // Code generation function.
  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
  
    for (let i = 0; i < 12; i++) 
      code += characters.charAt(Math.floor(Math.random() * characters.length));
  
    return code;
  }
  //================================================================================================  

  return (
    <>

      {showRegistration ? (
        <div>
          {/* <div className="background">
            <div className="shape"></div>
            <div className="shape"></div> 
          </div> */}
          <form>
            <h3>Registration</h3>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="real name" value={name} onChange={(e) => setName(e.target.value)}/>
            {nameError && <span className="error">{nameError}</span>}
            <label htmlFor="surname">Surname</label>
            <input type="text" placeholder="real surname" value={surname} onChange={(e) => setSurname(e.target.value)}/>
            {surnameError && <span className="error">{surnameError}</span>}
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
            {emailError && <span className="error">{emailError}</span>}
            <label htmlFor="login">Login</label>
            <input type="text" placeholder="login" value={login} onChange={(e) => setLogin(e.target.value)} />
            {loginError && <span className="error">{loginError}</span>}
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {passwordError && <span className="error">{passwordError}</span>}
            <div className="checkbox">
              <input type="checkbox" id="teacher-checkbox" checked={isTeacher} onChange={handleCheckboxChange}/>
              <label htmlFor="teacher-checkbox">Are you a teacher?</label>
            </div>
            <button className="authbtn" onClick={handleRegistrationClick}>Register</button>
          </form>
        </div>
      ) : (
        <div>
          {/* <div className="background">
             <div className="shape"></div>
            <div className="shape"></div> 
          </div> */}
          <form>
            <h3>Sign in to your account</h3>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Login" id="username" value={login} onChange={(e) => setLogin(e.target.value)} />
            {loginError && <span className="error">{loginError}</span>}
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordError && <span className="error">{passwordError}</span>}
            <button className="authbtn" onClick={handleLoginClick}>Log In</button>
            <button className="authbtn" onClick={ShowRegistrationPlateClick}>Registration</button>
          </form>
        </div>

      )}

    </>
  );
}

export default Auth;
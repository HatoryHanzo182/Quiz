import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs'
import style from '../styles/Auth.module.css';

declare module 'bcryptjs';

function Auth()
{
  /*
      * The Auth component is a form of user authentication and registration. 
      * It contains state hooks for managing input field values (e.g., first name, last name, email, username, password, and teacher code) and
      * for displaying validation error messages.
      *
      * The component handles click events on the "Login" and "Register" buttons. When you click on the "Login" button, the component sends
      * a request to the server to check the user's login and password. In case of successful authentication, the user is redirected to the
      * appropriate page. When you click on the "Register" button, the component checks the validity of the registration form fields and sends 
      * the data to the server to create a new user.
      *
      * The component also handles the state change of the "Teacher" checkbox and automatically generates the teacher's code when it is activated.
      * The hashPassword function is used to hash passwords.
      *
      * The IsValidRegistrationPanel, ValidName, ValidSurname, ValidEmail, ValidLogin, and ValidPass functions perform validation of the
      * corresponding fields on the registration form and return a Boolean value based on the result of the validation.
      *
      * The Auth component uses the axios libraries to make HTTP requests to the server and bcrypt to hash passwords.
      *
      * The overall purpose of the Auth component is to provide secure authentication and registration of users to a web application.
  */

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
  
  const [showSignUp, setShowSignUp] = useState(false);
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
        setCode('null');
        setIsChecked(false);
        setShowSignUp(false);
        
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
    {/*User login and registration page content.*/}
    <body className={style.body}>
      <div className={style.main}>
        <input type="checkbox" id={style.chk} checked={showSignUp} onChange={() => setShowSignUp(!showSignUp)} aria-hidden="true"/>
        {/* Sign in */}
        <div className={style.login}>
          <form>
            <label className={style.label} htmlFor={style.chk} aria-hidden="true">Sign in</label>
            <input className={style.inputA} type="login" name="login1" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} required />
            {loginError && <span className={style.error}>{loginError}</span>}
            <input id="pswdi1" className={style.inputA} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {passwordError && <span className={style.error}>{passwordError}</span>}
            <button className={style.buttonA} onClick={handleLoginClick}>Sign in</button>
            <div className={style.additionalText}>
              <p>
                Ready to test your programming skills? Take our challenging quiz and assess your knowledge in various programming languages, 
                algorithms, and coding concepts. Earn a score based on your performance and unlock new levels as you progress. You can even 
                share your results with your mentor to showcase your progress and get valuable feedback. Join now and become a coding champion!
              </p>
            </div>
          </form>
        </div>
        {/* Sign up */}
        <div className={style.signup}>
          <form>
            <label className={style.label} htmlFor={style.chk} aria-hidden="true">Sign up</label>
            <input className={style.inputA} type="text" name="txt" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            {nameError && <span className={style.error}>{nameError}</span>}
            <input className={style.inputA} type="text" name="txt" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
            {surnameError && <span className={style.error}>{surnameError}</span>}
            <input className={style.inputA} type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {emailError && <span className={style.error}>{emailError}</span>}
            <input className={style.inputA} type="login" name="login2" placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} required />
            {loginError && <span className={style.error}>{loginError}</span>}
            <input id="pswdi2" className={style.inputA} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {passwordError && <span className={style.error}>{passwordError}</span>}
            <div className={style.checkbox}>
              <input className={style.checkboxInput} type="checkbox" id="teacherCheckbox" checked={isTeacher} onChange={handleCheckboxChange}/>
              <label htmlFor="teacherCheckbox" className={style.checkboxLabel}>
                <span className={style.checkboxCustom}></span>
                <span className={style.checkboxText}>Are you a teacher?</span>
              </label>
            </div>
            <button className={style.buttonA} onClick={handleRegistrationClick}>Sign up</button>
          </form>
        </div>
      </div>
    </body>
  </>);
}

export default Auth;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscAccount,VscHome } from "react-icons/vsc";
import User from "../modules/UserDataModel";
import user from '../img/user.png';
import '../styles/Profile.css';
import '../styles/bg.css';

function Profile() 
{
  const [userData, setUserData] = useState<User>();  // Hook to get user data. 

  useEffect(() =>  // The hook runs after the page is loaded.
  {
    const ariownUserData = async () =>  // Get user data from browser local storage.
    {
      const storedUserData = sessionStorage.getItem('userData');
    
      if (storedUserData) 
        setUserData(JSON.parse(storedUserData));
    }

    ariownUserData();
  }, []);

  const navigate = useNavigate();
  const handleExitClick = (event: React.MouseEvent<HTMLAnchorElement>) => 
  {
    event.preventDefault();
    sessionStorage.removeItem('userData');
    window.history.replaceState(null, '', '/');

    navigate('/');
  };

  const handleHomeClick = (event:any) => 
  {
    event.preventDefault();

    if(userData?.teacher_code === 'null')
      navigate(`/Menu`);
    else
      navigate(`/TeacherMenu`);
  };

  return (
  <>
   <div className="navbar">
      <a className='home' href='.' onClick={(event) => handleHomeClick(event)}><VscHome size={25}></VscHome></a>
    </div>
    <div className="main">
      <div className="card-wrapper">
        <div className="card-header">
          <div className="pic"><img src={user} alt='user'></img></div>
          <h3 className='name'>{userData?.name} {userData?.surname}</h3>
          <h3 className="name">{userData?.login}</h3>
          <h3 className="name">{userData?.email}</h3>
        </div>
        <a href="." className='aExit' onClick = {handleExitClick}>
      <span>Exit</span>
      <div className="liquid"></div>
    </a>

      </div>
    </div>
  </>)
}

export default Profile
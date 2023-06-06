import { useState, useEffect } from 'react';
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

  return (
  <>
    <div className="main">
      <div className="card-wrapper">
        <div className="card-header">
          <div className="pic"><img src={user}></img></div>
          <h3 className='name'>{userData?.name} {userData?.surname}</h3>
          <h3 className="name">{userData?.login}</h3>
          <h3 className="name">{userData?.email}</h3>
        </div>
      </div>
    </div>
  </>)
}

export default Profile
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscHome } from "react-icons/vsc";
import User from "../modules/UserDataModel";
import user from '../img/user.png';
import style from '../styles/Profile.module.css';

function Profile() 
{
  /*
      * The Profile component displays user profile information and provides navigation and logout functionality.
      *
      * The handleExitClick function removes the user data from the session storage, clears the browsing history,
      * and navigates the user back to the home page ("/").
      *
      * The handleHomeClick function is triggered when the home link is clicked. It navigates the user to the
      * appropriate menu page based on the user type.
      *
      * The component renders the user profile content, including the home link, profile panel, and an exit button.
      * The profile panel displays the user's profile picture, name, login, and email.
 */

  const [userData, setUserData] = useState<User>();  // Hook to get user data. 
  const navigate = useNavigate();

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
    {/*Profile content*/}
    <div className={style.navbar}>  {/*Home.*/}
      <a className={style.home} href='.' onClick={(event) => handleHomeClick(event)}><VscHome size={25}></VscHome></a>
    </div>
    {/*profile panel.*/}
    <div className={style["main-profil"]}>
      <div className={style["card-wrapper"]}>
        <div className={style["card-header"]}>
          <div className={style.pic}><img src={user} alt='user'></img></div>
          <h3 className={style.name}>{userData?.name} {userData?.surname}</h3>
          <h3 className={style.name}>{userData?.login}</h3>
          <h3 className={style.name}>{userData?.email}</h3>
        </div>
        {/*Exit button.*/}
        <a href="." className={style.aExit} onClick={handleExitClick}>
          <span>Exit</span>
          <div className={style.liquid}></div>
        </a>
      </div>
    </div>
  </>)
}

export default Profile
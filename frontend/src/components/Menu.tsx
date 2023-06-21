import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import User  from '../modules/UserDataModel';
import style from  '../styles/Menu.module.css';

function Menu() 
{
  /*
      * This code represents the Menu component that displays the quizzes.
      *
      * The handleQuizClick and handleProfileClick functions are defined to handle events when links within a component are clicked.
      * They call the navigate function to change the current route and navigate to another page.
      * 
      * The returned JSX code displays a navigation bar (div.navbar) with a link to the user's profile, 
      * as well as a list of courses or quizzes. Each list item (div.ag-courses_item) contains a link (a.ag-courses-item_link) that,
      *  when clicked, calls the corresponding handleQuizClick function with the id of the quiz as an argument.
  */

  const [userData, setUserData] = useState<User>();  // Hook to get user data.
  const navigate = useNavigate();

  useEffect(() =>  // Hook for processing data when the page is fully loaded.
  {
      const ariownUserData = async () =>  // Get teacher data from browser local storage.
      {
          const storedUserData = sessionStorage.getItem('userData');
          
          if (storedUserData) 
              setUserData(JSON.parse(storedUserData));
          else
              navigate('/')
      }

      ariownUserData();
  }, []);

  const handleQuizClick = (quiz_id: string) => { navigate(`/Menu/Quiz/${quiz_id}`); };  // Quiz transition event.
  
  const handleProfileClick = (event: any) =>  // Profile transition event. 
  {
    event.preventDefault(); 

    navigate(`/Menu/Profile`);
  };

  return (
  <>
    {/*Menu content with quizzes.*/}
    <div className={style.navbar}>  {/*Profile.*/}
      <a className={style.profile} href="." onClick={(event) => handleProfileClick(event)}><VscAccount size={25}></VscAccount></a>
    </div>
    {/*List of quizzes.*/}
    <div className={style["ag-format-container"]}>
      <div className={style["ag-courses_box"]}>
        <div className={style["ag-courses_item"]}>
          <a className={style["ag-courses-item_link"]} onClick={() => handleQuizClick("64775e84880214b8b0d307ad")}>
            <div className={style["ag-courses-item_bg"]}></div>
            <div className={style["ag-courses-item_title"]}>Quiz C++</div>
          </a>
        </div>
        <div className={style["ag-courses_item"]}>
          <a className={style["ag-courses-item_link"]} onClick={() => handleQuizClick("6479134a880214b8b0757a03")}>
            <div className={style["ag-courses-item_bg"]}></div>
            <div className={style["ag-courses-item_title"]}>Quiz HTML</div>
          </a>
        </div>
        <div className={style["ag-courses_item"]}>
          <a className={style["ag-courses-item_link"]} onClick={() => handleQuizClick("6479117c880214b8b073b080")}>
            <div className={style["ag-courses-item_bg"]}></div>
            <div className={style["ag-courses-item_title"]}>Quiz CSS</div>
          </a>
        </div>
        <div className={style["ag-courses_item"]}>
          <a className={style["ag-courses-item_link"]} onClick={() => handleQuizClick("648641ae880214b8b026a1e6")}>
            <div className={style["ag-courses-item_bg"]}></div>
            <div className={style["ag-courses-item_title"]}>Quiz JavaScript</div>
          </a>
        </div>
        <div className={style["ag-courses_item"]}>
          <a className={style["ag-courses-item_link"]} onClick={() => handleQuizClick("647f6c67880214b8b03c837a")}>
            <div className={style["ag-courses-item_bg"]}></div>
            <div className={style["ag-courses-item_title"]}>Quiz TypeScript</div>
          </a>
        </div>
        <div className={style["ag-courses_item"]}>
          <a className={style["ag-courses-item_link"]} onClick={() => handleQuizClick("647f6786880214b8b037ea05")}>
            <div className={style["ag-courses-item_bg"]}></div>
            <div className={style["ag-courses-item_title"]}>Quiz Python</div>
          </a>
        </div>
        <div className={style["ag-courses_item"]}>
          <a className={style["ag-courses-item_link"]} onClick={() => handleQuizClick("647f6234880214b8b032f7ed")}>
            <div className={style["ag-courses-item_bg"]}></div>
            <div className={style["ag-courses-item_title"]}>Quiz SQL</div>
          </a>
        </div>
      </div>
    </div>
  </>);
}

export default Menu;
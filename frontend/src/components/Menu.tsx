import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscAccount,VscHome } from "react-icons/vsc";
import User  from '../modules/UserDataModel';
import '../styles/Menu.css';
import '../styles/bg.css'

function Menu() 
{
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
  });

  const handleQuizClick = (quiz_id: string) => { navigate(`/Menu/Quiz/${quiz_id}`); };  // Quiz transition event.
  const handleProfileClick = (event: any) =>  // Profile transition event. 
  {
    event.preventDefault(); 

    navigate(`/Menu/Profile`);
  };

  return (
  <>

    <div className="navbar">
      <a className='profile' href='.' onClick={(event) => handleProfileClick(event)}><VscAccount size={25}></VscAccount></a>
    </div>
    <div className="ag-format-container">
      <div className="ag-courses_box">
        <div className="ag-courses_item">
          <a className="ag-courses-item_link" onClick={() => handleQuizClick("64775e84880214b8b0d307ad")}>
            <div className="ag-courses-item_bg"></div>
            <div className="ag-courses-item_title">Quiz C++</div>
          </a>
        </div>
    <div className="ag-courses_item">
      <a  className="ag-courses-item_link" onClick={()=> handleQuizClick("6479134a880214b8b0757a03")}>
        <div className="ag-courses-item_bg"></div>
        <div className="ag-courses-item_title">Quiz HTML</div>
      </a>
    </div>
    <div className="ag-courses_item">
      <a className="ag-courses-item_link"  onClick={()=> handleQuizClick("6479117c880214b8b073b080")}>
        <div className="ag-courses-item_bg"></div>
        <div className="ag-courses-item_title">Quiz CSS</div>
      </a>
    </div>
    <div className="ag-courses_item">
      <a  className="ag-courses-item_link" onClick={()=> handleQuizClick("648641ae880214b8b026a1e6")}>
        <div className="ag-courses-item_bg"></div>
        <div className="ag-courses-item_title">Quiz JavaScript</div>
      </a>
    </div>
    <div className="ag-courses_item">
    <a className="ag-courses-item_link"  onClick={()=> handleQuizClick("647f6c67880214b8b03c837a")}>
        <div className="ag-courses-item_bg"></div>
        <div className="ag-courses-item_title">Quiz TypeScript</div>
      </a>
    </div>
    <div className="ag-courses_item">
    <a className="ag-courses-item_link"  onClick={()=> handleQuizClick("647f6786880214b8b037ea05")}>
        <div className="ag-courses-item_bg"></div>
        <div className="ag-courses-item_title">Quiz Python</div>
      </a>
    </div>
    <div className="ag-courses_item">
    <a className="ag-courses-item_link"  onClick={()=> handleQuizClick("647f6234880214b8b032f7ed")}>
        <div className="ag-courses-item_bg"></div>
        <div className="ag-courses-item_title">Quiz SQL</div>
      </a>
    </div>
    </div>
    
  </div>
  </>);
}

export default Menu;
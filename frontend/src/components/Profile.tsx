import React from 'react'
import user from '../img/user.png'
import '../styles/Profile.css'
import '../styles/bg.css'

function Profile() {
  return (
<>
<body>
    

<div className="main">
<div className="card-wrapper">
    <div className="card-header">
        <div className="pic">
            <img src={user}></img>
        </div>
        <h3 className='name'>Name Surname</h3>
        <h3 className="name">Login</h3>

        <h3 className="name">test@gmail.com</h3>
    </div>
</div>
</div>
</body>
</>
  )
}

export default Profile
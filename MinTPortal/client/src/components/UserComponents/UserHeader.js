import {React, useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsFillPersonFill } from "react-icons/bs";
import '../../images/assets/css/admin.css';
import logo from '../../images/Logo.jpg';

function UserHeader() {
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  //const {email, role} = location.state;
  //console.log(email);
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(null) ;
  const [userName, setUserName] = useState('')
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // eslint-disable-next-line no-unused-vars
        let response = null;
        // axios.get('https://final-0t4v.onrender.com/check-auth-status')
        // .then(result=> {response = result; console.log(result);})
        // .catch(err=>console.log(err));

        const email1 = document.cookie.split(';')[0].split('=')[1].replaceAll('"','');
        axios.post('https://final-0t4v.onrender.com/getName', {email:email1})
        .then(result=> {response = result; setUserName(result.data.name); console.log(result);})
        .catch(err=>console.log(err));
        //const isAuthenticated = response.data.isAuthenticated;
        // const userName1 = response.data.name
        console.log(userName);
        //console.log(isAuthenticated)
        //setIsAuthenticated(isAuthenticated)
        // setUserName(userName1)

      
      } catch (error) {
        console.error('Error checking authentication status:', error);
        return false;
      }
     }
      
        // Example usage
         checkAuthentication();
      
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []);
  const logout = async () => {
    try {
      await axios.get('https://final-0t4v.onrender.com/logout');
      setIsAuthenticated(false);
      navigate('/login')
      //window.location.href = '/login'; 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div className='header  shadow'>
      <nav className="navbar navbar-expand-xxs ">
        <div className="container-fluid">
          <Link className="navbar-brand " to="/">
          <img src={logo} alt="Logo" style={{ borderRadius: '90%', width: '95px',height:"90px",marginLeft:"55px" }} />
          </Link>
          <div className="d-inline-flex  align-items-center">
            <div className=" me-2" ><BsFillPersonFill  className='login-user-icon'/></div>
            <Link to='/user' onClick={function(e){e.preventDefault(); window.location.reload(false);}} className="me-3 login-user-name">Hi, {userName}</Link>
            <button className="btn btn-warning" style= {{color: 'white', fontWeight:"bold"}} onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>
      
    </div>
  );
}

export default UserHeader;
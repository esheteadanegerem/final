import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar.js';
import '../../images/assets/css/admin.css';

function Admin2() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  let email = "";
  if(!document.cookie){
    navigate('/');
  }
  try{
    email = document.cookie.split(';')[0].split('=')[1].replaceAll('"','');
  }
  catch(err){
    navigate('/');
  }
  //console.log(email);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get('https://final-0t4v.onrender.com/admind3/dashboard') // Update the route path here
      .then((result) => {
        console.log(result)
        if (result.data === 'ok') {
          setMessage('Welcome to the admin dashboard.');
        } else {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log(error);
        navigate('/login'); // Handle errors by redirecting to the login page
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="container mt-5" >
        <div className="row">
        <div
            className="col-xs-12 col-md-3 post-links-container mt-2"
            style={{ overflow: "hidden" }}
          >
          <Sidebar email = {email}/>
          </div>
          <div className="col-xs-12 col-md-2"></div>
          <div className="col-xs-12 col-md-7 mb-5"  style={{ height: "400px" }}>
            <br />
            <h1 style={{color:"orange"}}>MinT General Admin Home</h1>
            <h3>{message}</h3> <br /> <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin2;

import React, { useEffect, useState } from 'react';
import '../style/login.scss';
import {Link} from "react-router-dom";
import logo from '../img/logo192.png';

function LoginPage() {
  let [email,setEmail] = useState("");
  let [password, setPassword] = useState("");
  const updateEmail = (event) => {
    setEmail(event.target.value);
    console.log("email: "+email);
  }
  const updatePassword = (event) => {
    setPassword(event.target.value);
    console.log("password: "+password);
  }
  return (
    <div className="Login-page">
      <div className="Login-elements">
        <div className="Login-logo">
          <img src={logo} alt="nope" />
        </div>
        <div className="Login-input">
          <input type="text" name="email" value={email} onChange={updateEmail} />
          <input type="text" name="password" value={password} onChange={updatePassword} />
          <button>Login</button>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

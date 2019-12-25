import React, { useEffect, useState } from 'react';
import '../style/login.scss';
import {Link} from "react-router-dom";
import logo from '../img/logo192.png';
import {USERS} from '../apicall'
import {LOGIN} from '../apicall'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { tsPropertySignature } from '@babel/types';

function LoginPage(props) {
  
  //reading text box
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

  const httpLink = createHttpLink({
    uri: 'https://classify-graphql-api.herokuapp.com/graphql',
    headers: {
        "Content-Type": "application/json",
    }
  })

  const client = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache()
  })

  const queryData = async () =>{

    if(email.length>0 && password.length>0){
      let data = await client
        .query({
          query: LOGIN,
          variables: {
            "email": email,
            "password": password
          }
        });
      console.log(data);
      props.setProfile(data)
    }else{
      console.log("invalid info...")
    }

  }
  
  return (
    <div className="login-page">

    <div className="login-page-container">
      <div className="wrapper">
        <img src="./logo192.png"></img>
      </div>
      <br></br>
      <br></br>
      <div className="group">      
        <input type="text" value={email} onChange={updateEmail} required></input>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Email</label>
      </div>

      <div className="group">      
        <input type="text" value={password} onChange={updatePassword} required></input>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Password</label>
      </div>

      <div className="wrapper">
        <Link className="fancy-button bg-gradient1" onClick={queryData} to="/match"><span>Login</span></Link>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;

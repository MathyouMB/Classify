import React, { useEffect, useState } from 'react';
import '../style/login.scss';
import {Link, Redirect} from "react-router-dom";
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
  let [redirect, setRedirect] = useState(false);

  const updateEmail = (event) => {
    setEmail(event.target.value);
    console.log("email: "+email);
  }
  const updatePassword = (event) => {
    setPassword(event.target.value);
    console.log("password: "+password);
  }

  useEffect(() => {
    if(props.profile.id != null){
      setRedirect(true);
    }
  })

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
      console.log(data.data.login);
      props.setProfile(data.data.login)
    }else{
      console.log("invalid info...")
    }

  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to = {"/profile?ID="+props.profile.id} />
    }
  }
  
  return (
    <div className="login-page">
    {renderRedirect()}
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
        <input type="password" value={password} onChange={updatePassword}  required></input>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Password</label>
      </div>

      <div className="wrapper">
        <a className="fancy-button bg-gradient1" onClick={queryData}><span>Login</span></a>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;

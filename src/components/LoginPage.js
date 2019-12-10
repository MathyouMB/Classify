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
    <div className="Login-page">
      <div className="Login-elements">
        <div className="Login-logo">
          <img src={logo} alt="nope" />
        </div>
        <div className="Login-input">
          <input type="text" name="email" placeholder="Email" value={email} onChange={updateEmail} />
          <input type="text" name="password" placeholder="Password" value={password} onChange={updatePassword} />
          <input type="input" className="login-button" onClick={queryData} value={"Login"}></input>
          <Link onClick={queryData} to="/match">Sign in</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

import React, { useEffect, useState } from 'react';
import '../style/profile.scss';
import logo from '../img/logo192.png';

import {USER} from '../apicall'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { tsPropertySignature } from '@babel/types';


function ProfilePage(props) {


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

      let ID = 0;
      const queryData = async () =>{
        let data = await client
          .query({
            query: USER,
            variables: {
              "id":ID
            }
          });
        console.log(data);
        props.setProfile(data)
      }
    
  
    return (
      <div onload={queryData} className="profile-Page">
          <div className="profile-Elements">
              <div className="profile-Img">
                <img src={logo} alt="nope" />
              </div>
              <div className="profile-Info">
                <h1>Name</h1>
                <p>School</p>
                <p>List of courses</p>
              </div>
          </div>
      </div>
    );
  }

  export default ProfilePage;

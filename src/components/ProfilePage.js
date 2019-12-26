import React, { useEffect, useState } from 'react';
import '../style/profile.scss';
import logo from '../img/logo192.png';

import {USER} from '../apicall'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { tsPropertySignature } from '@babel/types';

function CourseManager(props) {
  const courses = []
  for (let i = 0; i<props.courses.length;i++) {
      courses.push(
      <Course name={props.courses[i].name} code={props.courses[i].code}/>
      )
  }
    return (
      <>
        {courses}       
      </>
    );
}

function Course(props) {
  return (
    <>
    <span>{props.code}</span>
    </>
  );
}


function ProfilePage(props) {

    let [user,setUser] = useState({});
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        if(loading){
          getProfileData();
        }
    });

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

    const getProfileData = async () =>{

      const urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get('ID');
      let data = await client
        .query({
            query: USER,
            variables: {
                "id": parseInt(id)
              }
        });
      setUser(data.data.user)
      setLoading(false);
      console.log(data.data.user);
    }
    
  
    return (
      <div className="profile-page">
        {loading ? 
          <span>Loading...</span>
          : 
          <div className="profile-page-container">
            <img className="profile-page-user-image" src="./profile.png"></img>
            <span className="profile-page-user-name">{user.firstName} {user.lastName}</span>
            <span className="profile-page-user-name">{user.schools[0].name}</span>
            <p>"{user.biography}"</p>
            <br></br>
            <span>Current Courses</span>
            <CourseManager courses={user.courses}/>
          </div>
        }
          {/*
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
          */}
          
      </div>
    );
  }

  export default ProfilePage;

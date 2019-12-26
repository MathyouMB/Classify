
import React, { useEffect, useState } from 'react';
import '../style/match.scss';
import logo from '../img/logo192.png';
import {Link} from "react-router-dom";
import {FINDCOMMONMATCH} from '../apicall'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { tsPropertySignature } from '@babel/types';
function User(props){
    return(
        <div className="user-banner">
            <img className="user-profile-image" src="./profile.png"></img>
            <div className="user-info">
                <span>{props.user.firstName} {props.user.lastName}</span>
                <span>{props.user.biography}</span>
            </div>
        </div>
        
    )
}

function UserManager(props){
    const users = []
    for (let i = 0; i<props.users.length;i++) {
        users.push(
            <Link to={"/profile?ID="+props.users[i].id}><User key={props.users[i].id} user={props.users[i]}/></Link>
        )
    }
    return (
      <div className="user-manager">
        {users.length < 1 ? <span>No Matches Found.</span>
        :
        users
        }       
      </div>
    );
}

function MatchPage(props) {

    let [users,setUsers] = useState([]);
    let [loading, setLoading] = useState(true);
    let [finalMatch, setFinalMatch] = useState([]);
    
    useEffect(() => {
        if(loading){
            queryData();
        }
    });
 
    const httpLink = createHttpLink({
        uri: 'https://classify-graphql-api.herokuapp.com/graphql',
        headers: {
            "Content-Type": "application/json",
        }
    });
    
    const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache()
    });

    const queryData = async () =>{
        let data = await client
        .query({
            query: FINDCOMMONMATCH,
            variables: {
                "id": props.profile.id
            }
        });
        console.log(data.data.findCommonMatches);
        setUsers(data.data.findCommonMatches)
        setLoading(false);
        //createMatchList(data);
    }

    const createMatchList = (users) => {
        let items = [];
        let matches = users.data.findMatches;

        console.log("matches: ")
        console.log(matches);

        if(Object.keys(props.profile).length > 0){

            console.log("create profile loc:");
            console.log(props.profile.data.login.courses);

            
            let name;
            let same = [];

            for(let i = 0; i < matches.length;i++){
                for(let z = 0; z <  props.profile.data.login.courses.length; z++){   
                    for(let j = 0; j<matches[i].courses.length;j++){
                        if(matches[i].courses[j].id == props.profile.data.login.courses[z].id){
                            name = matches[i].firstName;
                            same.push(matches[i].courses[j]);

                        }
                    }
                }
                items.push(
                    `<div className="match-item"><p>{name}</p><p>matches: {same}</p></div>`
                );
            }

            console.log("final:");
            console.log(items);
            setFinalMatch(items);
            
        }setFinalMatch([]);
    }
    
  
    return (
        <div className="match-page">
            {loading ? "Loading..."
            :
            <UserManager users={users}/>
            }        
        </div>
    );
}

export default MatchPage;

  

import React, { useEffect, useState } from 'react';
import '../style/match.scss';
import logo from '../img/logo192.png';

import {FINDMATCH} from '../apicall'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { tsPropertySignature } from '@babel/types';


function MatchPage(props) {

    let [users,setUsers] = useState([]);
    let [loading, setLoading] = useState(false);
    let [finalMatch, setFinalMatch] = useState([]);
    
    useEffect(() => {
        if(loading == false){
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

    let ID = 4;
    const queryData = async () =>{
        let data = await client
        .query({
            query: FINDMATCH,
            variables: {
                "id":ID
            }
        });
        console.log(data);
        setUsers(data)
        setLoading(true);
        createMatchList(data);
    }

    const createMatchList = (users) => {
        let items = [];
        let matches = users.data.findMatches;

        //console.log("create profile loc:");
        //console.log(props.profile);
        
        console.log("matches: ")
        console.log(matches);

        if(Object.keys(props.profile).length > 0){

           // console.log("here")
            //console.log(props.profile)

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
            <div className="match-elements">
                {finalMatch}
            </div>         
        </div>
    );
}

export default MatchPage;

  
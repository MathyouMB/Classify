import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage'
import cardsPage from './components/cardsPage'
import profilePage from './components/ProfilePage'
import MatchPage from './components/MatchPage'
import './style/App.scss';

function App() {

  let [profile,setProfile] = useState({});

  useEffect(() => {
    console.log("profile");
    console.log(profile)
  })

  return (
    <div className="App">
       <Router>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
            <Route path="/login" component={() => <LoginPage profile={profile} setProfile={setProfile}/>} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/profile?ID=1" component={profilePage} />
            <Route path="/cards" component={cardsPage} />
            <Route path="/match" component={() => <MatchPage  profile={profile}/>} /> 
          </AnimatedSwitch>
       </Router>  
    </div>
  
  );
}

export default App;

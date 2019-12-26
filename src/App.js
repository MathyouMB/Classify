import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faHome,faList, faSearch} from '@fortawesome/free-solid-svg-icons'
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage'
import CardsPage from './components/CardsPage'
import ProfilePage from './components/ProfilePage'
import MatchPage from './components/MatchPage'
import './style/App.scss';

function NavBar(props) {
  const userIcon = <FontAwesomeIcon icon={faUser} />
  const homeIcon = <FontAwesomeIcon icon={faHome} />
  const listIcon = <FontAwesomeIcon icon={faList} />
  const searchIcon = <FontAwesomeIcon icon={faSearch} />
  return (
    <div className="navbar">
        <div className="navbar-button">
            <div className="navbar-icon"><Link to={"profile?ID="+props.profile.id}>{userIcon}</Link></div>
        </div>
        <div className="navbar-button">
            <div className="navbar-icon"><Link to="/cards">{searchIcon}</Link></div>
        </div>
        <div className="navbar-button">
            <div className="navbar-icon"><Link to="/matches">{listIcon}</Link></div>
        </div>
        
    </div>
  );
}


function App() {

  let [profile,setProfile] = useState(false);
  let [redirect, setRedirect] = useState(true);

  useEffect(() => {
    console.log("profile");
    console.log(profile)

    if(profile.id != null){
      setRedirect(false);
    }
  })

  const renderRedirect = () => {
    //shandra@bayer.net
    if (redirect) {
      return <Redirect to = {"/login"} />
    }
  
  }

  return (
    <div className="App">
       <Router>
       {renderRedirect()}
         {/*
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
         */}
            <Route path="/login" component={() => <LoginPage profile={profile} setProfile={setProfile}/>} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/profile" component={() => <ProfilePage profile={profile}/> } />
            <Route path="/cards" component={CardsPage} />
            <Route path="/match" component={() => <MatchPage profile={profile}/>} /> 
         {/*</AnimatedSwitch>*/}
            {profile !== false ? <NavBar profile={profile}/> : ""}
            
       </Router>  
       
    </div>
  
  );
}

export default App;

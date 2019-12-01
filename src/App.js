import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage'
import './style/App.scss';

function App() {
  return (
    <div className="App">
       <Router>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
       </Router>  
    </div>
  );
}

export default App;

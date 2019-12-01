import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import LoginPage from './components/LoginPage';
import './style/App.scss';

function App() {
  return (
    <div className="App">
       <Router>
          <Route path="/" component={LoginPage} />
       </Router>  
    </div>
  );
}

export default App;

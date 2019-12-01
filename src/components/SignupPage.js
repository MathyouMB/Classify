import React, { useEffect, useState } from 'react';
import '../style/signup.scss';

function SignupPage() {

    let [newEmail,setNewEmail] = useState("");
    let [newPassword, setNewPassword] = useState("");
    let [checkPassword, setCheckPassword] = useState("");
    const updateNewEmail = (event) => {
        setNewEmail(event.target.value);
        //console.log("email: "+newEmail);
    }
    const updateNewPassword = (event) => {
        setNewPassword(event.target.value);
        //console.log("new password: "+newPassword);
    }
    const updateCheckPassword = (event) => {
        setCheckPassword(event.target.value);
        //console.log("check password: "+checkPassword);
    }

    return (
      <div className="Signup-page">
        <div className="Signup-elements">
            <div className="Signup-text">
                <h1>Create Account</h1>
            </div>
            <div className="Signup-input">
                <input type="text" name="newEmail" placeholder="New Email" value={newEmail} onChange={updateNewEmail} />
                <input type="text" name="newPassword" placeholder="New Password" value={newPassword} onChange={updateNewPassword} />
                <input type="text" name="checkPassword" placeholder="Confirm Password" value={checkPassword} onChange={updateCheckPassword} />
                <button>Create Account</button>
            </div>
        </div> 
      </div>
    );
  }
  
  export default SignupPage;
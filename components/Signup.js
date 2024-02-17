// Signup.js
import React, { useState } from 'react';
import styles from '../styles/Signup.module.css';

function Signup(props) {
  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    props.handleCloseForm();
  };

  const handleSignUp = () => {
    props.handleRegister(firstname, username, password);
  };

  return (
    <div className={styles.signupForm}>
      <button className={styles.closeForm} onClick={handleClick}>x</button>
      <h3>Create your Hackatweet account</h3>
      <div className={styles.form}>
        <input placeholder="Firstname" type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className={styles.submitSignin} onClick={handleSignUp}>Sign up</button>
    </div>
  );
}

export default Signup;

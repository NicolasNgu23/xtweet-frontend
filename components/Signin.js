// Signin.js
import React, { useState } from 'react';
import styles from '../styles/Signin.module.css';

function Signin(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    props.handleCloseForm();
  };

  const handleSignIn = () => {
    props.handleConnection(username, password);
  };

  return (
    <div className={styles.signupForm}>
      <img className={styles.logo} src='twet.png' alt="" />
      <button className={styles.closeForm} onClick={handleClick}>x</button>
      <h3>Sign In to your Hackatweet account</h3>
      <div className={styles.form}>
        <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className={styles.submitSignin} onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default Signin;

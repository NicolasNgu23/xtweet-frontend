import { useState } from 'react';
import styles from '../styles/Login.module.css';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import { useDispatch} from 'react-redux';
import {login} from '../reducers/user'
import { useRouter } from 'next/router'


function Home() {
  const router = useRouter()
  const dispatch = useDispatch();
  const [loginClick, setLoginClick] = useState(false)
  const [signinClick, setSigninClick] = useState(false)

  const handleLoginClick = (() => { setLoginClick(true) })

  const handleCloseForm = (() => {
    setLoginClick(false),
      setSigninClick(false)
  })

  const handleSigninClick = (() => { setSigninClick(true) })


  const handleRegister = (firstname, username, password) => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, username, password }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ firstname, username }));
          if (data.token) {
            router.push('./homePage')
          }
        }
      });
  };

  const handleConnection = (username, password) => {

    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ username }));
          console.log("Token:", data.token);
          console.log("user", username)
          if (data.token) {
            router.push('./homePage')
          }
        }
      });
  };

  return (

    <div className={styles.page}>
      <main className={styles.main}>
        {loginClick && <Signup handleRegister={handleRegister} handleCloseForm={handleCloseForm} />}
        {signinClick && <Signin handleConnection={handleConnection} handleCloseForm={handleCloseForm} />}
        
        <div className={styles.deco}></div>
       
          <div className={styles.content}>
            <img className={styles.logo} src='twet.png' alt="" />
            <div className={styles.title}>
              <h1>See What's Happening</h1>
            </div>

            <h2>Join Hackatweet today.</h2>

            <button className={styles.signup} onClick={handleLoginClick}>Sign up</button>
            <h3>Already have an account ? </h3>
            <button className={styles.signin} onClick={handleSigninClick}>Signin</button>
          </div>
    


      </main>
    </div>

  );
}

export default Home;

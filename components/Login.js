import { useState } from 'react';
import styles from '../styles/Login.module.css';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import { useDispatch} from 'react-redux';
import {login} from '../reducers/user'
import { useRouter } from 'next/router'

import { TypeAnimation } from 'react-type-animation';

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
    fetch('https://xtweet-backend.vercel.app/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, username, password }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ firstname, username, token: data.token, profilPhoto: data.profilPhoto}));
          if (data.token) {
            router.push('/homePage')
          }
        }
      });
  };

	const handleConnection = (username, password, firstname) => {

    fetch('https://xtweet-backend.vercel.app/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password}),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
          dispatch(login({ username, firstname, token: data.token, profilPhoto: data.profilPhoto}));
          if (data.token) {
            router.push('/homePage')
          }
        }
      });
  };

  return (

    <div className={styles.page}>
      <main className={styles.main}>
        {loginClick && <Signup handleRegister={handleRegister} handleCloseForm={handleCloseForm} />}
        {signinClick && <Signin handleConnection={handleConnection} handleCloseForm={handleCloseForm} />}

        <div className={styles.deco}>
          <div className={styles.welcomeText}  style={{ color:'#0000CD' }}>
            Welcome to :
            <TypeAnimation
              sequence={[
                'Hackatweet ',
                1000,
                'You',
                1000,
                'Everyone',
                1000,
                'The world',
                1000,
              ]}
              wrapper="span"
              speed={1}
              style={{ fontSize: '15rem', display: 'flex', color:'#0000CD' }}
              repeat={Infinity}
              className={styles.movingText}
            />
          </div>

        </div>

        <div className={styles.content}>
            <div className={styles.title}>
            <h1>The good place</h1>
            </div>

            <h2>Join Hackatweet today.</h2>

          <button className={styles.signup} onClick={handleLoginClick}>Sign Up</button>
            <h3>Already have an account ? </h3>
          <button className={styles.signin} onClick={handleSigninClick}>Sign In</button>
        </div>



      </main>
    </div>

  );
}

export default Home;

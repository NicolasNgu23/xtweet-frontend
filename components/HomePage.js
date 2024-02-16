import styles from '../styles/HomePage.module.css';
import { useState, useEffect } from 'react'
import Tweet from './Tweet';
import Hashtag from './Hashtag';

import { useSelector } from "react-redux";

const { topHashtags } = require('../modules/topHashtags')


export default function HomePageComponent() {

    // const deleteOne = () => {
    //     deleteTweet(); 
    // };

    // Récupération des données dna sle redux persistant 
    const user = useSelector((state) => state.user.value);

    // Variables state
    const [tweet, setTweet] = useState('');
    const [tweetData, setTweetData] = useState([]);

    // Compteur du nombre de lettres du tweet
    let countLetters = tweet.length;
    let styleCounter = {};
    if (countLetters > 280) {
        styleCounter = { 'color': 'red' }
    } else {
        styleCounter = { 'color': 'white' }
    }

    // Récupération de tous les tweets
    useEffect(() => {
        fetch(`http://localhost:3000/tweets/allTweet`)
            .then(response => response.json())
            .then(tweets => {
                setTweetData(tweets.tweets)
            });
    }, [tweet]);


    // Envoi d'un nouveau tweet 
    const sendTweet = (content) => {
        if (content.trim() !== "" && content.length <= 280) {
            fetch('http://localhost:3000/tweets/tweet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username : user.username, content }),
            }).then(response => response.json())
                .then(() => { setTweet('') })
        }
    }

    // Découpage des tweets dans le composant 
    let tweets = tweetData.map((data, i) => {
        return <Tweet key={i} {...data} />
    })

    // Récupération des top hashtags 
    const topHash = topHashtags(tweetData)
    let hashtags = topHash.map((data, i) => {
        return <Hashtag key={i} {...data} />
    })

    
    // Composition de la page 
    return (
        <div className={styles.page}>

            <div className={styles.containerLeft}>
                <div className={styles.imageContainer}>
                    <img src='logo.png' className={styles.image}></img>
                </div>
                <div className={styles.profilContainer}>
                    <img src='profil.png' className={styles.profilePic}></img>
                    <div className={styles.nameContainer}>
                        <p>{user.firstname}</p>
                        <p>@{user.username}</p>
                    </div>
                </div>
            </div>

            <div className={styles.containerMiddle}>
                <div className={styles.writeTweet}>
                    <div className={styles.sendTweet}>
                        <input className={styles.tweetInput}
                            type="text"
                            onChange={(e) => setTweet(e.target.value)}
                            value={tweet}
                        />
                        <button className={styles.tweetButton}
                            onClick={() => sendTweet(tweet)}> Send </button>
                    </div>

                    <div style={styleCounter}>
                        {countLetters + '/ 280'}
                    </div>

                </div>
                <div className={styles.tweetsContainer}>
                    {tweets}
                </div>
            </div>

            <div className={styles.containerRight}>
                <div className={styles.nameContainer}>
                    Trends
                </div>
                <div className={styles.hashtagsContainer}>
                    {hashtags}
                </div>
            </div>

        </div>
    );
}


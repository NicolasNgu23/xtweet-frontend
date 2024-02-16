import styles from '../styles/HomePage.module.css';
import { useState, useEffect } from 'react'
import Tweet from './Tweet';
import Hashtag from './Hashtag';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from "react-redux";
const { topHashtags } = require('../modules/topHashtags')


export default function HomePageComponent() {

    const deleteOne = (tweet) => {
        deleteTweet(tweet);
    };

    // Récupération des données dna sle redux persistant 
    const user = useSelector((state) => state.user.value);

    // Variables state
    const [tweet, setTweet] = useState('');
    const [isDelete, setIsDelete] = useState('');
    const [tweetData, setTweetData] = useState([]);
    const [page, setPage] = useState('Tweet');
    const [searchQuery, setSearchQuery] = useState('');



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
                // Filter tweets based on the search query
                const filteredTweets = tweets.tweets.filter(tweet =>
                    tweet.content.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setTweetData(filteredTweets);
            });
    }, [tweet, isDelete, searchQuery]);


    // Envoi d'un nouveau tweet 
    const sendTweet = (content) => {
        if (content.trim() !== "" && content.length <= 280) {
            fetch('http://localhost:3000/tweets/tweet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username, content }),
            }).then(response => response.json())
                .then(() => { setTweet('') })
        }
    }

    // Suppression du tweet
    const deleteTweet = (tweet) => {
        fetch(`http://localhost:3000/tweets/tweets/${tweet._id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then((tweet) => {
                console.log('Tweet deleted', tweet);
                setIsDelete(tweet);
            });

    };

    // Découpage des tweets dans le composant 
    let tweets = tweetData.map((data, i) => {
        return <Tweet key={i} {...data} deleteOne={deleteOne} />
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
                <div className={styles.containerProfil}>

                    <img src='profil.png' className={styles.profilePic}></img>
                    <div className={styles.nameContainer}>

                        <p> Welcome @{user.username}</p>
                    </div>


                </div>

                <div className={styles.containerTrends}>
                    <div className={styles.trendsTitle}>
                        Trends
                    </div>
                    <div className={styles.hashtagsContainer}>
                        {hashtags}
                    </div>
                </div>
            </div>


            <div className={styles.containerMiddle}>

                <div className={styles.pageButtons}>
                    <p className={styles.pageButton}
                        style={page === 'Tweet' ? { 'text-decoration': 'underline' } : { 'text-decoration': '' }}
                        onClick={() => { setPage('Tweet') }}>Tweet</p>
                    <p className={styles.pageButton}
                        style={page === 'Recherche' ? { 'text-decoration': 'underline' } : { 'text-decoration': '' }}
                        onClick={() => { setPage('Recherche') }} >Recherche</p>
                </div>

                <div className={styles.writeTweet}>

                    {page === 'Tweet' ?
                        <div className={styles.inputBar}>
                            <input className={styles.tweetInput}
                                type="text"
                                onChange={(e) => setTweet(e.target.value)}
                                value={tweet}
                                placeholder='Tweeter...'

                            />

                            <button className={styles.tweetButton}
                                onClick={() => sendTweet(tweet)}>
                                <FontAwesomeIcon icon={faCheck} />
                            </button>

                            <div className={styles.sendTweet}>
                                <div style={styleCounter}>
                                    {countLetters + '/ 280'}
                                </div>

                            </div>
                        </div>
                        :
                        <div className={styles.inputBar}>
                            <input className={styles.tweetInput}
                                type="text"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                                placeholder='Rechercher des tweets...'

                            />
                        </div>
                    }




                </div>
                <div className={styles.tweetsContainer}>
                    {tweets}
                </div>
            </div>



        </div>
    );
}


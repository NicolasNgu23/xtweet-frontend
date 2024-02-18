import styles from '../styles/HomePage.module.css';
import { useState, useEffect } from 'react'
import Tweet from './Tweet';
import Hashtag from './Hashtag';
import {logout} from '../reducers/user';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const { topHashtags } = require('../modules/topHashtags')


export default function HomePageComponent() {

    const deleteOne = (tweet) => {
        deleteTweet(tweet);
    };

    const handleUpdate = () => {
        // Mettez à jour l'état local pour déclencher un re-render
        setUpdateTrigger(!updateTrigger);
    };


    // Récupération des données dna sle redux persistant
    const user = useSelector((state) => state.user.value);

    const dispatch = useDispatch();
    const router = useRouter()

    // Variables state
    const [tweet, setTweet] = useState('');
    const [isDelete, setIsDelete] = useState('');
    const [tweetData, setTweetData] = useState([]);
    const [page, setPage] = useState('Tweet');
    const [searchQuery, setSearchQuery] = useState('');

    const [updateTrigger, setUpdateTrigger] = useState(false);


    const handleLogout = () => {
      dispatch(logout());
      router.push('/'); // Navigate to login page
    };

// Rest of the component code

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
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            })
    }, [tweet, isDelete, searchQuery, updateTrigger]);

    // Envoi d'un nouveau tweet
    const sendTweet = (content) => {
        if (content.trim() !== "" && content.length <= 280) {
            fetch('http://localhost:3000/tweets/tweet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: user.token, content }),
            }).then(response => response.json())
                .then(
                    () => {
                        setTweet('')
                    }
                ).catch(error => {
                    console.error('Error during fetch:', error);
                })
        }
    }

    // Suppression du tweet
    const deleteTweet = (tweet) => {
        fetch(`http://localhost:3000/tweets/tweets/${tweet._id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then((tweet) => {
                console.log('Tweet deleted', tweet);
                setIsDelete(tweet);
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            })

    };

    // Découpage des tweets dans le composant
    let tweets = tweetData.map((data, i) => {
        const isLikedByUser = data.likes.some((e) => e.token === user.token);

        return <Tweet
            key={i} {...data}
            deleteOne={deleteOne}
            updateHomePage={handleUpdate}
            isLiked={isLikedByUser}  // Nouvelle propriété isLiked
        />
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

                    <img src={user.profilPhoto} className={styles.profilePic}></img>
                    <div className={styles.nameContainer}>
                        <p> Welcome @{user.username}</p>
                        <button className={styles.logoutbtn} onClick={handleLogout}>Logout</button>
                    </div>
                </div>

                <div className={styles.containerTrends}>
                    <div className={styles.hashtagsContainer}>
                        <span className={styles.trendsTitle}>Trends</span>
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
                {/* {selectedTweets && selectedtweet} */}
                    {tweets}
                </div>
            </div>



        </div>
    );
}

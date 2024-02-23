import React from 'react';
import styles from '../styles/Tweet.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

const { changeDate } = require('../modules/changeDate');

export default function Tweet(props) {

    const [like, setLike] = useState(props.isLiked);

    const handleClick = () => {
        props.deleteOne(props);
    };

    // Récupération des données dans le redux persistant
    const user = useSelector((state) => state.user.value);

    const styleHeart = props.likes.some((e) => e === user.username) ? { 'color': 'red' } : { 'color': 'white' }

    useEffect(() => {
        const tweetLiked = props.likes.some((e) => e === user.username);
        setLike(tweetLiked);
    }, [props.likes, user._id]);


    const handleLike = () => {

        const isLikedByUser = props.likes.some((e) => e === user.username);

        const endpoint = isLikedByUser ? 'dislike' : 'like';

        fetch(`https://xtweet-backend.vercel.app/tweets/${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, tweetId: props._id }),
        })
            .then(response => response.json())
            .then(data => {
                props.updateHomePage(); // Appel de la fonction de mise à jour dans le composant HomePage
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            })
    };


    return (
        <div className={styles.tweetContainer}>

            <div className={styles.tweetTextContainer}>
                <div className={styles.profilContainer}>
                    <img src={props.user && props.user.profilPhoto} className={styles.profilePic} />
                    <span className={styles.tweetTop}>@{props.user.username} </span>
                </div>

                <div className={styles.tweetContent}>
                    <ColoredHashtags text={props.content} />
                </div>


                <div className={styles.infos}>

                    <div className={styles.iconeLike}>
                        <FontAwesomeIcon icon={faHeart} style={styleHeart} onClick={() => handleLike()} />
                        {props.likes.length}
                        <span>
                            {props.likes.length < 3
                                ? props.likes.map((nom) => `@${nom}`).join(', ')
                                : `${props.likes.slice(0, 2).map((nom) => `@${nom}`).join(', ')} ...`}
                        </span>                    </div>

                    <div className={styles.iconeDroite}>

                        <div className={styles.date}>
                            {changeDate(props.date)}
                        </div>
                        {user.username === props.user.username ? <FontAwesomeIcon icon={faTrash} onClick={() => handleClick(props)} /> : ''}

                    </div>

                </div>

            </div>


        </div>
    );
}


const ColoredHashtags = ({ text }) => {
    const words = text.split(/\s+/);

    const styledText = words.map((word, i) => {
        if (word.startsWith('#')) {
            // Si le mot commence par '#', appliquer le style bleu
            return (
                <span key={i} style={{ 'color': '#10325e' }}>{word + ' '}</span>
            );
        } else {
            return <span key={i}>{word} </span>;
        }
    });

    return <div>{styledText}</div>;
};

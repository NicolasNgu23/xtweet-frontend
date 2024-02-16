import React from 'react';
import styles from '../styles/Tweet.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

const { changeDate } = require('../modules/changeDate');

export default function Tweet(props) {

    const handleClick = () => {
        // props.deleteTweet(props);
    };

    // Récupération des données dna sle redux persistant 
    const user = useSelector((state) => state.user.value);

    const deleteTweet = (tweet) => {
        fetch(`http://localhost:3000/tweets/tweets/${tweet._id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(tweets => {
                console.log(tweets);
            });
    };


    return (
        <div className={styles.tweetContainer}>
            <div className={styles.tweetContent}>
                <ColoredHashtags text={props.content} />
            </div>

            <div className={styles.infos}>
                <div className={styles.icones}>
                    <FontAwesomeIcon icon={faHeart} />
                    {props.likes}
                    {user.username === props.user.username ? <FontAwesomeIcon icon={faTrash} onClick={() => handleClick()} /> : ''}
                </div>
                <div className={styles.date}>
                    @{props.user.username} {props.user.firstname} {changeDate(props.date)}
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
                <span key={i} style={{ color: 'blue' }}>{word + ' '}</span>
            );
        } else {
            return <span key={i}>{word} </span>;
        }
    });

    return <div>{styledText}</div>;
};

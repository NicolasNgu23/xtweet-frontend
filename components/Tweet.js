import styles from '../styles/Tweet.module.css';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

const { changeDate } = require('../modules/changeDate')

export default function Tweet(props) {

    const deleteTweet = (tweet) => {
        fetch(`http://localhost:3000/tweets/tweets/${tweet._id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(tweets => {
                console.log(tweets)
            });
    }

    const dateFormatted = changeDate(props.date)

    return (

        <div className={styles.tweetContainer}>
           
            <div className={styles.tweetContent}>
                {props.content}

            </div>

            <div className={styles.infos}>
                <div className={styles.icones}>
                    <FontAwesomeIcon icon={faHeart} />
                    {props.likes}
                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteTweet(props)} />
                </div>
                <div className={styles.date}>
                    @{props.user.username}  {props.user.firstname} {dateFormatted}
                </div>
            </div>
         



        </div>

    )

}
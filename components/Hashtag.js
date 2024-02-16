import styles from '../styles/Hashtags.module.css';
import { useState } from 'react' 
 

export default function Hashtag(props) {
 
    return (
        <div className={styles.hashtagContainer}>
            <div className={styles.hashtag}>
                {props.hashtag}
            </div>
            <div className={styles.numberHashtag}>
                {props.nbOccurence + ' Tweet(s)'} 
            </div>
           
        </div>

    )

}
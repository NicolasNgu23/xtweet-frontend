import styles from '../styles/Hashtags.module.css';



export default function Hashtag(props) {


  // const selectHashtag = () => {
  //   props.selectTweet(props.hashtag);
  // };

    return (
        <div className={styles.hashtagContainer}>
            <div className={styles.hashtag} /*onClick={selectHashtag}*/ >
                {props.hashtag}
            </div>
            <div className={styles.numberHashtag}>
                {props.nbOccurence + ' Tweet(s)'}
            </div>

        </div>

    )

}

import React, { useState, useEffect } from "react";
import { database } from "fbase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
  const TWEET_STRING = "tweet";
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const onChange = (e) => setTweet(e.target.value);
  const writeData = async () => {
    try {
      const docRef = await addDoc(collection(database, TWEET_STRING), {
        text: tweet,
        craeteAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log("데이터 쓰기 성공 id: ", docRef.id);
      setTweet("");
    } catch (e) {
      console.error("데이터 쓰기 실패 error: ", e);
    }
  };
  const getTweets = async () => {
    const querySnapshot = await getDocs(collection(database, TWEET_STRING));
    let newTweets = [];
    querySnapshot.forEach((docu) => {
      const tweetObj = {
        ...docu.data(),
        id: docu.id,
      };
      newTweets = [tweetObj, ...newTweets];
    });
    if (newTweets) {
      setTweets((prev) => [...newTweets, ...prev]);
    }
  };
  const onWatchUpdate = () => {
    onSnapshot(query(collection(database, TWEET_STRING)), (querySnapshot) => {
      const newTeets = [];
      querySnapshot.forEach((docu) => {
        const tweetObj = {
          ...docu.data(),
          id: docu.id,
        };
        newTeets.push(tweetObj);
      });
      setTweets(newTeets);
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (tweet) {
      writeData();
    }
  };
  const onUpdate = async (e) => {
    console.log("check")
    const {
      target: { id: docId, value: newText },
    } = e;
    console.log(docId, newText);
    // const targetDocument = doc(database, TWEET_STRING, docId);
    // await updateDoc(targetDocument, {text: newText});
  };
  // getTweets(); old 방식
  useEffect(onWatchUpdate, []);
  console.log(tweets);
  return (
    <div id="home">
      <form>
        <input
          type="text"
          placeholder="Enter tweet"
          value={tweet}
          onChange={onChange}
        />
        <input type="submit" value="tweet" onClick={onSubmit} />
      </form>
      <div>
        {tweets.map((tweetObj) => (
          <Tweet
            key={tweetObj.id}
            tweetObj={tweetObj}
            isOwener={tweetObj.creatorId === userObj.uid}
            TWEET_STRING={TWEET_STRING}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;

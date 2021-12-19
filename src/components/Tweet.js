import React, { useState } from "react";
import { database } from "fbase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const Tweet = ({ tweetObj, isOwener, TWEET_STRING }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onChange = (e) => {
    setNewTweet(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    onUpdate();
  }
  const onUpdate = async () => {
    const targetDocument = doc(database, TWEET_STRING, tweetObj.id);
    await updateDoc(targetDocument, { text: newTweet });
    setEditing(false);
  };
  const onDelete = async () => {
    const ok = window.confirm("realy?");
    if (ok) {
      await deleteDoc(doc(database, TWEET_STRING, tweetObj.id));
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
    setNewTweet(tweetObj.text)
  }
  // tweetObj.id 도큐먼트 값
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Enter Tweet!"
              value={newTweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Tweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwener && (
            <>
              <button onClick={onDelete}>Delete</button>
              <button onClick={toggleEditing}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;

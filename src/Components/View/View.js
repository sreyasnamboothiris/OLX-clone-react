import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails, setPostDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  console.log(firebase)
  useEffect(() => {
    console.log(postDetails);
    
    if (postDetails && postDetails.userId) {
      const { userId } = postDetails;
      console.log(postDetails,postDetails.userId);
      firebase.firestore().collection('user')
        .where('id', '==', userId)
        .get()
        .then((response) => {
          response.forEach((doc) => {
            setUserDetails(doc.data());
          });
        })
        .catch((error) => {
          console.error("Error fetching user details: ", error);
        });
    }
  }, [firebase, postDetails]);

  useEffect(() => {
    const storedPostDetails = localStorage.getItem('postDetails');
    if (storedPostDetails) {
      setPostDetails(JSON.parse(storedPostDetails));
    }
    
    return () => {
      localStorage.removeItem('postDetails');
    };
  }, [setPostDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        {postDetails && (
          <img src={postDetails.url} alt="Product" />
        )}
      </div>
      <div className="rightSection">
        {postDetails && (
          <div className="productDetails">
            <p>&#x20B9; {postDetails.price} </p>
            <span>{postDetails.name}</span>
            <p>{postDetails.category}</p>
            <span>{postDetails.createdAt}</span>
          </div>
        )}
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;

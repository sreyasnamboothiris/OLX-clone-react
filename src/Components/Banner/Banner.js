import React, { useContext, useEffect, useState } from 'react';

import './Banner.css';
import Arrow from '../../assets/Arrow';
import { FirebaseContext } from '../../store/Context';
function Banner() {


  const {firebase} = useContext(FirebaseContext);
  const [category,setCategory] = useState([]);
  const [product,productSet] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await firebase.firestore().collection('products').get();
        const data = res.docs.map((doc) => doc.data());
        productSet(data);

        const categoryList = data.map((obj) => obj.category);
        setCategory([...new Set(categoryList)]);
      } catch (error) {
        console.error('error fething products: ',error);
      }
    };

    fetchProducts();
  }, [firebase]);
  


  return (

    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          <div className="otherQuickOptions">
            {category.map((cat, index) => (
              <span key={index}>{cat}</span>
            ))}
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div>
      
    </div>
  );
}

export default Banner;

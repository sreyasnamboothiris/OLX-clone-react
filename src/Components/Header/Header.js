import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
function Header() {
  const history = useNavigate();

  const {user} = useContext(AuthContext)
  const{firebase} = useContext(FirebaseContext)
  const {sample,setSample} = useContext(AuthContext);
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> {sample} </span>
          <Arrow></Arrow>
        </div>
        
        <div className="loginPage">
          
          <span>{user?`welcome ${user.displayName}`:<Link to='/login'>
            <span>Login</span>

          </Link>}</span>
          <hr />
          
        </div>
        { user && <span style={{cursor:'pointer'}} onClick={()=>{
          firebase.auth().signOut();
          history('/login')
        }}>Logout</span> }
        <Link to='/create'>
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        </Link>
        
      </div>
    </div>
  );
}

export default Header;

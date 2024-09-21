import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {

  // Use useNavigate instead of useHistory
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    if(username.trim() && phone.trim() && password.trim()){
      e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      result.user.updateProfile({ displayName: username })
      .then(() => {
        firebase.firestore().collection('user').add({
          id: result.user.uid,
          username: username,
          phone: phone
        });
      }).then(() => {
        
        navigate('/login');
      });
    }).catch(error=>{
      alert(error)
    });
    } else{
      alert('invalid form')
    }
    
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

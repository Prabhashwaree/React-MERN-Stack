import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';

import singinBackground from '../asset/sign in backgroud img.png';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('User updated successfully');
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
    }
  };

  return (
    <div className="container small-container" 
    style={{backgroundColor:"transparent",position:"relative",margin:"auto",textAlign:"center"}}>
      
      <img src={singinBackground} style={{position:"absolute",height:"88vh"}}/>
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3" 
      style={{position:"relative",top:"38px",color:"gray"}}>User Profile</h1>
      
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name" 
        style={{width:"60%" ,position:"relative",margin:"auto",textAlign:"center",top:"22px"}} >
          <Form.Label style={{position:"relative",right:"61%",top:"38px"}}><b>Name :</b></Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name" 
        style={{width:"60%" ,position:"relative",margin:"auto",textAlign:"center",top:"12px"}}>
          <Form.Label style={{position:"relative",right:"61%",top:"38px"}}><b>Email :</b></Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password" 
        style={{width:"60%" ,position:"relative",margin:"auto",textAlign:"center",bottom:"1px"}}>
          <Form.Label style={{position:"relative",right:"65%",top:"38px"}}><b>Password :</b></Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password" 
        style={{width:"60%" ,position:"relative",margin:"auto",textAlign:"center",bottom:"15px"}}>
          <Form.Label style={{position:"relative",right:"75%",top:"38px"}}><b>Confirm Password :</b></Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" 
          style={{position:"relative",top:"5px",width:"30%",backgroundColor:"green",color:"black"}}>Update</Button>
        </div>
      </form>
    </div>
  );
}

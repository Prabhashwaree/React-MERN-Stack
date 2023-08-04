import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

import singinBackground from '../asset/sign in backgroud img.png';

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container" style={{backgroundColor:"transparent",position:"relative",margin:"auto",textAlign:"center"}}>
      <img src={singinBackground} 
      style={{position:"absolute",height:"88vh"}}/>

      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3" style={{position:"relative",top:"38px",color:"gray"}}>Sign In</h1>
      
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email" style={{width:"60%" ,position:"relative",margin:"auto",textAlign:"center",top:"18px"}}>
          <Form.Label style={{position:"relative",right:"61%",top:"38px"}}><b>Email :</b></Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password" style={{ width:"60%" ,position:"relative",margin:"auto",textAlign:"center"}}>
          <Form.Label style={{position:"relative",right:"65%",top:"38px"}}><b>Password :</b></Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" style={{position:"relative",top:"30px",width:"30%",backgroundColor:"green",color:"black"}}
          ><b>Sign In</b></Button>
        </div>
        <div className="mb-3" style={{position:"relative",top:"35px"}}>
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
        <div className="mb-3" style={{position:"relative",top:"30px"}}>
          Forget Password? <Link to={`/forget-password`}>Reset Password</Link>
        </div>
      </Form>
    </Container>
  );
}

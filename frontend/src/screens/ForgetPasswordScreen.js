import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils';

import singinBackground from '../asset/sign in backgroud img.png';

export default function ForgetPasswordScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/forget-password', {
        email,
      });
      toast.success(data.message);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Container className="small-container" 
    style={{backgroundColor:"transparent",position:"relative",margin:"auto",textAlign:"center"}}>
      
      <img src={singinBackground} 
      style={{position:"absolute",height:"88vh"}}/>

      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <h1 className="my-3" style={{position:"relative",top:"110px",color:"gray"}}
      >Forget Password</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email" 
        style={{width:"60%" ,position:"relative",margin:"auto",textAlign:"center",top:"90px"}}>
         
          <Form.Label style={{position:"relative",right:"61%",top:"38px"}}>
            <b>Email :</b></Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit" style={{position:"relative", top:"98px",width:"30%",backgroundColor:"green",color:"black"}}>submit</Button>
        </div>
      </Form>
    </Container>
  );
}

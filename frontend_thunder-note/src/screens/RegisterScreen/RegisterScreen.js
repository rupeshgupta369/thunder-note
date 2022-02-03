import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../components/MainScreen/MainScreen';

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("https://cdn.pixabay.com/photo/2016/03/31/14/47/avatar-1292817_960_720.png");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(email);
  }

  return (<MainScreen title="REGISTER">
    <div className='loginContainer'>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name"
            value={name}
            placeholder='Enter Name'
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email"
            value={email}
            placeholder='Enter email'
            onChange={(e) => { setEmail(e.target.value) }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="pic">
          <Form.Label>Profile Picture</Form.Label>
          <Form.File
            // onChange={(e) => postDetails(e.target.files[0])}
            id="custom-file"
            type="image/png"
            label="Upload Profile Picture"
            custom
          />
        </Form.Group>


        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account ? <Link to="/login">Login</Link>
        </Col>
      </Row>

    </div>
  </MainScreen>
  )
};

export default RegisterScreen;

import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import MainScreen from '../../components/MainScreen/MainScreen';
import axios from 'axios';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../../actions/userActions";


const RegisterScreen = (history) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("https://cdn.pixabay.com/photo/2016/03/31/14/47/avatar-1292817_960_720.png");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage("Password Do Not Match")
    }
    else {
      dispatch(register(name, email, password, pic));
    }
    /*  if (password !== confirmPassword) {
       setMessage("Passowrd Do Not Match")
     }
     else {
       setMessage(null)
       try {
         const config = {
           headers: {
             "content-type": "application/json",
           }
         };
         setLoading(true);
   
         const { data } = await axios.post("/api/users", { name, pic, email, password }, config)
   
         setLoading(false);
   
         localStorage.setItem("userInfo", JSON.stringify(data));
       } catch (error) {
         setError(error.response.data.message)
       }
     } */
  }
  // console.log(email);


  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image")
    }
    setPicMessage(null)

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      /* It creates a new FormData object. Whenever we want to upload a new file we create a new Form Data */
      const data = new FormData();
      data.append('file', pics)
      data.append('upload_preset', "thundernote")
      data.append('cloud_name', "rupeshgupta")
      fetch("https://api.cloudinary.com/v1_1/rupeshgupta/image/upload",
        {
          method: 'post',
          body: data,

        }).then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className='loginContainer'>
        {/*  {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}*/}
        {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder='Enter Name'
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
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

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
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
            Have an Account ?<Link to="/login">Login</Link>
          </Col>
        </Row>

      </div>
    </MainScreen>
  )
};

export default RegisterScreen;

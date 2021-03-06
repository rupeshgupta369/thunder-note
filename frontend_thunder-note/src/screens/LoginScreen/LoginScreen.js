import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MainScreen from '../../components/MainScreen/MainScreen';
// import axios from 'axios';
import "./LoginScreen.css"
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from "react-redux"
import { login } from '../../actions/userActions';



const LoginScreen = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    // using redux here
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userInfo) {
            history.push("/mynotes")
        }
    }, [history, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(login(email, password))
        // console.log(email, password);

        /* 1. Try to create a variable called config.
        2. If you can't, then just move on.
        3. Otherwise, set the headers key of the config variable to an object with a key of
        "Content-type" and a value of "application / json". */

        // using redux instead of this for state mgmt
        /*   try {
              const config = {
                  headers: {
                      "Content-type": "application/json"
                  }
              }
              setLoading(true);
  
              const { data } = await axios.post(
                  "/api/users/login",
                  { email, password },
                  config
              )
              console.log(data);
              localStorage.setItem("userInfo", JSON.stringify(data));
              setLoading(false)
  
          } catch (error) {
              setError(error.response.data.message)
              setLoading(false)
          } */
    }

    return (
        <MainScreen title="LOGIN">
            <div className='loginContainer'>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email"
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer ? <Link to="/register">Register Here</Link>
                    </Col>
                </Row>

            </div>
        </MainScreen>
    )
};
export default LoginScreen;

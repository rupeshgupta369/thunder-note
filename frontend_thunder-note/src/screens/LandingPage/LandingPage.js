import React, { useEffect } from 'react';
import "./LandingPage.css"
import { Container, Row, Button } from "react-bootstrap"
const LandingPage = ({ history }) => {
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo")

        //     /* Checking if the user is logged in and if they are, it will redirect them to the mynotes page. */
        if (userInfo) {
            history.push("/mynotes")
        }
    }, [history]);

    return <div className='main'>
        <Container>
            <Row>
                <div className='intro-text'>
                    <div>
                        <h1 className='title'>Welcome to Thunder Note</h1>
                        <p className='subtitle'>One place for all your thunder idea & notes!!</p>
                    </div>
                    <div className='buttonContainer'>
                        <a href="/login">
                            <Button size="lg" className='landingButton'>Login</Button>
                        </a>
                        <a href="/register">
                            <Button size="lg" className='landingButton' variant="outline-primary">Signup</Button>
                        </a>
                    </div>
                </div>
            </Row>
        </Container>
    </div>;
};

export default LandingPage;

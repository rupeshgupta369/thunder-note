import React from 'react';
import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, /* `useHistory` is a React hook that gives you a React Router history object. */
useHistory } from 'react-router-dom';

const Header = () => {

    const history = useHistory();
    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link to="/">Thunder Note</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <Form inline="true">
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        </Form>
                    </Nav>
                    <Nav /* className="mr-auto" */>
                        <Nav.Link href="/mynotes">
                            <Link to="/mynotes">My Notes</Link>
                        </Nav.Link>
                        {/* <Nav.Link href="#link">Link</Nav.Link> */}
                        <NavDropdown title="Rupesh Gupta" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                onClick={() => {
                                    localStorage.removeItem("userInfo")
                                    history.push("/")
                                }}> Logout </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default Header;

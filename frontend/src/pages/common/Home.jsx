import React from 'react';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import Image2 from '../../Images/Image2.png'
import { Link } from 'react-router-dom';

import "../../index.css"

function Home() {
    return (
        <>
            {/* Navbar */}
            

<Navbar expand="lg" className="custom-primary-bg">
    <Container>
        <Navbar.Brand href="#home" className="text-white">
            {/* Uncomment and replace with your logo if needed */}
            {/* <img
                src="/path/to/logo.png" // Replace with your logo path
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="Logo"
            /> */}
            <span className="ms-2">Complaint Management</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
                {/* Use Link for routing instead of href */}
                <Nav.Link as={Link} to="/" className="text-white mx-2">Home</Nav.Link>
                <Nav.Link as={Link} to="/about" className="text-white mx-2">About</Nav.Link>
                <Nav.Link as={Link} to="/profile" className="text-white mx-2">Profile</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
                <Button as={Link} to="/signup" variant="outline-light" className="me-2 px-3 py-1">Sign Up</Button>
                <Button as={Link} to="/login" variant="light" className="custom-teal-btn px-3 py-1">Login</Button>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>


            {/* Main Content Section */}
            <Container fluid className="main-content d-flex">
                <Row className="w-100">
                    {/* Left Side with Image */}
                    <Col md={6} className="image-section d-none d-md-block">
                        <img src={Image2} alt="Complaint Management" className="img-fluid" />
                    </Col>

                    {/* Right Side with Text and Button */}
                    <Col md={6} className="text-section d-flex flex-column justify-content-center align-items-start p-5">
                        <h1 className="display-4">Efficient Complaint Management</h1>
                        <p className="lead mt-3">
                            Our platform streamlines the process of handling complaints, providing real-time updates and quick resolutions.
                        </p>
                        <p>Ensure a responsive and supportive environment with our comprehensive complaint tracking and resolution features.</p>
                        <Button variant="primary" className="custom-teal-btn mt-3">Register Complaint</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;
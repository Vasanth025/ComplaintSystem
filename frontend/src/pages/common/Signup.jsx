import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../index.css";

function Signup() {
    const [title, setTitle] = useState("Select User");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        userType: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleTitle = (select) => {
        setTitle(select);
        setUser({ ...user, userType: select });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error message

        if (title === "Select User") {
            setError("Please select a user type");
            return;
        }

        const updatedUser = { ...user, userType: title };
        
        try {
            const res = await axios.post("http://localhost:4000/api/auth/signup", updatedUser);
            const registeredUser = res.data;

            // Save user data to localStorage
            localStorage.setItem("user", JSON.stringify(registeredUser));

            // Redirect based on role
            if (registeredUser.userType === "Admin") {
                navigate("/admin-home");
            } else if (registeredUser.userType === "Agent") {
                navigate("/agent-home");
            } else {
                navigate("/user-home");
            }

            alert("Registration successful!");
        } catch (err) {
            console.error("Signup failed:", err);
            setError("Signup failed. Please try again.");
        }

        // Reset the form after submission
        setUser({
            name: "",
            email: "",
            password: "",
            phone: "",
            userType: ""
        });
        setTitle("Select User");
    };

    return (
        <Container fluid className="signup-page d-flex align-items-center justify-content-center">
            <Row className="form-container p-4">
                <Col>
                    <h2 className="text-center mb-4">Create an Account</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="fullname" className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="phone" className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="userType" className="mb-4">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="userType"
                                value={title}
                                onChange={(e) => handleTitle(e.target.value)}
                            >
                                <option>Select user type</option>
                                <option>Agent</option>
                                <option>Ordinary</option>
                                <option>Admin</option>
                            </Form.Control>
                        </Form.Group>

                        {error && <p className="text-danger">{error}</p>}

                        <Button type="submit" variant="light" className="w-100 custom-teal-btn">
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;

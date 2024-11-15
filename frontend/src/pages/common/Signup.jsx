import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        userType: "Select user type"
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (user.userType === "Select user type") {
            setError("Please select a user type");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/api/auth/signup", user);
            const registeredUser = response.data;

            localStorage.setItem("user", JSON.stringify(registeredUser));

            if (registeredUser.userType === "Admin") {
                navigate("/admin-home");
            } else if (registeredUser.userType === "Agent") {
                navigate("/agent-home");
            } else {
                navigate("/user-home");
            }

            alert("Registration successful!");

            setUser({
                name: "",
                email: "",
                password: "",
                phone: "",
                userType: "Select user type"
            });
        } catch (err) {
            console.error("Signup failed:", err);
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <Container fluid className="login-page d-flex align-items-center justify-content-center">
            <Row className="form-container p-4">
                <Col>
                    <h2 className="text-center mb-4">Create an Account</h2>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                required
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
                                required
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
                                required
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
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="userType" className="mb-4">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="userType"
                                value={user.userType}
                                onChange={handleChange}
                                required
                            >
                                <option disabled>Select user type</option>
                                <option>Agent</option>
                                <option>Ordinary</option>
                                <option>Admin</option>
                            </Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="light" className="w-100 custom-teal-btn">
                            Register
                        </Button>
                    </Form>
                    <p className="text-center mt-3">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;

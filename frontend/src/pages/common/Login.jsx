import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://localhost:4000/api/auth/login", credentials);
            const loggedInUser = response.data;

            localStorage.setItem("user", JSON.stringify(loggedInUser));

            if (loggedInUser.userType === "Admin") {
                navigate("/admin-home");
            } else if (loggedInUser.userType === "Agent") {
                navigate("/agent-home");
            } else {
                navigate("/user-home");
            }

        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password.");
        }
    };

    return (
        <Container fluid className="login-page d-flex align-items-center justify-content-center">
            <Row className="form-container p-4">
                <Col>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={credentials.email}
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
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" variant="light" className="w-100 custom-teal-btn">
                            Login
                        </Button>
                    </Form>
                    <p className="text-center mt-3">
                        Don't have an account? <Link to="/signup">Sign up here</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;

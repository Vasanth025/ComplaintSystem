import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/auth/login", credentials)
            .then((res)=>
            {
                 // Store user data in localStorage
                localStorage.setItem("user", JSON.stringify(res.data));

                // Navigate to the correct page based on userType
                if (res.data.userType === "Admin") {
                    navigate("/admin-home");
                } else if (res.data.userType === "Agent") {
                    navigate("/agent-home");
                } else {
                    navigate("/user-home");
            }
            })
            const userData = response.data;

           
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    // Check for stored user on initial load to prevent redirect to login
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            if (storedUser.userType === "Admin") navigate("/admin-home");
            else if (storedUser.userType === "Agent") navigate("/agent-home");
            else navigate("/user-home");
        }
    }, [navigate]);

    return (
        <Container fluid className="login-page d-flex align-items-center justify-content-center">
            <Row className="form-container p-4">
                <Col>
                    <h2 className="text-center mb-4">Login to Your Account</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
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

                        <Form.Group controlId="password" className="mb-4">
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
                </Col>
            </Row>
        </Container>
    );
}

export default Login;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserData(storedUser);
        } else {
            // Redirect to login if no user data is found
            navigate('/login');
        }
    }, [navigate]);

    return (
        <Container fluid className="py-5" style={{ backgroundColor: '#f4f6f9' }}>
            <Row className="justify-content-center">
                <Col md={6}>
                    {userData ? (
                        <Card className="shadow-sm rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                            <Card.Body>
                                <h2 className="text-center mb-4" style={{ color: '#333' }}>
                                    Profile
                                </h2>
                                <div className="d-flex justify-content-center mb-4">
                                    <div
                                        className="rounded-circle d-flex justify-content-center align-items-center"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            backgroundColor: '#007bff',
                                            color: '#fff',
                                            fontSize: '50px',
                                        }}
                                    >
                                        {userData.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <strong>Name: </strong>
                                    <span>{userData.name}</span>
                                </div>
                                <div className="mb-3">
                                    <strong>Email: </strong>
                                    <span>{userData.email}</span>
                                </div>
                                <div className="mb-3">
                                    <strong>Phone: </strong>
                                    <span>{userData.phone}</span>
                                </div>
                                <div className="mb-3">
                                    <strong>User Type: </strong>
                                    <span>{userData.userType}</span>
                                </div>
                                <div className="text-center mt-4">
                                    {/* <Button
                                        variant="outline-primary"
                                        onClick={() => navigate('/edit-profile')}
                                        style={{
                                            borderRadius: '20px',
                                            padding: '10px 30px',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Edit Profile
                                    </Button> */}
                                </div>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Alert variant="danger" className="text-center">
                            No user data found. Please log in.
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;

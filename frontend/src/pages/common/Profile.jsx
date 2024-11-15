import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserData(storedUser);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <Container
            fluid
            className="d-flex align-items-center justify-content-center"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #a8edea 10%, #fed6e3 100%)',
                padding: '2rem 0',
            }}
        >
            <Row className="justify-content-center w-100">
                <Col md={8} lg={6}>
                    {userData ? (
                        <Card
                            className="shadow-lg border-0"
                            style={{
                                borderRadius: '1.5rem',
                                backgroundColor: '#ffffff',
                                padding: '2rem',
                            }}
                        >
                            <Card.Body>
                                <div className="text-center">
                                    <h2
                                        className="mb-4"
                                        style={{
                                            fontWeight: 'bold',
                                            color: '#333',
                                            letterSpacing: '1px',
                                        }}
                                    >
                                        My Profile
                                    </h2>
                                    <div
                                        className="d-flex justify-content-center align-items-center mb-4"
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                            borderRadius: '50%',
                                            backgroundColor: '#6c63ff',
                                            color: '#fff',
                                            fontSize: '50px',
                                            fontWeight: 'bold',
                                            boxShadow: '0px 4px 15px rgba(108, 99, 255, 0.4)',
                                            margin: '0 auto',
                                        }}
                                    >
                                        {userData.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    <h4
                                        style={{
                                            fontWeight: '700',
                                            color: '#333',
                                            fontSize: '1.5em',
                                        }}
                                    >
                                        {userData.name}
                                    </h4>
                                    <p style={{ fontSize: '1em', color: '#777', marginBottom: '0.5rem' }}>
                                        {userData.userType}
                                    </p>
                                </div>
                                <hr style={{ borderTop: '1px solid #eaeaea' }} />
                                <div className="profile-info mt-4" style={{ fontSize: '1.1em', lineHeight: '1.4' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span style={{ fontWeight: '500', color: '#555' }}>📧 Email:</span>
                                        <span style={{ color: '#333', marginLeft: '1rem' }}>{userData.email}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span style={{ fontWeight: '500', color: '#555' }}>📞 Phone:</span>
                                        <span style={{ color: '#333', marginLeft: '1rem' }}>{userData.phone}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span style={{ fontWeight: '500', color: '#555' }}>👤 User Type:</span>
                                        <span style={{ color: '#333', marginLeft: '1rem' }}>{userData.userType}</span>
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    {/* <Button
                                        variant="primary"
                                        onClick={() => navigate('/edit-profile')}
                                        style={{
                                            borderRadius: '30px',
                                            padding: '0.8rem 2.5rem',
                                            fontSize: '1rem',
                                            fontWeight: '500',
                                            boxShadow: '0px 4px 12px rgba(108, 99, 255, 0.5)',
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

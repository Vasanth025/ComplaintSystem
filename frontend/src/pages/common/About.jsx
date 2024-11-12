import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AboutPage = () => {
    return (
        <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-sm rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                        <Card.Body>
                            <h2 className="text-center mb-4" style={{ color: '#333' }}>
                                About Us
                            </h2>
                            <div className="text-center mb-4">
                                <h3>Welcome to the Complaint Management System</h3>
                                <p className="lead mt-3" style={{ fontSize: '1.1em', color: '#555' }}>
                                    Our platform is designed to provide an efficient and user-friendly experience in managing complaints for both users and administrators.
                                </p>
                            </div>

                            <Row>
                                <Col md={6} className="mb-4">
                                    <Card className="h-100" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                        <Card.Body>
                                            <h4>For Users</h4>
                                            <p className="text-muted" style={{ fontSize: '1em' }}>
                                                As a user, you can easily register complaints, track their status, and get real-time updates. Our platform ensures that your issues are resolved in a timely and efficient manner.
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={6} className="mb-4">
                                    <Card className="h-100" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                        <Card.Body>
                                            <h4>For Admins</h4>
                                            <p className="text-muted" style={{ fontSize: '1em' }}>
                                                Admins have the power to manage all complaints, assign them to agents, and monitor the progress of resolution. They ensure that users receive quick and effective responses.
                                            </p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <div className="text-center mt-5">
                                <h3 className="mb-3" style={{ color: '#007bff' }}>Our Mission</h3>
                                <p className="lead" style={{ fontSize: '1.2em', color: '#555' }}>
                                    We aim to improve customer satisfaction and streamline complaint management, making the process easier and more transparent for both users and administrators.
                                </p>
                                {/* <Button href="/contact" variant="outline-primary" style={{ borderRadius: '20px', padding: '10px 30px' }}>
                                    Contact Us
                                </Button> */}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutPage;

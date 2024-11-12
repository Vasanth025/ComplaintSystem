import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Button } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import ChatWindow from '../common/ChatWindow';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusCompliants, setStatusCompliants] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = user;

    axios.get(`http://localhost:4000/api/comp/user-complaint/${_id}`)
      .then((res) => {
        setStatusCompliants(res.data.complaints || []); // Access complaints array if it exists
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
      ...prevState,
      [complaintId]: !prevState[complaintId],
    }));
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f7fa' }}>
      {statusCompliants.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {statusCompliants.map((complaint, index) => {
            const open = toggle[complaint._id] || false;
            return (
              <Card
                key={index}
                style={{
                  width: '18.5rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  marginBottom: '20px',
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: '#1a73e8', fontWeight: 'bold' }}>
                    Name: {complaint.name}
                  </Card.Title>
                  <Card.Text style={{ color: '#6c757d' }}>
                    Address: {complaint.address}
                  </Card.Text>
                  <Card.Text style={{ color: '#6c757d' }}>
                    City: {complaint.city}
                  </Card.Text>
                  <Card.Text style={{ color: '#6c757d' }}>
                    State: {complaint.state}
                  </Card.Text>
                  <Card.Text style={{ color: '#6c757d' }}>
                    Pincode: {complaint.pincode}
                  </Card.Text>
                  <Card.Text style={{ color: complaint.status === 'Resolved' ? '#28a745' : '#dc3545', fontWeight: '500' }}>
                    Status: {complaint.status}
                  </Card.Text>
                  <Button
                    className='mb-2'
                    style={{
                      float: 'right',
                      backgroundColor: '#1a73e8',
                      border: 'none',
                    }}
                    onClick={() => handleToggle(complaint._id)}
                    aria-controls={`collapse-${complaint._id}`}
                    aria-expanded={open}
                  >
                    Message
                  </Button>
                  <Collapse in={open} dimension="width">
                    <div id={`collapse-${complaint._id}`}>
                      {/* Optional ChatWindow component, if required */}
                      {/* Uncomment and pass the necessary props if needed */}
                      <ChatWindow key={complaint.complaintId} complaintId={complaint._id} name={complaint.name} />
                    </div>
                  </Collapse>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) : (
        <Alert
          variant="info"
          style={{
            backgroundColor: '#eaf4ff',
            color: '#0d6efd',
            textAlign: 'center',
            fontSize: '1.1em',
          }}
        >
          <Alert.Heading>No complaints to show</Alert.Heading>
        </Alert>
      )}
    </div>
  );
};

export default Status;

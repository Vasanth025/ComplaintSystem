import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const Admin = () => {
  const [complaintList, setComplaintList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [assignedComplaintIds, setAssignedComplaintIds] = useState(
    JSON.parse(localStorage.getItem('assignedComplaints')) || [] // Load from localStorage to persist
  );

  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/comp/all-complaints');
        setComplaintList(response.data.complaints);
      } catch (error) {
        console.log(error);
      }
    };
    getComplaints();

    const getAgentsRecords = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/agents');
        setAgentList(response.data.agent);
      } catch (error) {
        console.log(error);
      }
    };
    getAgentsRecords();
  }, []);

  const handleSelection = async (agentId, complaintId, agentName) => {
    try {
      const assignedComplaint = { agentId, complaintId, agentName, status: 'assigned' };
      await axios.post('http://localhost:4000/api/comp/assign-complaint', assignedComplaint);

      // Update the list of assigned complaints
      setAssignedComplaintIds((prevIds) => {
        const updatedIds = [...prevIds, complaintId];
        localStorage.setItem('assignedComplaints', JSON.stringify(updatedIds)); // Save to localStorage
        return updatedIds;
      });

      alert(`Complaint assigned to Agent ${agentName}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Accordion className='accordion' alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="bg-primary text-white">Users Complaints</Accordion.Header>
          <Accordion.Body style={{ background: '#f1f8ff' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}>
              {complaintList.length > 0 ? (
                complaintList.map((complaint, index) => (
                  <Card
                    key={index}
                    style={{
                      width: '15rem',
                      margin: '0 10px 15px 0',
                      backgroundColor: '#ffffff',
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Card.Body style={{ textAlign: 'center' }}>
                      <Card.Title className="text-primary">Name: {complaint.name}</Card.Title>
                      <div style={{ fontSize: '14px', marginTop: '20px' }}>
                        <Card.Text>Address: {complaint.address}</Card.Text>
                        <Card.Text>City: {complaint.city}</Card.Text>
                        <Card.Text>State: {complaint.state}</Card.Text>
                        <Card.Text>Pincode: {complaint.pincode}</Card.Text>
                        <Card.Text>Comment: {complaint.comment}</Card.Text>
                        <Card.Text>Status:
                          <span
                            style={{
                              color: complaint.status === "completed" ? '#28a745' : '#dc3545',
                              fontWeight: 'bold',
                            }}
                          >
                            {complaint.status}
                          </span>
                        </Card.Text>
                      </div>
                      {complaint.status !== "completed" && (
                        <Dropdown className='mt-2'>
                          <Dropdown.Toggle
                            variant={assignedComplaintIds.includes(complaint._id) ? "success" : "warning"}
                            id="dropdown-basic"
                            style={{ borderRadius: '20px' }}
                            disabled={assignedComplaintIds.includes(complaint._id)} // Disable if already assigned
                          >
                            {assignedComplaintIds.includes(complaint._id) ? "Assigned" : "Assign"}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {agentList.map((agent, index) => (
                              <Dropdown.Item
                                key={index}
                                onClick={() => handleSelection(agent._id, complaint._id, agent.name)}
                              >
                                {agent.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info" style={{ backgroundColor: '#eaf4ff', color: '#0d6efd', textAlign: 'center', fontSize: '1.1em' }}>
                  <Alert.Heading>No complaints to show</Alert.Heading>
                </Alert>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header className="bg-primary text-white">Agents</Accordion.Header>
          <Accordion.Body style={{ background: '#f1f8ff' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}>
              {agentList.length > 0 ? (
                agentList.map((agent, index) => (
                  <Card key={index} style={{ width: '22rem', margin: '0 10px 15px 0', backgroundColor: '#ffffff', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <Card.Body>
                      <Card.Title className="text-primary">Name: {agent.name}</Card.Title>
                      <Card.Text>Email: {agent.email}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Alert variant="info" style={{ backgroundColor: '#eaf4ff', color: '#0d6efd', textAlign: 'center', fontSize: '1.1em' }}>
                  <Alert.Heading>No Agents to show</Alert.Heading>
                </Alert>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Admin;

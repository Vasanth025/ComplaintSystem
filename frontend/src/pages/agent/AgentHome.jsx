import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import ChatWindow from '../common/ChatWindow';

const AgentHome = () => {
   const style = {
      marginTop: '66px',
   };

   const navigate = useNavigate();
   const [userName, setUserName] = useState('');
   const [toggle, setToggle] = useState({});
   const [agentComplaintList, setAgentComplaintList] = useState([]);

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { _id, name } = user;
               setUserName(name);
               const response = await axios.get(`http://localhost:4000/api/comp/agent-complaints/${_id}`);
               setAgentComplaintList(response.data.updatedComplaints || response.data);  // Ensure the correct data structure is set
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };

      getData();
   }, [navigate]);

   const handleStatusChange = async (complaintId) => {
      try {
         await axios.post(`http://localhost:4000/api/comp/update-complaint/${complaintId}`, { status: 'completed' });
         setAgentComplaintList((prevComplaints) =>
            prevComplaints.map((complaint) =>
               complaint.complaintId === complaintId ? { ...complaint, status: 'completed' } : complaint
            )
         );
      } catch (error) {
         console.log(error);
      }
   };

   const handleToggle = (complaintId) => {
      setToggle((prevState) => ({
         ...prevState,
         [complaintId]: !prevState[complaintId],
      }));
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <div className="body">
            <Navbar className="text-white" bg="dark" expand="lg">
               <Container fluid>
                  <Navbar.Brand className="text-white">
                     Hi Agent {userName}
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="navbarScroll">
                     <Nav className="text-white me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <NavLink style={{ textDecoration: 'none', color: 'white' }}>
                           View Complaints
                        </NavLink>
                     </Nav>
                     <Button onClick={LogOut} variant="outline-danger" className="ms-3">
                        Log out
                     </Button>
                  </Navbar.Collapse>
               </Container>
            </Navbar>

            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}>
               {agentComplaintList && agentComplaintList.length > 0 ? (
                  agentComplaintList.map((complaint, index) => {
                     const open = toggle[complaint.complaintId] || false;
                     return (
                        <Card
                           key={index}
                           style={{
                              width: '24rem', 
                              margin: '15px', 
                              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'  // Increased width
                           }}
                        >
                           <Card.Body>
                              <Card.Title><b>Name:</b> {complaint.name}</Card.Title>
                              <Card.Text><b>Address:</b> {complaint.address}</Card.Text>
                              <Card.Text><b>City:</b> {complaint.city}</Card.Text>
                              <Card.Text><b>State:</b> {complaint.state}</Card.Text>
                              <Card.Text><b>Pincode:</b> {complaint.pincode}</Card.Text>
                              <Card.Text><b>Comment:</b> {complaint.comment}</Card.Text>
                              <Card.Text><b>Status:</b> {complaint.status}</Card.Text>

                              {complaint.status !== 'completed' && (
                                 <Button 
                                    onClick={() => handleStatusChange(complaint.complaintId)} 
                                    variant="primary" 
                                    className="mb-2"
                                 >
                                    Mark as Completed
                                 </Button>
                              )}
                              <Button
                                 onClick={() => handleToggle(complaint.complaintId)}
                                 aria-controls={`collapse-${complaint.complaintId}`}
                                 aria-expanded={!open}
                                 className="mx-3"
                                 variant="primary"
                              >
                                 Message
                              </Button>
                              <Collapse in={!open}>
                                 <div id={`collapse-${complaint.complaintId}`}>
                                    <Card body style={{ width: '350px', marginTop: '12px' }}>
                                       <ChatWindow key={complaint.complaintId} complaintId={complaint.complaintId} name={userName} />
                                    </Card>
                                 </div>
                              </Collapse>
                           </Card.Body>
                        </Card>
                     );
                  })
               ) : (
                  <Alert variant="info" style={{ width: '100%', textAlign: 'center' }}>
                     <Alert.Heading>No complaints to show</Alert.Heading>
                  </Alert>
               )}
            </div>
         </div>
      </>
   );
};

export default AgentHome;

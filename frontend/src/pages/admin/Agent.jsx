import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Agent = () => {
   const navigate = useNavigate();
   const [ordinaryList, setOrdinaryList] = useState([]);
   const [toggle, setToggle] = useState({});
   const [updateAgent, setUpdateAgent] = useState({
      name: '',
      email: '',
      phone: '',
   });

   // Handle changes in the form inputs
   const handleChange = (e) => {
      setUpdateAgent({ ...updateAgent, [e.target.name]: e.target.value });
   };

   // Fetch the list of agents when the component mounts
   useEffect(() => {
      const getOrdinaryRecords = async () => {
         try {
            const response = await axios.get('http://localhost:4000/api/admin/agents');
            setOrdinaryList(response.data.agent);
         } catch (error) {
            console.log(error);
         }
      };
      getOrdinaryRecords();
   }, [navigate]);

   // Submit the updated agent data
   const handleSubmit = async (user_id) => {
      if (updateAgent.name === '' && updateAgent.email === '' && updateAgent.phone === '') {
         alert('At least 1 field needs to be filled.');
      } else {
         const confirmed = window.confirm('Are you sure you want to update the agent?');
         if (confirmed) {
            try {
               const response = await axios.post(
                  `http://localhost:4000/api/admin/update-user/${user_id}`,
                  updateAgent
               );
               alert('Agent updated successfully');
               // Optionally: Refresh the agent list here
               setOrdinaryList(
                  ordinaryList.map((agent) =>
                     agent._id === user_id ? { ...agent, ...updateAgent } : agent
                  )
               );
            } catch (err) {
               console.log(err);
            }
         }
      }
   };

   // Delete an agent
   const deleteUser = async (userId) => {
      try {
         const confirmed = window.confirm('Are you sure you want to delete the user?');
         if (confirmed) {
            await axios.delete(`http://localhost:4000/api/admin/delete-user/${userId}`);
            setOrdinaryList(ordinaryList.filter((user) => user._id !== userId));
         }
      } catch (error) {
         console.log(error);
      }
   };

   // Toggle the visibility of the update form
   const handleToggle = (agentId) => {
      setToggle((prevState) => ({
         ...prevState,
         [agentId]: !prevState[agentId],
      }));
   };

   // Set the form values to the selected agent's data when the update button is clicked
   const handleEditClick = (agent) => {
      setUpdateAgent({
         name: agent.name,
         email: agent.email,
         phone: agent.phone,
      });
   };

   return (
      <>
         <div className="body" style={{ backgroundColor: '#f7f9fc', padding: '20px' }}>
            <Container>
               <Table
                  striped
                  bordered
                  hover
                  responsive
                  style={{
                     backgroundColor: '#ffffff',
                     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                     borderRadius: '8px',
                  }}
               >
                  <thead>
                     <tr style={{ backgroundColor: '#007bff', color: '#ffffff' }}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {ordinaryList.length > 0 ? (
                        ordinaryList.map((agent) => {
                           const open = toggle[agent._id] || false;

                           return (
                              <tr key={agent._id}>
                                 <td>{agent.name}</td>
                                 <td>{agent.email}</td>
                                 <td>{agent.phone}</td>
                                 <td>
                                    <Button
                                       onClick={() => {
                                          handleToggle(agent._id);
                                          handleEditClick(agent); // Set the form values to the selected agent's data
                                       }}
                                       aria-controls={`collapse-${agent._id}`}
                                       aria-expanded={open}
                                       className="mx-2"
                                       variant="outline-warning"
                                       style={{ borderRadius: '20px' }}
                                    >
                                       Update
                                    </Button>
                                    <Collapse in={open}>
                                       <Form
                                          onSubmit={(e) => {
                                             e.preventDefault();
                                             handleSubmit(agent._id);
                                          }}
                                          className="p-4"
                                          style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}
                                       >
                                          <Form.Group className="mb-3" controlId="formBasic">
                                             <Form.Label>Full Name</Form.Label>
                                             <Form.Control
                                                type="text"
                                                name="name"
                                                value={updateAgent.name}
                                                onChange={handleChange}
                                                placeholder="Enter name"
                                             />
                                          </Form.Group>
                                          <Form.Group className="mb-3" controlId="formBasicEmail">
                                             <Form.Label>Email address</Form.Label>
                                             <Form.Control
                                                type="email"
                                                name="email"
                                                value={updateAgent.email}
                                                onChange={handleChange}
                                                placeholder="Enter email"
                                             />
                                          </Form.Group>

                                          <Form.Group className="mb-3" controlId="formBasicTel">
                                             <Form.Label>Phone</Form.Label>
                                             <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={updateAgent.phone}
                                                onChange={handleChange}
                                                placeholder="Enter Phone no."
                                             />
                                          </Form.Group>

                                          <Button
                                             size="sm"
                                             variant="outline-success"
                                             type="submit"
                                             style={{ borderRadius: '20px' }}
                                          >
                                             Submit
                                          </Button>
                                       </Form>
                                    </Collapse>
                                    <Button
                                       onClick={() => deleteUser(agent._id)}
                                       className="mx-2"
                                       variant="outline-danger"
                                       style={{ borderRadius: '20px' }}
                                    >
                                       Delete
                                    </Button>
                                 </td>
                              </tr>
                           );
                        })
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
                           <Alert.Heading>No Agents to show</Alert.Heading>
                        </Alert>
                     )}
                  </tbody>
               </Table>
            </Container>
         </div>
      </>
   );
};

export default Agent;

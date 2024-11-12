import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
// import Footer from '../common/FooterC';
import axios from 'axios';

const User = () => {
   const navigate = useNavigate();
   const [ordinaryList, setOrdinaryList] = useState([]);
   const [toggle, setToggle] = useState({});
   const [updateUser, setUpdateUser] = useState({
      name: '',
      email: '',
      phone: '',
   });

   const handleChange = (e) => {
      setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (user_id) => {
      if (updateUser === "") {
         alert("At least 1 field needs to be filled.");
      } else {
         window.confirm("Are you sure you want to Update the user?");
         axios.post(`http://localhost:4000/api/admin/update-user/${user_id}`, updateUser)
            .then((res) => {
               alert(`User updated successfully`);
               JSON.stringify(res.data);
            })
            .catch((err) => {
               console.log(err);
            });
      }
   };

   useEffect(() => {
      const getOrdinaryRecords = async () => {
         try {
            const response = await axios.get('http://localhost:4000/api/admin/user/')
            .then((res)=>
            {
                setOrdinaryList(res.data.user)
            })
            const ordinary = response.data;
            setOrdinaryList(ordinary);
         } catch (error) {
            console.log(error);
         }
      };
      getOrdinaryRecords();
   }, [navigate]);

   const deleteUser = async (userId) => {
      try {
         const confirmed = window.confirm("Are you sure you want to delete the user?");
         if (confirmed) {
            await axios.delete(`http://localhost:4000/api/admin/delete-user/${userId}`);
            setOrdinaryList(ordinaryList.filter((user) => user._id !== userId));
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleToggle = (userId) => {
      setToggle((prevState) => ({
         ...prevState,
         [userId]: !prevState[userId],
      }));
   };

   return (
      <>
         <div className="body" style={{ backgroundColor: '#f7f9fc', padding: '20px' }}>
            <Container>
               <Table striped bordered hover responsive style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
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
                        ordinaryList.map((user) => {
                           const open = toggle[user._id] || false;

                           return (
                              <tr key={user._id}>
                                 <td>{user.name}</td>
                                 <td>{user.email}</td>
                                 <td>{user.phone}</td>
                                 <td>
                                    <Button onClick={() => handleToggle(user._id)}
                                       aria-controls={`collapse-${user._id}`}
                                       aria-expanded={open}
                                       className='mx-2'
                                       variant="outline-warning"
                                       style={{ borderRadius: '20px' }}>
                                       Update
                                    </Button>
                                    <Collapse in={open}>
                                       <Form onSubmit={() => handleSubmit(user._id)} className='p-4' style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                                          <Form.Group className="mb-3" controlId="formBasic">
                                             <Form.Label>Full Name</Form.Label>
                                             <Form.Control name='name' value={updateUser.name} onChange={handleChange} type="text" placeholder="Enter name" />
                                          </Form.Group>
                                          <Form.Group className="mb-3" controlId="formBasicEmail">
                                             <Form.Label>Email address</Form.Label>
                                             <Form.Control name='email' value={updateUser.email} onChange={handleChange} type="email" placeholder="Enter email" />
                                          </Form.Group>

                                          <Form.Group className="mb-3" controlId="formBasicTel">
                                             <Form.Label>Phone</Form.Label>
                                             <Form.Control name='phone' value={updateUser.phone} onChange={handleChange} type="tel" placeholder="Enter Phone no." />
                                          </Form.Group>

                                          <Button size='sm' variant="outline-success" type="submit" style={{ borderRadius: '20px' }}>
                                             Submit
                                          </Button>
                                       </Form>
                                    </Collapse>
                                    <Button onClick={() => deleteUser(user._id)} className='mx-2' variant="outline-danger" style={{ borderRadius: '20px' }}>Delete</Button>
                                 </td>
                              </tr>
                           );
                        })
                     ) : (
                        <Alert variant="info" style={{ backgroundColor: '#eaf4ff', color: '#0d6efd', textAlign: 'center', fontSize: '1.1em' }}>
                           <Alert.Heading>No Users to show</Alert.Heading>
                        </Alert>
                     )}
                  </tbody>
               </Table>
            </Container>
         </div>
         {/* <Footer /> */}
      </>
   );
};

export default User;

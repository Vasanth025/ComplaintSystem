import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

// import UserInfo from './UserInfo';
import Admin from "./Admin";
import Agent from "./Agent.jsx"
import User from './User.jsx';
// import AgentInfo from './AgentInfo';

const AdminHome = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('dashboard');
   const [userName, setUserName] = useState('');

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { name } = user;
               setUserName(name);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };
      getData();
   }, [navigate]);

   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <Navbar className="text-white" bg="primary" expand="lg">
            <Container fluid>
               <Navbar.Brand className="text-white" href="#">
                  Welcome Admin, {userName}
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="text-white me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                     <NavLink
                        className={`nav-link text-light ${activeComponent === 'dashboard' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('dashboard')}
                        style={{ fontWeight: 'bold', color: '#f1f1f1' }}
                     >
                        Dashboard
                     </NavLink>
                     <NavLink
                        className={`nav-link text-light ${activeComponent === 'UserInfo' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('UserInfo')}
                        style={{ fontWeight: 'bold', color: '#f1f1f1' }}
                     >
                        Users
                     </NavLink>
                     <NavLink
                        className={`nav-link text-light ${activeComponent === 'Agent' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('Agent')}
                        style={{ fontWeight: 'bold', color: '#f1f1f1' }}
                     >
                        Agents
                     </NavLink>
                  </Nav>
                  <Button onClick={LogOut} variant="outline-light" style={{ borderRadius: '20px' }}>
                     Log out
                  </Button>
               </Navbar.Collapse>
            </Container>
         </Navbar>
         <div className="content" style={{ padding: '20px' }}>
            {activeComponent === 'Agent' ? <Agent /> : null}
            {activeComponent === 'dashboard' ? <Admin /> : null}
            {activeComponent === 'UserInfo' ? <User /> : null}
         </div>
      </>
   );
};

export default AdminHome;

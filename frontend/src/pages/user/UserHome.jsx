import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Complaint from './Complaint';
import Status from './Status';

const UserHome = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('Complaint');
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

   const Logout = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <nav className="navbar navbar-expand-lg bg-dark shadow-sm">
            <div className="container-fluid px-5">
               <span className="navbar-brand text-light fs-3">Hi, {userName}</span>
               <div className="navbar-collapse">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <NavLink
                           className={`nav-link text-light ${activeComponent === 'Complaint' ? 'active fw-bold border-bottom border-2 border-primary' : ''}`}
                           onClick={() => handleNavLinkClick('Complaint')}
                        >
                           Complaint Register
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           className={`nav-link text-light ${activeComponent === 'Status' ? 'active fw-bold border-bottom border-2 border-primary' : ''}`}
                           onClick={() => handleNavLinkClick('Status')}
                        >
                           Status
                        </NavLink>
                     </li>
                  </ul>
               </div>
               <button className="btn btn-outline-danger" onClick={Logout}>
                  Log Out
               </button>
            </div>
         </nav>
         <div className="body bg-light">
            <div className="container mt-4 p-4 bg-white shadow-sm rounded">
               {activeComponent === 'Complaint' ? <Complaint /> : null}
               {activeComponent === 'Status' ? <Status /> : null}
            </div>
         </div>
         {/* <Footer /> */}
      </>
   );
};

export default UserHome;

import React, { useState } from 'react';
import axios from 'axios';
import '../../index.css';

const Complaint = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [userComplaint, setUserComplaint] = useState({
        userId: user ? user._id : '',
        name: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        status: 'Pending',
        comment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserComplaint({ ...userComplaint, [name]: value });
    };

    const handleClear = () => {
        setUserComplaint({
            userId: user ? user._id : '',
            name: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            status: 'Pending',
            comment: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { _id } = JSON.parse(localStorage.getItem('user'));
            console.log("userId:", _id);
            await axios.post(`http://localhost:4000/api/comp/add-complaint/${_id}`, {
                name: userComplaint.name,
                address: userComplaint.address,
                city: userComplaint.city,
                state: userComplaint.state,
                pincode: userComplaint.pincode,
                status: userComplaint.status,
                comment: userComplaint.comment
            });
            handleClear();  // Clear the form fields after a successful submission
            alert("Complaint registered successfully!");
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="complaint-page d-flex justify-content-center align-items-center">
            <div className="complaint-box p-4">
                <h3 className="text-center mb-4">Submit Your Complaint</h3>
                <form onSubmit={handleSubmit} className="complaint-form row g-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userComplaint.name}
                            onChange={handleChange}
                            className="form-control"
                            id="name"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={userComplaint.address}
                            onChange={handleChange}
                            className="form-control"
                            id="address"
                            placeholder="Enter your address"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                            type="text"
                            name="city"
                            value={userComplaint.city}
                            onChange={handleChange}
                            className="form-control"
                            id="city"
                            placeholder="Enter city"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="state" className="form-label">State</label>
                        <input
                            type="text"
                            name="state"
                            value={userComplaint.state}
                            onChange={handleChange}
                            className="form-control"
                            id="state"
                            placeholder="Enter state"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="pincode" className="form-label">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            value={userComplaint.pincode}
                            onChange={handleChange}
                            className="form-control"
                            id="pincode"
                            placeholder="Enter pincode"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="status" className="form-label">Status</label>
                        <input
                            type="text"
                            name="status"
                            value={userComplaint.status}
                            onChange={handleChange}
                            className="form-control"
                            id="status"
                            readOnly
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="comment" className="form-label">Description</label>
                        <textarea
                            name="comment"
                            value={userComplaint.comment}
                            onChange={handleChange}
                            className="form-control"
                            id="comment"
                            rows="4"
                            placeholder="Describe your complaint"
                            required
                        ></textarea>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-success mt-3 px-4">
                            Register Complaint
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Complaint;

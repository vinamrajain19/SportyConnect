import React, { useState } from 'react';
import image from "./AcademyRegister.jpg";
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { Form, message } from 'antd';
import { registeracademy } from '../../../apicalls/academy.js';
import './academyregistration.css';
import { Navigate } from 'react-router-dom';

const AcademyRegistration = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        sports: [],
        contactNumber: '',
        state: '',
        city: '',
        address: '',
    });

    const backgroundContainerStyle = {
        height: '100vh',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'sports' ? value.split(',') : value;
        setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(ShowLoading());
            const response = await registeracademy(formData);
            dispatch(HideLoading());
            if (response.success) {
                message.success(response.message);
                window.location.href = "/home";
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            console.error('API Error:', error);
            message.error(error.message);
        }
    };
    const isAuthenticated = localStorage.getItem('token'); 
    return (
        isAuthenticated ? (<div style={backgroundContainerStyle}>
            <div className="academy-registration-container">
                <h2 style={{ textAlign: 'center' }}>Academy Registration</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Academy Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <label>
                        Sports Offered (comma-separated):
                        <input
                            type="text"
                            name="sports"
                            value={Array.isArray(formData.sports) ? formData.sports.join(',') : formData.sports}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Contact Number:
                        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                    </label>
                    <label>
                        State:
                        <input type="text" name="state" value={formData.state} onChange={handleChange} />
                    </label>
                    <label>
                        City:
                        <input type="text" name="city" value={formData.city} onChange={handleChange} />
                    </label>
                    <label>
                        Address:
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    </label>
                    <button className="academybutton" type="submit">Register</button>
                </form>
            </div>
        </div>
        ) : <Navigate to="/" />
    );
};

export default AcademyRegistration;

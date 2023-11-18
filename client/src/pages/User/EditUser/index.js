import React, { useState,useEffect } from 'react';
import image from "./edituser.jpg";
import { edituser, getPreviousData } from '../../../apicalls/users';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { Form, message } from 'antd';

const SportsPeerPreferences = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        state: '',
        city: '',
        intrests: [],
        contactNo: '',
        skillLevels: '',
        dayOfWeek: '',
        startHour: '',
        endHour: '',
    });

    const fetchPreviousData = async () => {
        try {
            // Replace the following line with your actual API call or logic to fetch previous data
            const previousData = await getPreviousData();
            setFormData(previousData.data);
        } catch (error) {
            console.error('Error fetching previous data:', error);
        }
    };


    const [availabilityList, setAvailabilityList] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log("handlechange value", value)
        const updatedValue = name === 'intrests' ? value.split(',') : value;
        setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(ShowLoading());
            for (let i = 0; i < availabilityList.length; i++) {
                formData.availability.push(availabilityList[i]);
            }
            console.log("HandleSubmit", formData);
            const response = await edituser(formData);
            dispatch(HideLoading());
            if (response.success) {
                message.success(response.message);
                window.location.href = "/user";
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            console.error("API Error:", error);
            message.error(error.message);
        }
    };

    const handleAvailabilityChange = (e) => {
        const { name, value } = e.target;
        console.log("handleAvailabilityChange value", value)
        setFormData({ ...formData, [name]: value });
    };

    const addAvailability = () => {
        const { dayOfWeek, startHour, endHour } = formData;

        if (dayOfWeek && startHour && endHour) {
            console.log("addAvailability function", dayOfWeek, startHour, endHour);
            setAvailabilityList([
                ...availabilityList,
                { dayOfWeek, startHour, endHour },
            ]);
            setFormData({ ...formData, dayOfWeek: "", startHour: "", endHour: "" });
        }
    };

    const backgroundContainerStyle = {
        height: '100vh',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const formContainerStyle = {
        width: '50%', // Adjust the width as needed
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Drop shadow
    };

    useEffect(() => {
        fetchPreviousData(); // Fetch previous data when the component mounts
      }, []); 

    return (
        <div style={backgroundContainerStyle}>
            <div className="sports-peer-preferences-container" style={formContainerStyle}>
                <h2>Sports Preferences</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '48%' }}>
                            <label>
                                Age:
                                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder={formData.age} />
                            </label>
                        </div>

                        <div style={{ width: '48%' }}>
                            <label>
                                Gender:
                                <select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '48%' }}>
                            <label>
                                State:
                                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder={formData.state} />
                            </label>
                        </div>

                        <div style={{ width: '48%' }}>
                            <label>
                                City:
                                <input type="text" name="city" value={formData.city} onChange={handleChange} />
                            </label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '48%' }}>
                            <label>
                                Interests (comma-separated):
                                <input
                                    type="text"
                                    name="intrests"
                                    value={Array.isArray(formData.intrests) ? formData.intrests.join(',') : formData.intrests}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div style={{ width: '48%' }}>
                            <label>
                                Contact No:
                                <input type="tel" name="contactNo" value={formData.contactNo} onChange={handleChange} />
                            </label>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '48%' }}>
                            <label>
                                Skill Level:
                                <select name="skillLevels" value={formData.skillLevels} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </label>
                        </div>

                        <div style={{ width: '48%' }}>
                            <label>
                                Day of the Week:
                                <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleAvailabilityChange}>
                                    <option value="">Select</option>
                                    <option value="Sunday">Sunday</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                </select>
                            </label>
                        </div>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        <div style={{ width: '48%' }}>
                            <label>
                                Start Hour:
                                <input type="number" name="startHour" value={formData.startHour} onChange={handleAvailabilityChange} />
                            </label>
                        </div>

                        <div style={{ width: '48%' }}>
                            <label>
                                End Hour:
                                <input type="number" name="endHour" value={formData.endHour} onChange={handleAvailabilityChange} />
                            </label>
                        </div>
                    </div>


                    <button type="button" onClick={addAvailability}>Add Availability</button>

                    <div>
                        <h3>Added Availabilities:</h3>
                        <ul>
                            {availabilityList.map((availability, index) => (
                                <li key={index}>
                                    {`${availability.dayOfWeek}: ${availability.startHour}-${availability.endHour}`}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button type="submit">Save Preferences</button>
                </form>
            </div>
        </div>
    );
};

export default SportsPeerPreferences;

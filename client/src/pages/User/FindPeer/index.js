import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { Form, message } from 'antd';
import { getpeers } from '../../../apicalls/users';

const FindAcademiesPage = () => {
    const dispatch = useDispatch();

    const [searchResults, setSearchResults] = useState([]);
    const [arrayOfObjects, setArrayOfObjects] = useState([]);

    const containerStyle = {
        position: 'absolute',
        top: '12%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    const fetchData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getpeers();
            dispatch(HideLoading());

            // Assuming response.data is an array of objects
            setSearchResults(response.data);

            // Create an array of objects based on searchResults
            const newArray = response.data.map(result => ({
                // Specify the properties you want in each object
                name: result.name,
                city: result.city,
                state: result.state,
                gender: result.gender,
                intrests: result.intrests,
                contactNo: result.contactNo,
                availability: result.availability, // Add availability property
                // Add more properties as needed
            }));

            setArrayOfObjects(newArray);
        } catch (error) {
            dispatch(HideLoading());
            console.error('API Error:', error);
            message.error(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="find-academies-page">
            <div className="results-container">
                <h2>Search Results:</h2>
                <div className="result-details">
                    {searchResults.length > 0 ? (
                        <div className="results-container">
                            <div className="result-details">
                                {arrayOfObjects.map((result, index) => (
                                    <div className="result-item" key={index}>
                                        <h3>{result.name}</h3>
                                        <p>Gender: {result.gender}</p>
                                        <p>Interests: {result.intrests.join(', ')}</p>
                                        <p>City: {result.city}</p>
                                        <p>Availability:</p>
                                        {result.availability && result.availability.length > 0 ? (
                                            <ul>
                                                {result.availability.map((avail, idx) => (
                                                    <li key={idx}>
                                                        {`${avail.dayOfWeek}: ${avail.startHour}-${avail.endHour}`}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No availability information available</p>
                                        )}
                                        <div className="additional-details">
                                            <p>Phone: {result.contactNo}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : <div style={containerStyle}><h2>No Peer found!</h2></div>}
                </div>
            </div>
        </div >
    );
};
export default FindAcademiesPage;
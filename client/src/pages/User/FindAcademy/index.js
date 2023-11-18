import React, { useState } from 'react';
import image from "./findacademies.jpg"
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { Form, message } from 'antd';
import { Link } from 'react-router-dom';
import { getacademy } from '../../../apicalls/academy.js';

const FindAcademiesPage = () => {
    const dispatch = useDispatch();

    const [searchCriteria, setSearchCriteria] = useState({
        sport: [],
    });

    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({ ...searchCriteria, [name]: value });
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(ShowLoading());
            const response = await getacademy(searchCriteria);
            dispatch(HideLoading());
            setSearchResults(response.data);
            console.log(searchResults);
        } catch (error) {
            dispatch(HideLoading());
            console.error('API Error:', error);
            message.error(error.message);
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


    return (
        <div className="find-academies-page" >
            <h1>Find Academies</h1>
            <form onSubmit={handleSearchSubmit} className="search-form">
                <label>
                    Sport:
                    <input
                        type="text"
                        name="sport"
                        value={searchCriteria.sport}
                        onChange={handleSearchChange}
                    />
                </label>
                <button type="submit">Search</button>
                <Link to="/user/edituser" style={{color:'black'}}
                            >
                                Edit your profile
                </Link>
            </form>

            {searchResults.length > 0 && (
                <div className="results-container">
                    <h2>Search Results:</h2>
                    <div className="result-details">
                        {searchResults.map((result, index) => (
                            <div className="result-item" key={index}>
                                <h3>{result.name}</h3>
                                <p>{result.city}</p>
                                <div className="additional-details">
                                    <p>Phone: {result.contactNo}</p>
                                    <p>Address : {result.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindAcademiesPage;

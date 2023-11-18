import React from 'react';
import image from "./user.jpg"
import { Link,Navigate } from 'react-router-dom';



const HomePage = () => {

    const backgroundContainerStyle = {
        height: '100vh',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const isAuthenticated = localStorage.getItem('token'); 


    return (


        isAuthenticated ?  (<div className="home-page-container" style={backgroundContainerStyle}>

            <div className="option-container fade-in">
                <h2>Edit Sports Preference</h2>
                <p>Update your sports preferences and interests.</p>
                <Link to="/user/edituser">
                    <button>Edit Sports Preference</button>
                </Link>
            </div>

            <div className="option-container fade-in">
                <h2>Find Academy for User</h2>
                <p>Discover sports academies and training centers near you.</p>
                <Link to="/user/findacademy">
                    <button>Find Academy</button>
                </Link>

            </div>

            <div className="option-container fade-in">
                <h2>Find Other Sports Peers</h2>
                <p>Connect with other sports enthusiasts and find sports peers.</p>
                <Link to="/user/findpeer">
                    <button>Find Sports Peer</button>
                </Link>

            </div>
        </div >
        ) : <Navigate to="/" />
    );
};

export default HomePage;

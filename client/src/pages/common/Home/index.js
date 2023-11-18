// src/App.js
import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faRunning } from '@fortawesome/free-solid-svg-icons';
import { Link,Navigate } from 'react-router-dom';

function Home() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const sectionTransition = { duration: 0.5 };

    const isAuthenticated = localStorage.getItem('token'); 

    return (
        isAuthenticated ? (<div className="Home">
            <header className="Home-header">
                <h1 style={{ color: 'white' }}>
                    <FontAwesomeIcon icon={faRunning} /> SportyConnect
                </h1>
                <p style={{ color: 'white' }}>Find your sports match and connect with fellow sports enthusiasts!</p>
            </header>
            <main className="main">
                <motion.section
                    className="section academy-section"
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={sectionTransition}
                >
                    <FontAwesomeIcon icon={faBook} size="2x" />
                    <Link to="/registeracademy">
                        <h2>Sports Academy</h2>
                    </Link>
                    <p>Register Sports Academy and add sports resouces for players!</p>
                    {/* Add more content related to the Academy section */}
                </motion.section>
                <motion.section
                    className="section peer-section"
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    transition={sectionTransition}
                >
                    <FontAwesomeIcon icon={faRunning} size="2x" />
                    <Link to="/user">
                        <h2>Sports Peers</h2>
                    </Link>
                    <p>Match with fellow sports enthusiasts and share your passion!</p>
                    {/* Add more content related to the Peer section */}
                </motion.section>
            </main>
        </div >
        ) : <Navigate to="/"/>
    );
}

export default Home;

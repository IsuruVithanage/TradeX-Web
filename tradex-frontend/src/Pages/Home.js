import React from 'react';
import SideNavBar from "../Components/SideNavBar";
import "./Home.css";
import NavBar from "../Components/NavBar";

const Home = () => {

    return (
        <div className="home-container">
            <div style={{ display: 'flex' }}>
                <SideNavBar />
                <div style={{ flex: 1 }}>
                    <NavBar />
                </div>
            </div>
        </div>
    );
};

export default Home;

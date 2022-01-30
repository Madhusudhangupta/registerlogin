import React from "react";
import './homepage.css';

const HomePage = ({setLoginUser}) => {
    return <div className="homepage">
        <h1>Homepage</h1>
        <div className="button" onClick={() => setLoginUser({})}>Logout</div>
    </div>
}

export default HomePage;
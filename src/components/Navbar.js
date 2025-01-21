import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        setIsLoggedIn(!!loggedInUser); 
    }, []);

    
    const handleLogout = () => {
        localStorage.removeItem('loggedInUser'); // Remove user data
        setIsLoggedIn(false); 
        navigate('/'); 
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-brand">
                <h4>Dietzone</h4>
            </div>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className="collapse navbar-collapse" id="navbarNav"
            >
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink
                            to={"/"}
                            className={({ isActive }) => 'nav-link ' + (isActive ? 'active' : '')}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to={"/dashboard"}
                            className={({ isActive }) => 'nav-link ' + (isActive ? 'active' : '')}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    {isLoggedIn ? (
                        <li className="nav-item">
                        <span className="nav-link" onClick={handleLogout}>Logout</span>
               </li>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink
                                    to={"/signup"}
                                    className={({ isActive }) => 'nav-link ' + (isActive ? 'active' : '')}
                                >
                                    Signup
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to={"/login"}
                                    className={({ isActive }) => 'nav-link ' + (isActive ? 'active' : '')}
                                >
                                    Login
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

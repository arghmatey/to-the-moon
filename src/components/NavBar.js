import React from 'react';
import { NavLink } from 'react-router-dom';
import userService from '../services/userService';

const NavBar = ({user, setUser}) => {

    const handleLogout = () => {
        userService.logout();
        setUser(null);
    }

    return (
        <header>
            <h1>To the Moon</h1>
            {user ?
                <nav>
                    <NavLink 
                        to="/" 
                        className="nav-link">Home</NavLink>
                    <NavLink 
                        to="/" 
                        onClick={handleLogout} 
                        className="nav-link">Logout</NavLink>
                </nav>
            :
                <nav>
                    <NavLink 
                        to="/" 
                        className="nav-link">Home</NavLink>
                    <NavLink 
                        to="/login" 
                        className="nav-link">Login</NavLink>
                    <NavLink 
                        to="/signup" 
                        className="nav-link">Signup</NavLink>
                </nav>
            }
        </header>
    );
};

export default NavBar;
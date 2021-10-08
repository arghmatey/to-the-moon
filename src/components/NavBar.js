import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
    let navContent = props.user ?
        <nav>
            <NavLink 
                to="/" 
                className="nav-link">Home</NavLink>
            <NavLink 
                to="/" 
                onClick={props.handleLogout} 
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
        ;

    return (
        <header>
            <h1>To the Moon</h1>
            {navContent}
        </header>
    );
};

export default NavBar;
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
    let navContent = props.user ?
        <nav>
            <NavLink 
                to='/' 
                onClick={props.handleLogout} 
                className="neon-nav">Logout</NavLink>
        </nav>
        :
        <nav>
            <NavLink 
                to='/login' 
                className="neon-nav">Login</NavLink>
            <NavLink 
                to='/signup' 
                className="neon-nav">Signup</NavLink>
        </nav>
        ;

    return (
        <header>
            {navContent}
        </header>
    );
};

export default NavBar;
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
    let navContent = props.user ?
        <NavLink 
            to='/' 
            onClick={props.handleLogout} 
            className="neon-nav">Logout</NavLink>
        :
        <NavLink 
            to='/signup' 
            className="neon-nav">Signup</NavLink>
        ;

    return (
        <nav>
            {navContent}
        </nav>
    );
};

export default NavBar;
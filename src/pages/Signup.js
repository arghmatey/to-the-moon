import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import userService from '../services/userService';

const Signup = (props) => {
    const [formData, setFormData] = useState(
        {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            passwordConf: ''
        }
    );
    const [message, setMessage] = useState('');

    let history = useHistory();

    const handleChange = e => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await userService.signup(formData);
            props.handleAuth();
            history.push('/');
        } catch (err) {
            setMessage('Unable to register. Please try again.')
        }
    }

    return (


        <section>
            <h2>Signup</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label htmlFor="firstName">
                    First Name
                </label>
                <input 
                    type="text" 
                    id="firstName" 
                    onChange={handleChange} 
                    required
                />
                <label htmlFor="lastName">
                    Last Name
                </label>
                <input 
                    type="text" 
                    id="lastName" 
                    onChange={handleChange} 
                    required
                />
                <label htmlFor="username">
                    Username
                </label>
                <input 
                    type="text" 
                    id="username" 
                    onChange={handleChange} 
                    required
                />
                <label htmlFor="password">
                    Password
                </label>
                <input 
                    type="password" 
                    id="password" 
                    onChange={handleChange} 
                    required
                />
                <label htmlFor="passwordConf">
                    Confirm your password
                </label>
                <input 
                    type="password" 
                    id="passwordConf" 
                    onChange={handleChange} 
                    required
                />
                <button type="submit">
                    Create my account
                </button>
            </form>
            <p>{message}</p>
        </section>
    )
}

export default Signup;
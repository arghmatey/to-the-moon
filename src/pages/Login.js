import React, { useState } from 'react';
import userService from '../services/userService';

const Login = (props) => {
    const [formData, setFormData] = useState(
        {
            username: '',
            password: ''
        }
    );

    const handleChange = e => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(formData);
            console.log('this far')
            props.handleAuth();
            props.history.push('/');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section>
            <h2>Log In</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={handleChange}/>
                <button type="submit">Log In</button>
            </form>
        </section>
    )
}

export default Login;
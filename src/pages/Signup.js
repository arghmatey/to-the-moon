import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import userService from '../services/userService';

const Signup = (props) => {
    const [formData, setFormData] = useState(
        {
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            passwordConf: ''
        }
    );

    let history = useHistory();

    const handleChange = e => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.signup(formData);
            props.handleAuth();
            history.push('/');
        } catch (err) {
            console.log("Update to include error message.")
        }
    }

    return (
        <section>
            <h2>Signup</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" onChange={handleChange}/>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" onChange={handleChange}/>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={handleChange}/>
                <label htmlFor="passwordConf">Confirm your password</label>
                <input type="password" id="passwordConf" onChange={handleChange}/>
                <button type="submit">Create my account</button>
            </form>
        </section>
    )
}

export default Signup;
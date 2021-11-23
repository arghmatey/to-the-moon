import React, { useState } from 'react';

const StepForm = (props) => {
    const [formData, setFormData] = useState(
        {
            steps: 0,
        }
    );
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setFormData({...formData, [e.target.id]: +e.target.value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!Number(formData.steps)) {
          setMessage('Please enter a valid number! :)');
        } else {
            props.handleAddSteps(formData);
        };
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="steps">How many steps did you take today? </label>
                <input name="steps" id="steps" type="number" min="0" onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
        </section>
    )
}

export default StepForm;
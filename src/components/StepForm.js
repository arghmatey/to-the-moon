import React, { useState } from 'react';

const StepForm = (props) => {
    const [formData, setFormData] = useState(
        {
            steps: 0,
        }
    );

    const handleChange = e => {
        setFormData({...formData, [e.target.id]: +e.target.value});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (!Number(formData.steps)) {
          alert('Please enter a valid number! :)');
        } else {
            props.handleAddSteps(formData)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="steps">How many steps did you take today? </label>
            <input name="steps" id="steps" type="number" min="0" onChange={handleChange}/>
            <button type="submit" value="Submit"/>
        </form>
    )
}

export default StepForm;
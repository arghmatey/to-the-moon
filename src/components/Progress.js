import React from 'react';

const StepForm = ({user, steps}) => {

    return (
        <section className="progress-container">  
            {user ?
                <div>You're {steps} steps closer to the moon!</div>
            :
                <div>Signup or login to track your progress.</div>
            }
        </section>
    )
}

export default StepForm;
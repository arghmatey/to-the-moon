import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route
  } from 'react-router-dom';
import './App.scss';
import data from './milestone_data';
import userService from './services/userService';
import stepService from './services/stepService';
import NavBar from './components/NavBar';
import StepForm from './components/StepForm';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  // initialize user if there's a token, otherwise - null
  const [user, setUser] = useState(userService.getUser());

  const [goal] = useState(data[data.length -1]);
  const [userSteps, setUserSteps] = useState(0);
  const [milestone, setMilestone] = useState(0);

  const handleAuth = () => {
    setUser(userService.getUser());
  }

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  }

  // average stride size is 2.1-2.5 feet long & a mile is 5280 feet
  // for MVP - all mile entries are rounded to two decimal points
  const convertToMile = steps => {
    return +(steps * 2.3 / 5280).toFixed(2);
  }

  const convertToSteps = miles => {
    return +(miles * 5280 / 2.3).toFixed(2);
  }

  const checkMilestone = steps => {
    const convertedMi = convertToMile(steps);
    if (convertedMi >= data[milestone].end) {
      setMilestone(milestone + 1)
    };
  }

  const handleAddSteps = async steps => {
    const updatedUser = await stepService.add(steps);
    setUserSteps(updatedUser.totalSteps);
  }

  return (
    <Router>
      <div className="app">
          <NavBar
            user={user}
            handleLogout={handleLogout}
          />

        <main>
          <div className="moon-container">
            <div className="moon"></div>
          </div>

          
            <Route exact path="/">
              <section>
                <h2>The {goal.name} is {goal.end.toLocaleString()} miles away.</h2>
                <h3>That's only {convertToSteps(goal.end).toLocaleString()} steps!</h3>

                <StepForm 
                  handleAddSteps={handleAddSteps}
                />

                <div>You're {userSteps.toLocaleString()} steps closer to the moon!</div>
              </section>

              <section className="milestone-container">
                <h3>Current milestone: {data[milestone].name}</h3>
              </section>
              
              {user ?
                <section className="milestone-container">
                  <div>You're {user.totalSteps.toLocaleString()} steps closer to the moon!</div>
                </section>
              :
                <section className="milestone-container">
                  <div>Signup to track your progress.</div>
                </section>
              }
            </Route>

            <Route exact path="/signup">
              <Signup
                handleAuth={handleAuth}
              />
            </Route>
            <Route exact path="/login">
              <Login
                handleAuth={handleAuth}
              />
            </Route>
        </main>
      </div>
    </Router>
  );
}

export default App;

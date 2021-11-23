import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route
  } from 'react-router-dom';
import './App.scss';
import data from './milestone_data';
import tokenService from './services/tokenService';
import userService from './services/userService';
import stepService from './services/stepService';
import NavBar from './components/NavBar';
import StepForm from './components/StepForm';
import Progress from './components/Progress';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(tokenService.getUserFromToken());
  const [steps, setSteps] = useState();
  const [goal] = useState(data[data.length - 1]);

  const handleAuth = () => {
    setUser(userService.getUser());
  }

  // average stride is 2.1-2.5 feet long & a mile is 5280 feet
  // for MVP - all mile entries are rounded to two decimal points
  const convertToSteps = miles => {
    return +(miles * 5280 / 2.3).toFixed(2);
  }

  const handleAddSteps = async data => {
    if (user) {
      const updatedUser = await stepService.add(data);
      setSteps(updatedUser.totalSteps.toLocaleString());
    } else {
      setSteps(steps + data.steps);
    }
  }

  useEffect(() => {
    if (user) {
      setLoading(true);
      async function getUserSteps() {
        const user = await userService.getUser();
        setSteps(user.totalSteps.toLocaleString());
      };

      getUserSteps();
      setLoading(false);
    }
  }, [user])

  return (
    <Router>
      <div className="app">
          <NavBar
            user={user}
            setUser={setUser}
          />

        <main>
          <div className="moon-container">
            <div className="moon"></div>
          </div>

          
            <Route exact path="/">
              {loading ? 
                <section>
                  <h2>Loading</h2>
                </section>
                :
                <>
                  <section>
                    <h2>The {goal.name} is {goal.end.toLocaleString()} miles away.</h2>
                    <h3>That's only {convertToSteps(goal.end).toLocaleString()} steps!</h3>
                  </section>

                  <StepForm 
                    user={user}
                    handleAddSteps={handleAddSteps}
                  />
                  <Progress
                    user={user}
                    steps={steps}
                  />
                </>
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

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  } from 'react-router-dom';
import data from './milestone_data';
import userService from './services/userService';
import './App.css';
import NavBar from './components/NavBar';
import Signup from './pages/Signup';

function App() {
  // initialize user if there's a token, otherwise - null
  const [user, setUser] = useState(userService.getUser());

  const [moonMi, setmoonMi] = useState(238855);
  const [newSteps, setNewSteps] = useState(0);
  const [userMi, setUserMi] = useState(0);
  const [milestone, setMilestone] = useState(0);

  const handleAuth = () => {
    setUser(userService.getUser());
  }

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  }

  const handleChange = e => {
    setNewSteps(e.target.value);
  }

  // average stride size is 2.1-2.5 feet long
  //    icebox feature: stride based on height
  //    for now: taking from the middle and settling on 2.3
  // how many feet in a mile you ask? 5280
  // for MVP - all mile entries are rounded to two decimal points
  const convertToMile = steps => {
    return (steps * 2.3 / 5280).toFixed(2);
  }

  const checkMilestone = (miles) => {
    console.log(miles, data[milestone].end);
    if (miles >= data[milestone].end) {
      setMilestone(milestone + 1)
    };
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!Number(newSteps)) {
      alert('Please enter a valid number! :)');
    } else {
      const convertedMi = convertToMile(newSteps) + userMi;
      checkMilestone(convertedMi);
      setUserMi(convertedMi);
    }
  }

  useEffect(() => {
    console.log(user);
  })

  return (
    <Router>
      <div className="App">
        <header>
          <NavBar
            user={user}
            handleLogout={handleLogout}
          />
        </header>

        <main>
          <div className="moon-container">
            <div className="moon"></div>
          </div>

          
            <Route exact path="/">
              <div>The moon is {moonMi} miles away</div>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="steps">How many steps did you take today? </label>
                  <input name="steps" type="text" value={newSteps} onChange={handleChange}/>
                  <input type="submit" value="Submit"/>
                </form>
              <div>You're {userMi} miles closer to the moon!</div>

              <section className="milestone-container">
                <h3>Current milestone: {data[milestone].name}</h3>
              </section>
            </Route>

            <Route path="/signup">
              <Signup
                handleAuth={handleAuth}
              />
            </Route>
        </main>
      </div>
    </Router>
  );
}

export default App;

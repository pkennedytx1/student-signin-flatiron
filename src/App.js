import React from 'react';
import Signin from './Components/Signin'
import Dashboard from './Components/Dashboard'
import StudentContainer from './Components/StudentContainer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path='/'>
        <Signin />
      </Route>
      <Route path='/dashboard'>
        <Dashboard />
      </Route>
      <Route path='/addstudent'>
        <StudentContainer />
      </Route>
    </div>
    </Router>
  );
}

export default App;

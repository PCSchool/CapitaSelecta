import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import NotFound from './components/main/NotFound';
import Login from './components/login/login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import PrivateRoute from './PrivateRoute';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }
  
  setAuthenticated(auth){
    this.setState({isAuthenticated: auth});
  }

  logout(){
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  render() {
    const isAuth = localStorage.getItem('user');

    if(isAuth){
      return (
        <div className="App">
          <Router>
            <div>
              <Navbar bg="light" expand="lg">
                <Navbar.Brand href="">Kweeter</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="/profile" className="nav-link">Profile</Nav.Link>
                    <Nav.Link href="/dashboard" className="nav-link">Dashboard</Nav.Link>
                    <Nav.Link onClick={this.logout} className="nav-link">Logout</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <hr />
              <Switch>
                  <Route exact path='/' component={Login} />
                  <Route exact path='/logout' component={Login} />
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
                  <PrivateRoute path='/profile' component={Profile} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }else{
      return (
        <div className="App">
          <Router>
            <div>
              <Switch>
                  <Route exact path='/' component={Login} />
                  <Route exact path='/login' component={Login} />
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
                  <PrivateRoute path='/profile' component={Profile} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }

}

export default App;

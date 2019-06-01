import React, { Component } from 'react';
import { Jumbotron, Row, Col, Form, Button} from 'react-bootstrap';
import axios from 'axios';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: ''
    }

    this.handleChangePassword =  this.handleChangePassword.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChangeUsername(e){
    this.setState({username: e.target.value});
  }

  handleChangePassword(e){
    this.setState({password: e.target.value});
  }

  onSubmit(){
    /*fetch('http://localhost:3000/users/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username, 
        password: this.state.password
      })
    }).then(resp => resp.json(), error => console.log(error))
      .then(res => console.log(res));*/
    /*resp.json(), error => console.log(error))
    .then(res => 
      localStorage.setItem('user', res["_id"])
    ).then(
      window.location.href = '/profile'
    );*/
    const body = {
      username: this.state.username, 
      password: this.state.password
    };
    const url = 'http://localhost:3000/users/authenticate';
    axios.post(url, body)
    .then(res => 
      localStorage.setItem('user', res.data["_id"])
    ).then(
      window.location.href = '/profile'
    );
  }

    render() {
      return (
        <Jumbotron>
            <h1>Login</h1>
            <hr/>
            <Form style={{ width: '36rem' }} className="LoginForm">
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>username</Form.Label>
                    <Form.Control name="username" type="text" placeholder="Enter username" onChange={this.handleChangeUsername} value={this.state.username}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password"  onChange={this.handleChangePassword} value={this.state.password}/>
                </Form.Group>
                <Button variant="primary" onClick={this.onSubmit}>
                    Submit
                </Button>
            </Form>
        </Jumbotron>
      );
    }
  }

  export default Login;
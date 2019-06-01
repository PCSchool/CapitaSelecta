import React, { Component } from 'react';
import KweetList from '../main/KweetList';
import FollowList from '../main/FollowList';
import {Form, Button, Row, Col} from 'react-bootstrap';

class Dashboard extends Component {
  constructor(){
    super();

    this.state = {
      message: '',
      user: [],
      user_id: ''
    }

    this.kweetsList = React.createRef();
    this.followingList = React.createRef();
    this.followersList = React.createRef();

    this.setUpProfile = this.setUpProfile.bind(this);
    this.handleChangeKweet = this.handleChangeKweet.bind(this);
    this.handleCreateKweet = this.handleCreateKweet.bind(this);
  }

  componentWillMount(){
    fetch('http://localhost:3000/users/' + localStorage.getItem('user'), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(resp => resp.json(), error => console.log(error))
    .then(res => 
        this.setUpProfile(res)
        );
  }

  setUpProfile(json){
    console.log(json);
    this.setState({user_id: localStorage.getItem('user')});
    this.setState({user: json});
    this.kweetsList.current.updateKweets();
    this.followersList.current.updateFollows();
    this.followersList.current.updateFollows();
  }

  handleChangeKweet(e){
    this.setState({message: e.target.value});
  }

  handleCreateKweet(){
    if(this.state.message.length < 1){
      alert("A kweet cannot be empty.");
    }else{
      fetch('http://localhost:3000/kweeter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: this.state.message, 
        username: this.state.user.username,
        user_id: localStorage.getItem('user')
      })
      }).then(resp => console.log(resp));
    }
    window.location.reload();
  }

    render() {
      return (
        <div className="container">
          <h1>Dashboard</h1>
          <hr/>
            <Form>
              <Form.Group controlId="createKweet">
              <Form.Label>Create kweet</Form.Label>
              <Form.Control onChange={this.handleChangeKweet} type="text" placeholder="new kweet" />
              </Form.Group>
              <Button onClick={this.handleCreateKweet}>Create</Button>
            </Form>
          <div>
            <Row>
              <Col>
              <KweetList name="kweets" user={this.state.user_id} ref={this.kweetsList}/>

              </Col>

              <Col>
              <FollowList name="follower" user={this.state.user_id} ref={this.followersList}/>

              </Col>
              <Col>
              <FollowList name="following" user={this.state.user_id} ref={this.followingList}/>

              </Col>
            </Row>
          </div>
        </div>
      );
    }
  }

  export default Dashboard;
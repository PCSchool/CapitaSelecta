import React, { Component } from 'react';
import ProfileInfo from './ProfileInfo';
import ProfileUpdate from './ProfileUpdate';
import KweetList from '../main/KweetList';
import { Container, Row, Col } from 'react-bootstrap';

class Profile extends Component {
  constructor(){
    super();

    this.state = {
      user: {},
      user_id: '',
      followersLength: 0,
      followingsLength: 0,
      kweetsLength: 0
    }
    
    this.kweetsList = React.createRef();

    this.setUpProfile = this.setUpProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    console.log(e);
  }

  setUpProfile(json){
    console.log(json);
    this.setState({user_id: localStorage.getItem('user')});
    this.setState({user: json});
    this.setState({followersLength: json["followers"].length});
    this.setState({followingsLength: json["followings"].length});
    this.setState({kweetsLength: json["kweets"].length});
    this.kweetsList.current.updateKweets();
  }

  componentDidMount(){
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

    render() {
      return (
        <div>
            <h1>Profile</h1>
            <Container>
                <Row>
                    <Col>
                        <ProfileInfo user={this.state.user} followersLength={this.state.followersLength} followingsLength={this.state.followingsLength} kweetsLength={this.state.kweetsLength} />
                        <ProfileUpdate />
                    </Col>
                    <Col>
                      <KweetList name="kweets" user={this.state.user_id} ref={this.kweetsList}/>
                    </Col>
                </Row>
            </Container>
        </div>
      );
    }
  }

  export default Profile;
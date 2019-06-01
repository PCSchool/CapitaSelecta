import React, { Component } from 'react';
import {Card} from 'react-bootstrap'

class FollowCard extends Component {
  constructor(){
    super();
  }

    render() {
      return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>
                    {this.props.username}
                </Card.Title>
                <Card.Text>
                    location: {this.props.location}
                </Card.Text>
            </Card.Body> 
        </Card>
      );
    }
  }

  export default FollowCard;
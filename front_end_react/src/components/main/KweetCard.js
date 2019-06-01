import React, { Component } from 'react';
import {Card} from 'react-bootstrap'

class KweetCard extends Component {
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
                    {this.props.message}
                </Card.Text>
            </Card.Body> 
            <Card.Footer className="text-muted">
                {this.props.created_date}
            </Card.Footer>
        </Card>
      );
    }
  }

  export default KweetCard;
import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

class ProfileUpdate extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }

    render() {
      return (
        <>
        <Button variant="primary" onClick={this.handleShow}>
          Update profile
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter new email" />
                </Form.Group>

                <Form.Group controlId="formBasicWebsite">
                    <Form.Label>Website</Form.Label>
                    <Form.Control type="text" placeholder="Enter new website" />
                </Form.Group>
                
                <Form.Group controlId="formBasicLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Enter new location" />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      );
    }
  }

  export default ProfileUpdate;
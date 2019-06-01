import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Axios from 'axios';

class ProfileUpdate extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeBiography = this.handleChangeBiography.bind(this);
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
        this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateUpdate = this.validateUpdate.bind(this);
        this.validateEqual = this.validateEqual.bind(this);

        this.state = {
          show: false,
          biography: '',
          website: '',
          location: ''
        };
      }

      validateEqual(newvalue, currentvalue){
        if(newvalue.length > 1){
          return newvalue;
        }
        return currentvalue;
      }

      validateUpdate(){
        var newBiography = this.validateEqual(this.state.biography, this.props.biography);
        var newLocation = this.validateEqual(this.state.location, this.props.location);
        var newWebsite = this.validateEqual(this.state.website, this.props.website);
        const body = {
          "biography": newBiography,
          "location": newLocation,
          "website": newWebsite
        }
        console.log(body);
        return body;
      }
      onSubmit(){
        const url = "http://localhost:3000/users/" + this.props.user;
        const body = this.validateUpdate();
        Axios.put(url, body)
          .then(resp => console.log(resp));
        this.handleClose();
        window.location.reload();
      }

      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }

      handleChangeBiography(e){
        this.setState({biography: e.target.value});
      }

      handleChangeWebsite(e){
        this.setState({website: e.target.value});
      }

      handleChangeLocation(e){
        this.setState({location: e.target.value});
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
                <Form.Group controlId="formBasicBiography">
                    <Form.Label>biography</Form.Label>
                    <Form.Control type="text" onChange={this.handleChangeBiography} value={this.state.biography} placeholder="Enter new biography" />
                </Form.Group>

                <Form.Group controlId="formBasicWebsite">
                    <Form.Label>Website</Form.Label>
                    <Form.Control type="text" onChange={this.handleChangeWebsite} value={this.state.website} placeholder="Enter new website" />
                </Form.Group>
                
                <Form.Group controlId="formBasicLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" onChange={this.handleChangeLocation} value={this.state.location} placeholder="Enter new location" />
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.onSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      );
    }
  }

  export default ProfileUpdate;
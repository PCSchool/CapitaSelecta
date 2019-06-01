import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

class ProfileInfo extends Component {
  constructor(){
    super();
  }

    render() {
      return (
        <div>
          <Container>
            <Row>
            <h2>Profile information</h2>
            </Row>
            <Row>
                <Table>
                  <tbody>
                    <tr>
                      <td>Username</td>
                      <td>{this.props.user.username}</td>
                    </tr>
                    <tr>
                      <td>email</td>
                      <td>{this.props.user.email}</td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>{this.props.user.website}</td>
                    </tr>
                    <tr>
                      <td>Biography</td>
                      <td>{this.props.user.biography}</td>
                    </tr>
                    <tr>
                      <td>Location</td>
                      <td>{this.props.user.location}</td>
                    </tr>
                  </tbody>
                </Table>
            </Row>
            <Row>
                <h2>Followers </h2>
                <Table>
                    <tbody>
                        <tr>
                            <td>Followers</td>
                            <td>{this.props.followersLength}</td>
                        </tr>
                        <tr>
                            <td>Followings</td>
                            <td>{this.props.followingsLength}</td>
                        </tr>
                        <tr>
                            <td>Kweets</td>
                            <td>{this.props.kweetsLength}</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
          </Container>
        </div>
      );
    }
  }

  export default ProfileInfo;
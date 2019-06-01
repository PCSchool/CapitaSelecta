import React, { Component } from 'react';
import KweetList from '../main/KweetList';
import FollowList from '../main/Follow';

class NotFound extends Component {
  constructor(){
    super();
  }

    render() {
      return (
        <div className="container">
          <h1>Foutmelding</h1>
          <h2>Er is een fout opgetreden.</h2>
        </div>
      );
    }
  }

  export default NotFound;
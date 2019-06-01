import React, { Component } from 'react';
import FollowList from './FollowList';
import FollowCard from './FollowCard';

class Follow extends Component {
  constructor(){
    super();
  }

    render() {
      return (
        <div>
          <FollowList/>
        </div>
      );
    }
  }

  export default Follow;
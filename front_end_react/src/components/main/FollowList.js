import React, { Component } from 'react';
import FollowCard from './FollowCard';

class FollowList extends Component {
  constructor(){
    super();
    this.state = {
      follow: []
    }
  }

  updateFollows(){
    console.log(this.props.user)
    const url = 'http://localhost:3000/users/' + this.props.user + "/" + this.props.name;
    fetch(url)
      .then(resp => resp.json())
      .then(data => this.setState({follow: data}));
  }

    render() {
      const listItems = this.state.follow.map((follow) => 
        <li>
          <FollowCard key={follow._id} username={follow.username} location={follow.location}/>
        </li>
      );
      return (
        <div>
           <h2>{this.props.name}</h2> 
           <div>
             <ul className="NoBulletList">
                {listItems}
             </ul>
           </div>
        </div>
      );
    }
  }

  export default FollowList;
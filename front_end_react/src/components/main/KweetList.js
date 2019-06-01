import React, { Component } from 'react';
import KweetCard from './KweetCard';
class KweetList extends Component {
  constructor(){
    super();

    this.state = {
      kweets: [
        //{_id: 1, username: 'Katy123', message: 'I bought a new cat. His name is Pony.', created_date:"19.05.2010"},
        //{_id: 2, username: 'Harry1235', message: 'Today I went to work :(', created_date:"19.05.2010"}
      ]
    }
  }

  updateKweets(){
    console.log(this.props.user)
    const url = 'http://localhost:3000/kweeter/all/' + this.props.user;
    fetch(url)
      .then(resp => resp.json())
      .then(data => this.setState({kweets: data}));
  }

    render() {
      const listItems = this.state.kweets.map((kweet) => 
        <li>
          <KweetCard key={kweet._id} username={kweet.username} message={kweet.message} created_date={kweet.created_date}/>
        </li>
      );
      return (
        <div>
          <h2>Kweets</h2>
          <div>
            <ul className="NoBulletList">
              {listItems}
            </ul>
          </div>
        </div>
      );
    }
  }

  export default KweetList;
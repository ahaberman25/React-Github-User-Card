import React from 'react';
// import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      githubUsers: []
    };
  }

  componentDidMount() {
    console.log('mount')

    fetch(`https://api.github.com/users/ahaberman25`)
      .then(res => res.json())
      .then(users => {        
        console.log('users: ', users)
        this.setState({ githubUsers: users });
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }

  render() {
    console.log('state: ', this.state.githubUsers)
    return (
      <div>
        <p>{this.state.githubUsers.login}</p>
        <p>{this.state.githubUsers.id}</p>
        <img src={this.state.githubUsers.avatar_url} alt={this.state.githubUsers.avatar_url} key={this.state.githubUsers.avatar_url} />
        <p>{this.state.githubUsers.html_url}</p>
        <p>{this.state.githubUsers.name}</p>
        <p>{this.state.githubUsers.company}</p>
        <p>{this.state.githubUsers.location}</p>
        <p>{this.state.githubUsers.public_repos}</p>
        <p>{this.state.githubUsers.followers}</p>
        <p>{this.state.githubUsers.following}</p>
        <p>{this.state.githubUsers.created_at}</p>
      </div>
    )
  }
}

export default App;

import React from 'react';
import './App.css';

import styled from 'styled-components';

// import moment date formatting
import Moment from 'moment';

// import github contribution calendar
import GitHubCalendar from 'react-github-calendar';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      githubUsers: [],
      githubFollowers: []
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

    fetch(`https://api.github.com/users/ahaberman25/followers`)
    .then(res => res.json())
    .then(fusers => {        
      console.log('fusers: ', fusers)
      this.setState({ githubFollowers: fusers });
    })
    .catch(err => {
      console.log('err: ', err)
    })
  }

  componentDidUpdate() {

  }



  render() {
    // console.log('state: ', this.state.githubUsers)
    let date = Date(this.state.githubUsers.created_at)

    const UserCard = styled.div `
      width: 50%;
      margin: 0 auto;
    `;

    const FollowersBlock = styled.div `
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
      padding: 10px;
    `;

    const FInnerBlock = styled.div `
      margin: 0 auto;
      width: 25%;
      padding: 10px;
    `;

    let userState = this.state.githubUsers

    return (
      <div className='container'>
        <UserCard className='userCard'>
          Login: {userState.login}<br />
          id: {userState.id}<br />
          <img src={userState.avatar_url} alt={userState.avatar_url} key={userState.avatar_url} /><br />
          url: <a href={userState.html_url}>{userState.html_url}</a><br />
          Name: {userState.name}<br />
          Company: {userState.company}<br />
          Location: {userState.location}<br />
          # of repos: {userState.public_repos}<br />
          # of followers: {userState.followers}<br />
          # of following: {userState.following}<br />
          Joined: {Moment(date).format('MMMM/YYYY')}<br />

          <p><b>Github Contributions</b></p>
          <GitHubCalendar username="ahaberman25" fullYear={false} />
        </UserCard>

        <div>
          <FollowersBlock className='followersBlock'>
            {this.state.githubFollowers.map(followers => (            
              <FInnerBlock key={followers.login} className='fInnerBlock'>
                Login: {followers.login}<br />
                id: {followers.id}<br />
                <img src={followers.avatar_url} alt={followers.avatar_url} key={followers.avatar_url} width='200' height='200' /><br />
                url: <a href={followers.html_url}>{followers.html_url}</a><br />
              </FInnerBlock>           
            ))}
          </FollowersBlock>
        </div>
      </div>
    )
  }
}

export default App;

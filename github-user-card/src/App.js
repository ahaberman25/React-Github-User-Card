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
      githubFollowers: [],
      chooseUser: '',
      gitContUser: 'ahaberman25'
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

  handleChanges = e => {
    e.preventDefault();
    // console.log('typing: ', this.state.chooseUser)
    this.setState({ chooseUser: e.target.value });    
  }

  submitHandler = e => {
    e.preventDefault();
  }

  fetchUser = e => {
    e.preventDefault();
    console.log('fetch')

    fetch(`https://api.github.com/users/${this.state.chooseUser}`)
      .then(res => res.json())
      .then(users => {        
        // console.log('users: ', users)
        this.setState({ githubUsers: users });
      })
      .catch(err => {
        console.log("ERR: ", err);
      });
      
    fetch(`https://api.github.com/users/${this.state.chooseUser}/followers`)
      .then(res => res.json())
      .then(fusers => {        
        // console.log('fusers: ', fusers)
        this.setState({ githubFollowers: fusers });
      })
      .catch(err => {
        console.log('err: ', err)
      })
  };

  componentDidUpdate() {

  }



  render() {
    // console.log('state: ', this.state.githubUsers)
    let date = Date(this.state.githubUsers.created_at)

    const UserCard = styled.div `
      width: 50%;
      margin: 0 auto;
      padding: 20px;
      display: flex;
    `;

    const UserLeft = styled.div`
      width: 49%;
    `;
    const UserRight = styled.div`
      width: 49%;
    `;
    // const UserContributions = styled.div`
    //   width: 50%;
    //   margin: 0 auto;
    // `;

    // const UserInput = styled.div`
    //   width: 50%;
    //   margin: 0 auto;
    // `;

    const FollowersBlock = styled.div `
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
    `;

    const FInnerBlock = styled.div `
      width: 25%;
      margin: 15px auto;
      padding: 20px 10px;
      background: rgba(101, 63, 191, 0.57);
      text-align: center;
    `;

    let userState = this.state.githubUsers
    // console.log('date: ', date)

    return (
      <div className='container'>
        <UserCard className='userCard'>
          <UserLeft className='userLeft'>
            <img src={userState.avatar_url} alt={userState.avatar_url} key={userState.avatar_url} width='250' height='250' /><br />
          </UserLeft>
          <UserRight className='userRight'>
            <b>Login:</b> {userState.login}<br />
            <b>id:</b> {userState.id}<br />          
            <b>url:</b> <a href={userState.html_url}>{userState.html_url}</a><br />
            <b>Name:</b> {userState.name}<br />
            <b>Company:</b> {userState.company}<br />
            <b>Location:</b> {userState.location}<br />
            <b># of repos:</b> {userState.public_repos}<br />
            <b># of followers:</b> {userState.followers}<br />
            <b># of following:</b> {userState.following}<br />
            <b>Bio</b>: {userState.bio}<br />
            <b>Joined:</b> {Moment(date).format('MMMM/YYYY')}<br />
          </UserRight>
        </UserCard>

        <div className='githubContainer'>
          <p><b>Github Contributions</b></p>
          <GitHubCalendar username={userState.login} fullYear={false} />
        

          <form onSubmit={this.submitHandler}>
            <div className='userInput'>
              <input
                type="text"
                value={this.state.chooseUser}
                onChange={this.handleChanges}
              />
              <button onClick={this.fetchUser}>Choose a User</button>
            </div>
          </form>
        </div>

        <FollowersBlock className='followersBlock'>
          {this.state.githubFollowers.map(followers => (            
            <FInnerBlock key={followers.login} className='fInnerBlock'>
              <b>Login:</b> {followers.login}<br />
              <b>id:</b> {followers.id}<br />
              <img src={followers.avatar_url} alt={followers.avatar_url} key={followers.avatar_url} width='200' height='200' /><br />
              <b>url:</b> <a href={followers.html_url}>{followers.html_url}</a><br />
            </FInnerBlock>           
          ))}
        </FollowersBlock>
      </div>
    )
  }
}

export default App;

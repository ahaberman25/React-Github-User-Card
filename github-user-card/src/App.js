import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

// import moment date formatting
import Moment from 'moment';

// import github contribution calendar
import GitHubCalendar from 'react-github-calendar';

// import material ui components
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      githubUsers: [],
      githubFollowers: [],
      chooseUser: '',
      clickUser: 'ahaberman25',
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
        console.log("ERR: ", err)
        this.setState({ errMessage: err.message })
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

  clickUser = e => {
    e.preventDefault();
    // console.log('typing: ', this.state.chooseUser)
    this.setState({ clickUser: e.target.textContent }) 
    console.log('clicked user', this.state.clickUser)
  }

  // clickUser = e => {
  //   e.preventDefault();
  //   console.log('clicked')

  //   fetch(`https://api.github.com/users/${this.state.clickUser}`)
  //     .then(res => res.json())
  //     .then(users => {        
  //       // console.log('users: ', users)
  //       this.setState({ githubUsers: users });
  //     })
  //     .catch(err => {
  //       console.log("ERR: ", err)
  //       this.setState({ errMessage: err.message })
  //     });
      
  //   fetch(`https://api.github.com/users/${this.state.clickUser}/followers`)
  //     .then(res => res.json())
  //     .then(fusers => {        
  //       // console.log('fusers: ', fusers)
  //       this.setState({ githubFollowers: fusers });
  //     })
  //     .catch(err => {
  //       console.log('err: ', err)
  //     })
  // };

  componentDidUpdate(prev) {
      // if (this.state.clickUser !== prev.clickUser) {
      //   fetch(`https://api.github.com/users/${this.state.clickUser}`)
      //     .then(res => res.json())
      //     .then(users => {        
      //       // console.log('users: ', users)
      //       this.setState({ githubUsers: users });
      //     })
      //     .catch(err => {
      //       console.log("ERR: ", err)
      //       this.setState({ errMessage: err.message })
      //     });
          
      //   fetch(`https://api.github.com/users/${this.state.clickUser}/followers`)
      //     .then(res => res.json())
      //     .then(fusers => {        
      //       // console.log('fusers: ', fusers)
      //       this.setState({ githubFollowers: fusers });
      //     })
      //     .catch(err => {
      //       console.log('err: ', err)
      //     })
      // }
  }


  render() {
    const Title = styled.h1`
      width: 48%;
      margin: 0 auto;
    `;

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

    return (
      <div className='container'>
        { this.state.errMessage &&
          <h3 className="error"> { this.state.errMessage } </h3> }
        <Title>GITHUB USER INFORMATION CARD</Title>
        <UserCard className='userCard'>
          <UserLeft className='userLeft'>
            <img src={userState.avatar_url} alt={userState.avatar_url} key={userState.avatar_url} width='250' height='250' /><br />
          </UserLeft>
          <UserRight className='userRight'>
            <b>User:</b> {userState.login}<br />
            <b>id:</b> {userState.id}<br />          
            <b>url:</b> <a href={userState.html_url}>{userState.html_url}</a><br />
            <b>Name:</b> {userState.name}<br />
            <b>Company:</b> {userState.company}<br />
            <b>Location:</b> {userState.location}<br />
            <b># of repos:</b> {userState.public_repos}<br />
            <b># of followers:</b> {userState.followers}<br />
            <b># of following:</b> {userState.following}<br />
            <b>Bio</b>: {userState.bio}<br />
            <b>Joined:</b> {Moment(this.state.githubUsers.created_at).format('MMMM Do YYYY')}<br />
          </UserRight>
        </UserCard>

        <div className='githubContainer'>
          <p><b>Github Contributions</b></p>
          <GitHubCalendar username={userState.login} fullYear={false} />
        

          <form onSubmit={this.submitHandler}>
            <div className='userInput'>
              <TextField
                id='outlined-basic'
                type="text"
                label='enter username'
                value={this.state.chooseUser}
                onChange={this.handleChanges}
                variant="outlined"
              />
              <Button variant="outlined" color="primary" onClick={this.fetchUser} type='submit'>Submit</Button>
            </div>
          </form>
        </div>

        <FollowersBlock className='followersBlock'>
          {this.state.githubFollowers.map(followers => (         
            <Card className='userCard' key={followers.login}>
            <CardActionArea>
              <CardMedia
              component='img'
                className='userCardImage'
                height='350'
                image={followers.avatar_url}
                title={followers.login}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  user: {followers.login}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  id: {followers.id}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                <a href={followers.html_url} target='_blank'>{`Check out ${followers.login}`}</a>
              </Button>
            </CardActions>
          </Card>    
          ))}
        </FollowersBlock>
      </div>
    )
  }
}

export default App;

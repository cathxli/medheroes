import React, { Component } from 'react';
import './Avatar.css'
import { withRouter } from 'react-router-dom';

class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: "",
            username: "",
        }

        this.server = "http://localhost:5000";

        this.HEADS = {
            bunny: require('../images/heads/bunny.png'),
            cat: require('../images/heads/cat.png'),
            dinosaur: require('../images/heads/dinosaur.png'),
            dog: require('../images/heads/dog.png'),
            frog: require('../images/heads/frog.png'),
            monkey: require('../images/heads/monkey.png'),
            panda: require('../images/heads/panda.png'),
            penguin: require('../images/heads/penguin.png'),
            raccoon: require('../images/heads/raccoon.png'),
            unicorn: require('../images/heads/unicorn.png'),
        }

        this.AVATARS = {
            bunny: require('../images/avatars/bunny.png'),
            cat: require('../images/avatars/cat.png'),
            dinosaur: require('../images/avatars/dinosaur.png'),
            dog: require('../images/avatars/dog.png'),
            frog: require('../images/avatars/frog.png'),
            monkey: require('../images/avatars/monkey.png'),
            panda: require('../images/avatars/panda.png'),
            penguin: require('../images/avatars/penguin.png'),
            raccoon: require('../images/avatars/raccoon.png'),
            unicorn: require('../images/avatars/unicorn.png'),
        }

        this.getAvatar = this.getAvatar.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.goEditAvatar = this.goEditAvatar.bind(this);
    }

    goEditAvatar(){
        this.props.history.push("/edit-avatar");
      }

    //  * Renders avatars conditionally.
    //    */
    renderAvatar(atHome){
        if (this.state.avatar !== "" && typeof this.state.avatar !== 'undefined' && atHome) { // if at home, don't allow edit avatar
            var thumbnail = this.getAvatarHead(this.state.avatar); // only render head image
            return ( <img src={thumbnail} alt="thumbnail" width="120" height="120"/> );
        }
        else if (this.state.avatar !== "" && typeof this.state.avatar !== 'undefined' && !atHome) { // if at profile, allow edit avatar
            var thumbnail = this.getAvatar(this.state.avatar); // render full body image
            return(<div className="avatarWrapper"> <img src={thumbnail} alt="thumbnail" width="160" height="160" onClick ={this.goEditAvatar}/> </div> );
        }
        else { // no Avatar
            if (atHome) {
                return (<div id = "circle"> </div>);
            }
            else {
                return (<div id = "circle" onClick ={this.goAvatar}> <span>click to edit your avatar!</span></div>);
            }
            
        }
    }
    // todo: maybe change this to "location" for extensibility
    renderText(atHome) {
        if (atHome) {
            return (<div id ="username">Hello, {this.state.username}!</div>);
        } else {
            return (<div id ="username">{this.state.username}</div>)
        }
    }

     /* Accessor methods. */
    getAvatarHead (aname) {
        return this.HEADS[aname];
    }

    getAvatar (aname) {
        return this.AVATARS[aname];
    }

    getUsername(uname) {
        return this.state.username;
    }


    componentDidMount() {
        fetch(this.server + "/getAvatarUsername", {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true,
            }
          })
          .then(res => res.json())
          .then(data => {
            //   todo: should handle parsing here or in server?
            if (typeof data != 'undefined' && data !== null){
                this.setState({username: data.username, avatar: data.avatar_path});
                console.log(this.state.username, this.state.avatar);
            }
          });
    }

    render() {
        return(
            <div className = "avatar">
                {this.renderAvatar(this.props.atHome)}
                {this.renderText(this.props.atHome)}
            </div>
        );
    }
}

export default withRouter(Avatar);
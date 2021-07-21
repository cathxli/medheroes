import React, { Component } from 'react';
import './Avatar.css'

class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: "",
            username: "",
        }

        this.server = "http://localhost:5000";

        this.HEADS = {
            bunny: require('./images/heads/bunny.png'),
            cat: require('./images/heads/cat.png'),
            dinosaur: require('./images/heads/dinosaur.png'),
            dog: require('./images/heads/dog.png'),
            frog: require('./images/heads/frog.png'),
            monkey: require('./images/heads/monkey.png'),
            panda: require('./images/heads/panda.png'),
            penguin: require('./images/heads/penguin.png'),
            raccoon: require('./images/heads/raccoon.png'),
            unicorn: require('./images/heads/unicorn.png'),
          }

        this.getAvatar = this.getAvatar.bind(this);
        this.getUsername = this.getUsername.bind(this);
    }

    //  * Renders user conditionally.
    //    * If no avatar, renders an empty circle.
    //    * Else, shows their avatar.
    //    */
    renderAvatar(){
        if (this.state.avatar !== "" && typeof this.state.avatar !== 'undefined'){
        var thumbnail = this.getAvatar(this.state.avatar);
            return ( <img src={thumbnail} alt="thumbnail" width="120" height="120"/> );
        }
        else{
            return (<div id = "circle"> </div>);
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
    getAvatar(aname) {
        return this.HEADS[aname];
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
                {this.renderAvatar()}
                {this.renderText(this.props.atHome)}
            </div>
        );
    }
}

export default Avatar;
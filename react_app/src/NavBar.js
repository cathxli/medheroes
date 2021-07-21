import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './NavBar.css';
import navBarHome from "./images/navbar/iconhome.png";
import navBarProfile from "./images/navbar/iconsmile.png"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scroll: '',
            homeColor: "#000000",
            profileColor: "#000000",
        }

        this.handleScroll = this.handleScroll.bind(this);
        this.goToProfile = this.goToProfile.bind(this);
        this.goHome = this.goHome.bind(this);
    }

     /* ROUTING METHOD */
    goToProfile(event) {
        // go /profile
        this.props.history.push("/profile");
    }

    goHome(){
          // go /home
          this.props.history.push("/home");
    }

    /* Method for scrolling. */
    handleScroll() {
        this.setState({scroll: "none"});
    }

    determineColor() {
        if (this.props.atHome) {
            this.setState({homeColor: "#1871ff"});
        } else {
            this.setState({profileColor: "#1871ff"});
        }
    }

    componentDidMount() {
        this.determineColor(); // send color as props directly here ?
    }

    render() {
        return (
            <div className="navBar" style={{boxShadow: this.state.scroll}} onScroll={this.handleScroll} >
            <div className="toHome" onClick = {this.goHome}>
                <img src={navBarHome} alt="navBar-home" style={{backgroundColor: this.state.homeColor}}/>
                <p style={{color: this.state.homeColor}}>home</p>
            </div>
            <div className="toProfile" onClick = {this.goToProfile}>
                <img src={navBarProfile} alt="navBar-profile" style={{backgroundColor: this.state.profileColor}}/>
                <p style={{color: this.state.profileColor}}>me</p>
            </div>
        </div>
        )
    }
}  

export default withRouter(NavBar);
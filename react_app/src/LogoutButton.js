import React, { Component } from 'react';
import './LogoutButton.css';
import { withRouter } from 'react-router-dom';

class LogoutButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.server = "http://localhost:5000";
        this.handleLogout = this.handleLogout.bind(this);
    }


    /*
    * Handles when a user logs out.
    * Redirects to the home page once logged out.
    */
    handleLogout() {
        fetch(this.server + "/logout", {
            mode: 'cors',
            credentials: 'include',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            }
        })
            .then(res => res.text())
            .then(data => {
                if (data === "redirect"){
                    this.props.history.push("/")
                }
            });
    }

    render() {
        return (
            <div className="logout">
                <input type="submit" value="Logout" id ="submitButton" onClick ={this.handleLogout}/>
            </div>
        );
    }
}

export default withRouter(LogoutButton);
import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Medicine from './components/Medicine';
import Avatar from './components/Avatar';
import Reward from './components/Reward';
import Loading from './components/Loading';

import Button from '@material-ui/core/Button';
import Calendar from 'react-calendar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from "moment-timezone";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicine: '',
      medicine_array: [],
      open: false,

      rewards_reset: false,
      reward_img_path: "",

      completed: null,
      medicine_render: false,
      showReward: false
    }

    this.REWARDS = {
      icecream: require('./images/rewards/icecream.png'),
      baking: require('./images/rewards/baking.png'),
      ball: require('./images/rewards/ball.png'),
      beach: require('./images/rewards/beach.png'),
      bike: require('./images/rewards/bike.png'),
      book: require('./images/rewards/book.png'),
      bowling: require('./images/rewards/bowling.png'),
      card: require('./images/rewards/card.png'),
      carnival: require('./images/rewards/carnival.png'),
      chess: require('./images/rewards/chess.png'),
      clothes: require('./images/rewards/clothes.png'),
      ferris: require('./images/rewards/ferris.png'),
      fire: require('./images/rewards/fire.png'),
      game: require('./images/rewards/game.png'),
      gift: require('./images/rewards/gift.png'),
      hamburger: require('./images/rewards/hamburger.png'),
      hotdog: require('./images/rewards/hotdog.png'),
      jewelry: require('./images/rewards/jewelry.png'),
      kart: require('./images/rewards/kart.png'),
      makeup: require('./images/rewards/makeup.png'),
      movies: require('./images/rewards/movies.png'),
      paint: require('./images/rewards/paint.png'),
      picnic: require('./images/rewards/picnic.png'),
      pizza: require('./images/rewards/pizza.png'),
      puzzle: require('./images/rewards/puzzle.png'),
      shopping: require('./images/rewards/shopping.png'),
      sneakers: require('./images/rewards/sneakers.png'),
      swimming: require('./images/rewards/swimming.png'),
      teddy: require('./images/rewards/teddy.png'),
      tennis: require('./images/rewards/tennis.png')
  }

    /* dialog methods */
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleOKReward = this.handleOKReward.bind(this);
    this.handleCancelReward = this.handleCancelReward.bind(this);

    /* render and rerendering methods */
    this.renderMedicine = this.renderMedicine.bind(this);
    this.getMedList = this.getMedList.bind(this);
    this.rerenderParentCallbackReward = this.rerenderParentCallbackReward.bind(this);
    this.rerenderParentCallbackMedicine = this.rerenderParentCallbackMedicine.bind(this);
    this.rerenderParentCallbackDates = this.rerenderParentCallbackDates.bind(this);
    this.endRewardReset = this.endRewardReset.bind(this);
    this.passRewardPath = this.passRewardPath.bind(this);

    this.getRewardImage = this.getRewardImage.bind(this);

    /* state changing methods */
    this.onCheck = this.onCheck.bind(this);
    this.onChange = this.onChange.bind(this);

    //this.server = "http://ec2-18-220-220-78.us-east-2.compute.amazonaws.com:5000";
    this.server = "http://localhost:5000";
  }

  /* COMPONENT DID MOUNT
   *
   * Gets the user's medication, reward, avatar, and completed days.
   */
  componentDidMount() {
    var today = new Date()
    today.setHours(0, 0, 0, 0)
    today = moment(today).tz("America/New_York").format("YYYY/MM/DD");

    fetch(this.server + "/getMedicine?date=" + today, {
      mode: 'cors',
      credentials: 'include',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    })
    .then(res => res.json())
    .then(data => {
      var thing = []
      for (var x in data){
        thing.push(data[x].medicine);
      }

      this.setState({medicine_array: thing})
    });

    fetch(this.server + "/getCompleted", {
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

      if (data.length !== 0){
        this.setState({completed: data[0].completed_dates })
      }
      else {
        this.setState({completed: []})
      }
    });
  }

  /* STATE CHANGING METHODS */
  onChange(e) {
       this.setState({
           [e.target.name]: e.target.value
       });
   }

   onCheck(e) {
     this.setState({
         [e.target.name]: e.target.checked // true or false boolean
     });
   }

  /* DIALOG HANDLERS */
  handleCancelReward() {
    this.setState({ showReward: false });
  };

  handleOKReward() {
    this.setState({ showReward: false}); // close congrats popup
  };

  handleCancel() {
    this.setState({ open: false });
  };

  handleClickOpen(){
    this.setState({ open: true });
  };

  /* RERENDER METHODS */
  /* Show reward dialog. */
  rerenderParentCallbackReward(){
    this.setState({showReward: true});
    // ask rewards component to pull the new data (no rewards) from db and reset itself
    this.setState({rewards_reset: true});
  }

  /* Update calendar days. */
  rerenderParentCallbackDates(){
    fetch(this.server + "/getCompleted", {
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
      if (data.length !== 0){
        this.setState({completed: data[0].completed_dates })
      }
      else {
        this.setState({completed: []})
      }
    });

  }

  /* Update medicine rerender. */
  rerenderParentCallbackMedicine(){
    this.setState({medicine_render: true});
  }

  // set rewards_reset back to false so it will not infinitely get from database and infintely rerender 
  endRewardReset() {
    this.setState({rewards_reset: false});
  }

  // callback to pass reward name to congrats popup
  passRewardPath(img) {
    this.setState({reward_img_path: img})
  }

  /* Accessor for the reward images. */
    getRewardImage(name) {
      return this.REWARDS[name];
  }

  /* METHODS USED IN RENDERING */
  // helper method to render medications
  getMedList(){
    return (this.state.medicine_array.map((data, index) => {
      return (<Medicine key= {index} med={data} rerenderParentCallbackReward={this.rerenderParentCallbackReward}
        rerenderParentCallbackMedicine={this.rerenderParentCallbackMedicine}
        rerenderParentCallbackDates={this.rerenderParentCallbackDates}
        />) })
    );
  }

  /*
   * Renders medicine conditionally.
   * If no medicine listed for today, renders message.
   * Else, shows the medications that they must take today.
   */
  renderMedicine(){
    if (this.state.medicine_array.length === 0){
      return (
        <div className="med-container">
        <div className="deargod-med">
          <div className="deargod-top" id="medicationNoneTop">
            <p className="deargodTopTitle" id="med">
              My Medication
            </p>
          </div>
            <p id="notif"> You don't have any medications for today.  </p>
        </div>
        </div>
      );
    }
    else {
      return (
          <div className="med-container">
            <div className = "deargod-med">
              <div className="deargod-top" id="medicationNoneTop">
                <p className="deargodTopTitle" id="med">
                  My Medication
                </p>
              </div>
              <div className="med-displayed-innner">
                {this.getMedList()}
              </div>
            </div>
          </div>
      );
    }
  }

  render() {
      // highlights completed dates if they exist.
      // TODO fix this.state.username condition
      // if (this.state.completed === null || this.state.username === ""){
      if (this.state.completed === null){ // todo change to timeout like in Profile.js (or windows.animate for both)
        return (
          <Loading />
          );
      }
      else{
        const tileClassName = ({ date, view }) => {
         let getDate = moment(date).format("YYYY/MM/DD");

         if (this.state.completed.includes(getDate)){
           return "highlight-day";
         }
         return null;
       };
      return (
        <div className = "containerHome">
          {/* REWARD CONGRATS POPUP */}
          <Dialog
              open={this.state.showReward}
              onClose={this.handleCancelReward}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title"><div className="rewards-popup-title">{"Congrats!"}</div></DialogTitle>
                <DialogContent>
                    <div className="rewards-popup-wrapper">
                      <div className="rewards-popup">You've reached your goal and can now receive your reward of
                        <span className="bold-this"> {this.state.reward_img_path}</span>!
                      </div>
                      <div className="rewards-popup-img">
                        <img src={this.getRewardImage(this.state.reward_img_path)} alt="thumbnail of reward"/>
                      </div>
                    </div>
                </DialogContent>
              <DialogActions>
                <Button onClick={this.handleOKReward} color="primary" autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>

          <Avatar 
            atHome={true}
          />

          {this.renderMedicine()}

          <Reward 
            rewards_reset = {this.state.rewards_reset}
            endRewardReset = {this.endRewardReset}
            showEditReward = {false}
            passRewardPath = {this.passRewardPath}
          />

          {/* <History 

          /> */}
          <div className="calendar-container">
            <div className="deargod-top" id="medicationNoneTop">
              <p className="deargodTopTitle" id="med">
                My History
              </p>
            </div>
          </div>

          <Calendar
              tileClassName={tileClassName}
              locale="en"
          />

          <NavBar 
              atHome={true}
          />
      </div>
        );
    }
  }
}

export default Home;

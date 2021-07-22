import React, { Component } from 'react';
import './Profile.css';
import ChangeMedicine from './ChangeMedicine';
import NavBar from './components/NavBar';
import Avatar from './components/Avatar';
import Reward from './components/Reward';
import LogoutButton from './components/LogoutButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allMedicine: [],
      addOpen: false,
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      medicine: '',
      medDesc: '',
      reward_reset: false,   // not needed here; but a state needed in Home.js for Reward component
    }

    /* dialog methods */
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOKAdd = this.handleOKAdd.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);

    /* change methods */
    this.onCheck = this.onCheck.bind(this);
    this.onChange = this.onChange.bind(this);

    /* rerender method */
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    // not needed here; but callback function passed as props to Reward component for Home.js
    this.endRewardReset = this.endRewardReset.bind(this);

    //this.server = "http://ec2-18-220-220-78.us-east-2.compute.amazonaws.com:5000";
    this.server = "http://localhost:5000";
  }

  // not needed here; but callback function passed as props to Reward component for Home.js
  // set rewards_reset back to false so it will not infinitely get from database and infintely rerender 
  endRewardReset() {
    this.setState({rewards_reset: false});
  }

  /* Rerender profile medicine when medication is edited, deleted, or added. */
  rerenderParentCallback(){
    this.getProfileMedicine();
  }

   /* DYNAMICALLY CHANGING STATE FUNCTIONS  */
  onChange(e) {
       this.setState({
           [e.target.name]: e.target.value
       });
   }

   onCheck(e) {
     this.setState({
         [e.target.name]: e.target.checked
     });
   }

   /* DIALOG FUNCTIONS */
   handleCancel() {
     this.setState({ addOpen: false });
   };

   handleClickOpen(){
     this.setState({ addOpen: true });
   };

   /* Method for adding a new medication. */
   handleOKAdd(){
     fetch(this.server + "/addMedicine", {
         mode: 'cors',
         credentials: 'include',
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Access-Control-Allow-Credentials': true,
         },
           body: JSON.stringify({
             medicine: this.state.medicine,
             medDesc: this.state.medDesc,
             sunday: this.state.sunday,
             monday: this.state.monday,
             tuesday: this.state.tuesday,
             wednesday: this.state.wednesday,
             thursday: this.state.thursday,
             friday: this.state.friday,
             saturday: this.state.saturday
           })
         })
         .then(res => res.text())
         .then(data => {
           this.getProfileMedicine();

           this.setState({medicine: '', medDesc: '',
           sunday: false, monday:false, tuesday: false, wednesday:false, thursday:false, friday:false, saturday:false,
           addOpen: false})
         });
   }

  /* COMPONENT DID MOUNT
   *
   * Gets the medicines, avatars, and rewards for the user.
   */
  componentDidMount(){
    fetch(this.server + "/getProfileMedicine", {
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
      this.setState({allMedicine: data})
    });
  }

  /*
   * Fetches all medicines associated with the user from the database.
   */
  getProfileMedicine(){
    fetch(this.server + "/getProfileMedicine", {
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
      this.setState({allMedicine: data})
    });
  }

  /* RENDER METHODS */
  // helper method to render medications.
  getMedList(){
    return (this.state.allMedicine.map((data, index) => {
      return (<ChangeMedicine key= {index} med={data.medicine} desc={data.description}
              sunday={data.sunday} monday={data.monday} tuesday={data.tuesday}
              wednesday={data.wednesday} thursday={data.thursday} friday={data.friday}
              saturday={data.saturday}
              rerenderParentCallback={this.rerenderParentCallback}/>) })
      );
  }

  /*
   * Renders medication conditionally.
   * If no medication associated with the user, displays a message.
   * Else, shows the medications that the user has.
   */
  renderAllMedicine(){
    if (this.state.allMedicine.length === 0){
      return (
        <div className = "med-container">
          <div className = "deargod-med">
            <div className="deargod-top" id="medicationNoneTop">
              <p className="deargodTopTitle" id="med">
                My Medication
              </p>
            </div>
            <p id="notif"> There is no medication currently linked to your account. </p>
            <Button id = "editbutton" variant="outlined" onClick ={this.handleClickOpen}>
              + Add medications
            </Button>
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

            {this.getMedList()}

            <Button id = "editbutton" variant="outlined" onClick ={this.handleClickOpen}>
              + Add medications
            </Button>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className = "containerProfile">
        <Dialog
          open={this.state.addOpen}
          onClose={this.handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Add medication"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter the following information.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                label="Medication"
                name="medicine"
                value={this.state.medicine} onChange={this.onChange}
                fullWidth
              />
              <TextField
                  autoFocus
                  margin="dense"
                  label="Description"
                  name="medDesc"
                  value={this.state.medDesc} onChange={this.onChange}
                  fullWidth
                />
                <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                          checked={this.state.sunday}
                          onChange={this.onCheck}
                          name="sunday"
                          />
                        }
                        label="Sunday"/>
                      <FormControlLabel
                        control={
                          <Checkbox
                          checked={this.state.monday}
                          onChange={this.onCheck}
                          name="monday"
                          />
                        }
                        label="Monday"/>
                      <FormControlLabel
                        control={
                          <Checkbox
                          checked={this.state.tuesday}
                          onChange={this.onCheck}
                          name="tuesday"
                          />
                        }
                        label="Tuesday"/>
                      <FormControlLabel
                        control={
                          <Checkbox
                          checked={this.state.wednesday}
                          onChange={this.onCheck}
                          name="wednesday"
                          />
                        }
                        label="Wednesday"/>
                      <FormControlLabel
                        control={
                          <Checkbox
                          checked={this.state.thursday}
                          onChange={this.onCheck}
                          name="thursday"
                          />
                        }
                        label="Thursday"/>
                      <FormControlLabel
                        control={
                          <Checkbox
                          checked={this.state.friday}
                          onChange={this.onCheck}
                          name="friday"
                          />
                        }
                        label="Friday"/>
                      <FormControlLabel
                        control={
                          <Checkbox
                          checked={this.state.saturday}
                          onChange={this.onCheck}
                          name="saturday"
                          />
                        }
                        label="Saturday"/>
              </FormGroup>
          </DialogContent>
          <div className="popup-button-wrapper">
            <DialogActions>
              <Button onClick={this.handleCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleOKAdd} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </div>
        </Dialog>

        <Avatar 
          isHome = {false}
        />

        {this.renderAllMedicine()}

        <Reward 
          rewards_reset = {this.state.reward_reset}
          endRewardReset = {this.endRewardReset}
          showEditReward = {true}   
        />

        <LogoutButton />

        <NavBar 
          atHome={false}
        />

      </div>
    );
  }
}

export default Profile;

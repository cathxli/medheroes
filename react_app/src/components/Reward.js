import React, { Component } from 'react';
import './Reward.css';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

class Reward extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reward_array: [],
            reward_image: "",
        }

        this.REWARDS = {
            icecream: require('../images/rewards/icecream.png'),
            baking: require('../images/rewards/baking.png'),
            ball: require('../images/rewards/ball.png'),
            beach: require('../images/rewards/beach.png'),
            bike: require('../images/rewards/bike.png'),
            book: require('../images/rewards/book.png'),
            bowling: require('../images/rewards/bowling.png'),
            card: require('../images/rewards/card.png'),
            carnival: require('../images/rewards/carnival.png'),
            chess: require('../images/rewards/chess.png'),
            clothes: require('../images/rewards/clothes.png'),
            ferris: require('../images/rewards/ferris.png'),
            fire: require('../images/rewards/fire.png'),
            game: require('../images/rewards/game.png'),
            gift: require('../images/rewards/gift.png'),
            hamburger: require('../images/rewards/hamburger.png'),
            hotdog: require('../images/rewards/hotdog.png'),
            jewelry: require('../images/rewards/jewelry.png'),
            kart: require('../images/rewards/kart.png'),
            makeup: require('../images/rewards/makeup.png'),
            movies: require('../images/rewards/movies.png'),
            paint: require('../images/rewards/paint.png'),
            picnic: require('../images/rewards/picnic.png'),
            pizza: require('../images/rewards/pizza.png'),
            puzzle: require('../images/rewards/puzzle.png'),
            shopping: require('../images/rewards/shopping.png'),
            sneakers: require('../images/rewards/sneakers.png'),
            swimming: require('../images/rewards/swimming.png'),
            teddy: require('../images/rewards/teddy.png'),
            tennis: require('../images/rewards/tennis.png')
        }

        this.server = "http://localhost:5000";
        this.renderReward = this.renderReward.bind(this);
        this.getRewardImage = this.getRewardImage.bind(this);
        this.goReward = this.goReward.bind(this);
    }

    goReward(){
        // go /reward
        this.props.history.push("/edit-reward");
      }

    /*
    * Renders reward conditionally.
    * If no reward associated with the user, renders a message.
    * Else, shows the reward associated with the user.
    */
    renderReward(){
        if (this.state.reward_array.length === 0 && !this.props.showEditReward){ // Home page
        return (
            <div className="rewards-container">
                <div className = "deargod-rewards" id="rewardsNone">
                <div className="deargod-top" id="medicationNoneTop">
                <p className="deargodTopTitle" id="med">
                    Current Reward
                </p>
                </div>
                    <p id="notif"> You don't have any ongoing rewards.</p>
                </div>
            </div>
            );
        }
        else if (this.state.reward_array.length === 0 && this.props.showEditReward) { // Profile page
            return (
                <div className = "rewards-container">
                  <div className = "deargod-rewards" id="rewardsNone">
                    <div className="deargod-top">
                      <p className="deargodTopTitle">
                        My Current Reward
                      </p>
                    </div>
                      <p id="notif"> You don't have any ongoing rewards.</p>
                      <Button id = "editbutton" variant="outlined" onClick = {this.goReward}>
                        + Create a new reward
                      </Button>
                  </div>
                </div>
              );
        }
        else {
            var thumbnail = this.getRewardImage(this.state.reward_array.img_path);
            return (
                <div className="rewards-container">

                <div className = "deargod-rewards">
                    <div className="deargod-top">
                    <p className="deargodTopTitle">
                        My Reward
                    </p>
                    </div>

                    <div className = "rewards-home-inner">
                    <img src={thumbnail} alt="thumbnail of reward" width="60" height="60"/>
                    <div className = "rewards-home-info">
                        <p>You have <span>{this.state.reward_array.goalCount - this.state.reward_array.actualCount} </span> day(s) left until
                        you reach your reward for <span> {this.state.reward_array.img_path}</span>!
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            );
        }
    }

    ifReset() {
        if (this.props.rewards_reset) { // if rewards has been reset
            this.getReward(); // check database and pull updated value
        }
    }

    getReward() {
        fetch(this.server + "/getReward", {
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
            if (typeof data[0] != 'undefined'){ // if there is a reward stored
                this.setState({reward_array: data[0], reward_image: data[0].img_path })
                console.log("hello h")
            } else {
                // there is no reward 
                // make sure reward_array is empty. 
                // if db returns undefined then there is no reward stored for this user. if the reward was just reached, reward_array 
                // has been filled since rendering and has not been emptied yet to reflect db change.
                this.setState({reward_array: []});
                // after resetting this, toggle this.props.rewards_reset to false so it doesn't keep on firing
                this.props.endRewardReset();
            }
          });
    }

    /* Accessor for the reward images. */
    getRewardImage(name) {
        return this.REWARDS[name];
    }

    componentDidMount() {
        this.getReward();
    }

    render() {
        if (this.props.rewards_reset) {
            this.getReward();
        }
        return(
            <div>
                {this.renderReward()}
            </div> 
        );
    }
}

export default withRouter(Reward);
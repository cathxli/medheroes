import React, { Component } from 'react';
import './Loading.css'
import { BarLoader } from 'react-spinners';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className = "loading-container">
                <BarLoader sizeUnit={"px"} width ={200} height={8} size={500} color={'#01c13b'} />
                <div className="loading-text">Loading... </div>
            </div>
        );
    }
}

export default Loading;
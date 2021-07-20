import React, { Component } from "react";
import { Fragment } from "react";
import ChannelForm from "./ChannelForm";
import VideoCall from "./VideoCall"

class EnterCall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: ''
        }
    }

    selectChannel = channel => {
        this.setState({ channel });
    };

    render() {
        return (
            <Fragment>
            <div>
                <VideoCall channel={this.state.channel} />
                <ChannelForm selectChannel={this.selectChannel} />
            </div>
            </Fragment>
        );
    }
}

export default EnterCall;
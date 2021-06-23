import React, { Component } from "react";
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
            <div>
                <VideoCall channel={this.state.channel} />
                <ChannelForm selectChannel={this.selectChannel} />
            </div>
        );
    }
}

export default EnterCall;
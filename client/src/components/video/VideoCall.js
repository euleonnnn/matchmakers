import React, { Fragment, Component } from "react";
import AgoraRTC from "agora-rtc-sdk";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

let client = AgoraRTC.createClient({ mode: "live", codec: "h264" });

const USER_ID = Math.floor(Math.random() * 1000000001);

class Call extends Component {

  handleClick = () => {
    this.props.history.push("/all-games");
  }

  localStream = AgoraRTC.createStream({
    streamID: USER_ID,
    audio: true,
    video: true,
    screen: false
  });

  componentDidMount() {
    this.initLocalStream();
    this.initClient();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.channel !== this.props.channel && this.props.channel !== "") {
      this.joinChannel();
    }
  }

  initLocalStream = () => {
    let me = this;
    me.localStream.init(
      function () {
        console.log("getUserMedia successfully");
        me.localStream.play("agora_local");
      },
      function (err) {
        console.log("getUserMedia failed", err);
      }
    );
  };

  initClient = () => {
    client.init(
      "1eb6cb9def814e4e96ac6afc003a47b0",
      function () {
        console.log("AgoraRTC client initialized");
      },
      function (err) {
        console.log("AgoraRTC client init failed", err);
      }
    );
    this.subscribeToClient();
  };

  subscribeToClient = () => {
    let me = this;
    client.on("stream-added", me.onStreamAdded);
    client.on("stream-subscribed", me.onRemoteClientAdded);
    client.on("stream-removed", me.onStreamRemoved);
    client.on("peer-leave", me.onPeerLeave);
  };

  state = {
    remoteStreams: {}
  }

  onStreamAdded = evt => {
    let me = this;
    let stream = evt.stream;
    console.log("New stream added: " + stream.getId());
    me.setState(
      {
        remoteStreams: {
          ...me.state.remoteStream,
          [stream.getId()]: stream
        }
      },
      () => {
        client.subscribe(stream, function (err) {
          console.log("Subscribe stream failed", err);
        });
      }
    );
  };

  joinChannel = () => {
    let me = this;
    client.join(
      "0061eb6cb9def814e4e96ac6afc003a47b0IABNO5Pc/tU7NUtvmSzKVcpK5niBKwXzKGqh0cdORN+LLA29DrUAAAAAEACqPfBqaGniYAEAAQBqaeJg",
      me.props.channel,
      USER_ID,
      function (uid) {
        console.log("User " + uid + " join channel successfully");
        client.publish(me.localStream, function (err) {
          console.log("Publish local stream error: " + err);
        });

        client.on("stream-published", function (evt) {
          console.log("Publish local stream successfully");
        });
      },
      function (err) {
        console.log("Join channel failed", err);
      }
    );
  };

  leaveChannel = () => {
    client.leave();
    this.handleClick();
  }

  onRemoteClientAdded = evt => {
    let me = this;
    let remoteStream = evt.stream;
    me.state.remoteStreams[remoteStream.getId()].play(
      "agora_remote " + remoteStream.getId()
    );
  };

  onStreamRemoved = evt => {
    let me = this;
    let stream = evt.stream;
    if (stream) {
      let streamId = stream.getId();
      let { remoteStreams } = me.state;

      stream.stop();
      delete remoteStreams[streamId];

      me.setState({ remoteStreams });

      console.log("Remote stream is removed " + stream.getId());
    }
  };

  onPeerLeave = evt => {
    let me = this;
    let stream = evt.stream;
    if (stream) {
      let streamId = stream.getId();
      let { remoteStreams } = me.state;

      stream.stop();
      delete remoteStreams[streamId];

      me.setState({ remoteStreams });

      console.log("Remote stream is removed " + stream.getId());
    }
  };


  render() {
    return (
      <Fragment>
      <div className ="row my-btm">
        <div className="card col-sm-4 col-md-4" style={{ width: "400px", height: "400px" }}>
          <div id="agora_local" style={{ width: "300px", height: "400px" }} />
          <div class="card-body">
            <h5 class="card-title">{this.props.auth.user.name} (Me) </h5>
          </div>
        </div>
        {Object.keys(this.state.remoteStreams).map(key => {
          let stream = this.state.remoteStreams[key];
          let streamId = stream.getId();
          return (
            <Fragment>
            <div className="card col-sm-4 col-md-4" style={{ width: "400px", height: "400px" }}>
              <div 
                key={streamId}
                id={`agora_remote ${streamId}`}
                style={{ width: "300px", height: "400px" }}
              />
            </div>
            </Fragment>
          );
        })}
      </div>
      <button type="button" className="btn btn-primary btn-full" onClick={() => this.leaveChannel()}> Leave </button>
      </Fragment>

    );
  }
}


function mapStateToProps(state){
  return {
      auth: state.auth,
  }
}

export default connect(mapStateToProps)(withRouter(Call));

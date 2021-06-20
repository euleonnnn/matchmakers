import React, { Component } from "react";
import AgoraRTC from "agora-rtc-sdk";
let client = AgoraRTC.createClient({ mode: "live", codec: "h264" });

const USER_ID = Math.floor(Math.random() * 1000000001);

export default class Call extends Component {
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
      function() {
        console.log("getUserMedia successfully");
        me.localStream.play("agora_local");
      },
      function(err) {
        console.log("getUserMedia failed", err);
      }
    );
  };

  initClient = () => {
    client.init(
      "b231fb03c517418e9a0d4668c05592ed",
      function() {
        console.log("AgoraRTC client initialized");
      },
      function(err) {
        console.log("AgoraRTC client init failed", err);
      }
    );
    this.subscribeToClient();
  };

  subscribeToClient = () => {
    let me = this;
    client.on("stream-added", me.onStreamAdded);
    client.on("stream-subscribed", me.onRemoteClientAdded);
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
        client.subscribe(stream, function(err) {
          console.log("Subscribe stream failed", err);
        });
      }
    );
  };

  joinChannel = () => {
    let me = this;
    client.join(
      "0061eb6cb9def814e4e96ac6afc003a47b0IACZ25WcljhS8TJINRd2Divqqj49ZQJBWyrgPrj9wx+7bred2P0AAAAAEACX33iMxzLQYAEAAQDHMtBg",
      me.props.channel,
      USER_ID,
      function(uid) {
        console.log("User " + uid + " join channel successfully");
        client.publish(me.localStream, function(err) {
          console.log("Publish local stream error: " + err);
        });

        client.on("stream-published", function(evt) {
          console.log("Publish local stream successfully");
        });
      },
      function(err) {
        console.log("Join channel failed", err);
      }
    );
  };

  onRemoteClientAdded = evt => {
    let me = this;
    let remoteStream = evt.stream;
    me.state.remoteStreams[remoteStream.getId()].play(
      "agora_remote " + remoteStream.getId()
    );
  };


  render() {
    return (
      <div>
        <div id="agora_local" style={{ width: "400px", height: "400px" }} />
        {Object.keys(this.state.remoteStreams).map(key => {
          let stream = this.state.remoteStreams[key];
          let streamId = stream.getId();
          return (
            <div
              key={streamId}
              id={`agora_remote ${streamId}`}
              style={{ width: "400px", height: "400px" }}
            />
          );
        })}
      </div>
    );
  }
}

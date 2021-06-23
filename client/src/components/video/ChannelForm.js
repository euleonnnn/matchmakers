import React, { Component, Fragment } from "react";


export default class ChannelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: ""
    };
  }

  onChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.selectChannel("Matchmaker");
  };

  render() {
    return (
      <Fragment>
        <div className="my-top">
          <form onSubmit={this.onSubmit}>
            <label> Channel Name </label> {' '}
            <input
              placeholder="Channel Name"
              name="channel"
              value={this.state.channel}
              onChange={this.onChange}
            />
            <input type="submit" value="Join Channel" className="btn btn-primary my-left" />
          </form>
          <p>Please type in Matchmaker1 as the Channel Name</p>

        </div>
      </Fragment>
    );
  }
}
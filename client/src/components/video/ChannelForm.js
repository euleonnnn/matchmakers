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
        <div className="my-btm">
          <form onSubmit={this.onSubmit}>
            <input type="submit" value="Join Channel" className="btn btn-success btn-full" />
          </form>

        </div>
      </Fragment>
    );
  }
}
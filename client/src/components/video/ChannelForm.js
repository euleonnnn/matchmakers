import React, { Component, Fragment } from "react";


export default class ChannelForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      channel: "",
      click: true
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

  click = () => {
    this.state.click = false
  }

  render() {
    return (
      <Fragment>
        <div className="my-btm">
          <form onSubmit={this.onSubmit}>
            {this.state.click ? <input type="submit" value="Join Call" onClick={this.click()} className="btn btn-success btn-full" /> 
            : this.state.click === false && <button type="button" class="btn btn-secondary btn-full" disabled>Joined Call</button>}
          </form>

        </div>
      </Fragment>
    );
  }
}
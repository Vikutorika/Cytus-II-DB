import React, { Component } from "react";
import { checkUUID, i18n } from "../../utils";

export default class Login extends Component {
  state = { uuid: localStorage.uuid, color: "inherit" };
  timer = null;

  login() {
    localStorage.uuid = this.state.uuid;
    if (checkUUID()) {
      this.setState({ color: "lawngreen" });
      this.refs.success.play();
      this.timer = setTimeout(this.props.callback.bind(this), 2000);
    } else {
      this.setState({ color: "red" });
      this.refs.failed.play();
    }
  }

  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }

  setUUID(event) {
    this.setState({ uuid: event.target.value });
  }

  render() {
    return (
      <div className="Login">
        <div className="Login-Label">{i18n(["Username", "用户名"])}</div>
        <input className="Login-Input" type="text" value="Ivy" disabled />
        <div className="Login-Label">{i18n(["UUID", "机体编号"])}</div>
        <input
          className="Login-Input"
          type="text"
          value={this.state.uuid}
          onChange={this.setUUID.bind(this)}
          style={{ color: this.state.color }}
          onKeyUp={this.onKeyUp.bind(this)}
        />
        <button className="Login-Button" onClick={() => this.login()}>
          {i18n(["Login", "登录"])}
        </button>
        <audio
          ref="success"
          src="audios/sounds/Password_Pass.mp3"
          preload="true"
          onEnded={this.props.callback.bind(this)}></audio>
        <audio
          ref="failed"
          src="audios/sounds/Password_Fail.mp3"
          preload="true"></audio>
      </div>
    );
  }
}

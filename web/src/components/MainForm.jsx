import React, { Component } from "react";

import { checkUUID } from "../utils";

import Header from "./common/Header";

import OS from "./views/OS";
import DB from "./views/DB";
import IM from "./views/iM";
import Home from "./views/Home";
import Login from "./views/Login";

export default class MainForm extends Component {
  state = {
    route: "Login",

    imlist: true,
    sidebar: true,
    timeline: false,
    lang: localStorage.lang,

    cmode: false,
    cback: false,
    csidebar: false
  };

  componentDidMount() {
    this.open(this.props.route);
  }

  open(page) {
    if (page === this.state.route) return;

    if (window._czc)
      window._czc.push(["_trackPageview", "/" + page, "/" + this.state.route]);

    if (checkUUID())
      switch (page) {
        case "OS":
          this.setState({
            route: "OS",
            cmode: true,
            csidebar: true,
            cback: false,
            imlist: true,
            sidebar: true
          });
          break;
        case "DB":
          this.setState({
            route: "DB",
            cmode: false,
            csidebar: true,
            cback: false,
            imlist: true,
            sidebar: true
          });
          break;
        case "iM":
          this.setState({
            route: "iM",
            cmode: false,
            csidebar: false,
            cback: true,
            imlist: true,
            sidebar: true
          });
          break;
        default:
          this.setState({
            route: "Home",
            cmode: false,
            csidebar: false,
            cback: false,
            imlist: true,
            sidebar: true
          });
          break;
      }
    else this.open("Login");
  }

  back() {
    this.setState({ imlist: true });
  }

  onPost() {
    this.setState({ imlist: false });
  }

  setLang(lang) {
    localStorage.lang = lang;
    this.setState({ lang: lang });
  }

  setMode(mode) {
    this.setState({ timeline: mode });
  }

  toggleSidebar() {
    this.setState({ sidebar: !this.state.sidebar });
  }

  render() {
    return (
      <div className="App">
        <div className="MainForm">
          <Header
            title={this.state.route}
            lang={this.setLang.bind(this)}
            mode={this.state.cmode && this.setMode.bind(this)}
            sidebar={this.state.csidebar && this.toggleSidebar.bind(this)}
            back={
              this.state.cback && !this.state.imlist && this.back.bind(this)
            }
          />

          <div className="MainForm-Content">
            {this.state.route === "iM" && (
              <IM
                imlist={this.state.imlist}
                onPost={this.onPost.bind(this)}
                lang={this.state.lang}
              />
            )}
            {this.state.route === "OS" && (
              <OS
                timeline={this.state.timeline}
                sidebar={this.state.sidebar}
                toggleSidebar={this.toggleSidebar.bind(this)}
                lang={this.state.lang}
              />
            )}
            {this.state.route === "DB" && (
              <DB
                sidebar={this.state.sidebar}
                toggleSidebar={this.toggleSidebar.bind(this)}
                lang={this.state.lang}
              />
            )}

            {this.state.route === "Home" && (
              <Home callback={this.open.bind(this)} />
            )}
            {this.state.route === "Login" && (
              <Login callback={() => this.open(this.props.route)} />
            )}
          </div>
        </div>

        <div className="Footer">
          <div className="Footer-Leftbar">
            <button onClick={() => this.open("iM")}>iM</button>
            &nbsp;&middot;&nbsp;
            <button onClick={() => this.open("OS")}>OS</button>
            &nbsp;&middot;&nbsp;
            <button onClick={() => this.open("DB")}>DB</button>
          </div>
          <div className="Footer-Rightbar">
            <button onClick={() => this.open("Home")}>Cytus II DB</button>
          </div>
        </div>
      </div>
    );
  }
}

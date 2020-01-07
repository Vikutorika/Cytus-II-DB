import React, { Component } from "react";

import { i18n } from "../../utils";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-Info">
          {i18n(["Version Code", "软件版本"])}: {localStorage.version}<br />
          {i18n(["Username", "用户名"])}: Ivy <br />
          {i18n(["User Group", "用户组"])}: Constructor <br />
          {i18n(["[Access Granted]", "[访问允许]"])} <br />
        </div>
        <div className="Home-Body">
          {i18n([
            "Hello, Ivy. Welcome to Cytus II DB built by A.R.C.",
            "你好, Ivy, 欢迎使用 A.R.C. 建设的 Cytus II DB 知识库"
          ])}
          <br />
          {i18n([
            "This database is only for study. Many functions are in beta test.",
            "本知识库仅供测试、研究、学习使用，许多功能尚待完善"
          ])}
          <br />
          {i18n([
            "Donate here to support this database:",
            "通过此链接可以支援本数据库运营:"
          ])}
          &nbsp;
          <a href="https://afdian.net/@dtsdao">{i18n(["afdian", "爱发电"])}</a>
          <br />
          {i18n([
            "Click buttons below to access certain module",
            "请在下方选择您要使用的模块"
          ])}
          :
        </div>
        <div className="Home-Buttons">
          <div
            className="Home-Button"
            onClick={() => this.props.callback("iM")}>
            <img src="./images/buttons/btn_im.png" alt="iM" />
            iM
          </div>
          <div
            className="Home-Button"
            onClick={() => this.props.callback("OS")}>
            <img src="./images/buttons/btn_os.png" alt="OS" />
            OS
          </div>
          <div
            className="Home-Button"
            onClick={() => this.props.callback("DB")}>
            <img src="./images/buttons/btn_gallery.png" alt="DB" />
            DB
          </div>
        </div>
      </div>
    );
  }
}

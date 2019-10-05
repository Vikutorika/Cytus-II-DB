import React, { Component } from "react";

import { FaList, FaChevronLeft, FaCaretDown } from "react-icons/fa";

import { i18n } from "../../utils";

class BarItem extends Component {
  state = { lang: localStorage.lang };

  optionsTrigger() {
    if (this.refs.Options.className === "MainForm-Header-Options") {
      if (document.onclick) document.onclick.call();
      this.refs.Options.className =
        "MainForm-Header-Options MainForm-Header-Options-Unfold";
      document.onclick = this.optionsTrigger.bind(this);
    } else {
      this.refs.Options.className = "MainForm-Header-Options";
      document.onclick = null;
    }
  }

  render() {
    let item = this.props.item;
    switch (item.type) {
      case "button":
        return (
          <button
            className="MainForm-Header-Button"
            onClick={item.callback || null}>
            {i18n(item.title)}
          </button>
        );
      case "options":
        return (
          <div ref="Options" className="MainForm-Header-Options">
            <div
              className="MainForm-Header-Options-Title"
              onClick={this.optionsTrigger.bind(this)}>
              {i18n(item.title)}
              <FaCaretDown />
            </div>
            {item.options.map(option => (
              <div
                className="MainForm-Header-Options-Item"
                onClick={option.callback || null}
                key={option.key}>
                {i18n(option.title)}
              </div>
            ))}
          </div>
        );
      default:
        return "";
    }
  }
}

export default class Header extends Component {
  buttonSidebar = {
    key: "buttonSidebar",
    type: "button",
    title: <FaList />,
    callback: () => this.props.sidebar()
  };

  buttonBack = {
    key: "buttonBack",
    type: "button",
    title: <FaChevronLeft />,
    callback: () => this.props.back()
  };

  optionsLang = {
    key: "lang",
    type: "options",
    title: ["Lang", "语言"],
    options: [
      {
        key: "lang_en",
        title: ["English", "英文"],
        callback: () => this.props.lang("en")
      },
      {
        key: "lang_zh",
        title: ["Chinese", "中文"],
        callback: () => this.props.lang("zh_CN")
      }
    ]
  };

  optionsMode = {
    key: "mode",
    type: "options",
    title: ["Mode", "显示方式"],
    options: [
      {
        key: "mode_chara",
        title: ["Character", "角色"],
        callback: () => this.props.mode(false)
      },
      {
        key: "mode_time",
        title: ["Timeline", "时间线"],
        callback: () => this.props.mode(true)
      }
    ]
  };

  render() {
    return (
      <div className="MainForm-Header">
        <div className="MainForm-Header-Leftbar">
          {this.props.sidebar && <BarItem item={this.buttonSidebar} />}
          {this.props.back && <BarItem item={this.buttonBack} />}
        </div>

        <div className="MainForm-Header-Title">{this.props.title}</div>

        <div className="MainForm-Header-Rightbar">
          <BarItem item={this.optionsLang} />
          {this.props.mode && <BarItem item={this.optionsMode} />}
        </div>
      </div>
    );
  }
}

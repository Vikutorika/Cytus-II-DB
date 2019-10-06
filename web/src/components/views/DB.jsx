import React, { Component } from "react";

import { i18n } from "../../utils";

import { FaCaretRight, FaCaretDown } from "react-icons/fa";

import ReactAplayer from "react-aplayer";
import DPlayer from "react-dplayer";

export default class OS extends Component {
  state = {
    data: null,
    show: {},
    folders: null
  };

  music = null;

  componentDidMount() {
    fetch("data/dblist.json").then(res => {
      res.json().then(data => this.setState({ folders: data }));
    });
  }

  componentWillUnmount() {
    if (this.music) this.music.destroy();
  }

  toggleFolder(id) {
    //Calculate New List
    const cal = (show, id) => {
      show[id] = !show[id];
      return show;
    };

    //Update
    this.setState({ show: cal(this.state.show, id) });
  }

  open(item) {
    //Destroy Music Player
    if (this.music) this.music.pause();

    //Sidebar
    if (window.outerWidth < 767) this.props.toggleSidebar();

    //Update
    this.setState({ data: item });
  }

  getContent() {
    switch (this.state.data.type) {
      case 1:
        return (
          <>
            <div className="OS-Content-Text">
              {i18n(["File Name: ", "文件名: "]) + this.state.data.title}
              <br />
              <a download href={`./videos/${this.state.data.name}.mp4`}>
                {i18n(["Download", "下载"])}
              </a>
            </div>
            <div className="OS-Content-Video">
              <DPlayer
                options={{
                  video: {
                    url: `./videos/${this.state.data.name}.mp4`
                  },
                  subtitle: {
                    url: `./data/subtitles/${this.state.data.name}.${this.props.lang}.vtt`
                  }
                }}
                key={this.state.data.name + this.props.lang}></DPlayer>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="OS-Content-Text">
              {i18n(["File Name: ", "文件名: "]) + this.state.data.title}
              <br />
              <a download href={`./audios/story/${this.state.data.name}.mp3`}>
                {i18n(["Download", "下载"])}
              </a>
            </div>
            <div className="OS-Content-Audio">
              <ReactAplayer
                theme="#2d303a"
                volume={0.7}
                audio={{
                  name: this.state.data.title,
                  artist: this.state.data.name,
                  url: `./audios/story/${this.state.data.name}.mp3`
                }}
                mutex={true}
                onInit={ap => (this.music = ap)}
                key={this.state.data.name}></ReactAplayer>
            </div>
          </>
        );
      case 3:
        return (
          <iframe
            src={`${this.state.data.dir}/${this.state.data.name}.html`}
            frameBorder="0"
            title={this.state.data.name}
            height="100%"
            width="100%">
            Your browser doesn't support iframe tag!
          </iframe>
        );
      case 4:
        return (
          <>
            <div className="OS-Content-Text">
              {i18n(["File Name: ", "文件名: "]) + this.state.data.title}
              <br />
              <a
                download
                href={`${this.state.data.dir}/${this.state.data.name}.mp3`}>
                {i18n(["Download", "下载"])}
              </a>
            </div>
            <div className="OS-Content-Audio">
              <ReactAplayer
                theme="#2d303a"
                volume={0.7}
                audio={{
                  name: this.state.data.title,
                  artist: this.state.data.name,
                  url: `${this.state.data.dir}/${this.state.data.name}.mp3`
                }}
                mutex={true}
                onInit={ap => (this.music = ap)}
                key={this.state.data.name}></ReactAplayer>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <div className="OS-Content-Text">
              {i18n(["File Name: ", "文件名: "]) + this.state.data.title}
              <br />
              <a
                download
                href={`${this.state.data.dir}/${this.state.data.name}.mp4`}>
                {i18n(["Download", "下载"])}
              </a>
            </div>
            <div className="OS-Content-Video">
              <DPlayer
                options={{
                  video: {
                    url: `${this.state.data.dir}/${this.state.data.name}.mp4`
                  }
                }}
                key={this.state.data.name + this.props.lang}></DPlayer>
            </div>
          </>
        );
      default:
        return "";
    }
  }

  render() {
    return (
      <div className="OS">
        <div
          className={this.props.sidebar ? "OS-Sidebar" : "Hidden OS-Sidebar"}>
          {this.state.folders &&
            this.state.folders.map(data => (
              <div className="OS-Sidebar-Folder" key={"folder_" + data.name}>
                <div
                  className="OS-Sidebar-Folder-Title"
                  onClick={() => this.toggleFolder(data.name)}>
                  {data.name}
                  {this.state.show[data.name] ? (
                    <FaCaretDown />
                  ) : (
                    <FaCaretRight />
                  )}
                </div>
                {this.state.show[data.name] &&
                  data.files.map((item, index) => (
                    <div
                      className={
                        this.state.data && this.state.data.name === item.name
                          ? "OS-Sidebar-Folder-Active OS-Sidebar-Folder-Item"
                          : "OS-Sidebar-Folder-Item"
                      }
                      key={"folder_" + data.title + index}
                      onClick={() => this.open(item)}>
                      {item.title}
                    </div>
                  ))}
              </div>
            ))}
        </div>
        <div className={this.props.sidebar ? "OS-Content" : "Full OS-Content"}>
          {this.state.data && this.getContent()}
        </div>
      </div>
    );
  }
}

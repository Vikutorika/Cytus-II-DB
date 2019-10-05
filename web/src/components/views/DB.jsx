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

    //Sidebar
    if (window.outerWidth < 767) this.props.toggleSidebar();
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

    //Update
    this.setState({ data: item });
  }

  render() {
    return (
      <div className="OS">
        <div
          className={this.props.sidebar ? "OS-Sidebar" : "Hidden OS-Sidebar"}>
          {this.state.folders &&
            this.state.folders.map(data => (
              <div className="OS-Sidebar-Folder" key={`folder_${data.name}`}>
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
                      key={data.title + index}
                      onClick={() => this.open(item)}>
                      {item.title}
                    </div>
                  ))}
              </div>
            ))}
        </div>
        <div className={this.props.sidebar ? "OS-Content" : "Full OS-Content"}>
          {this.state.data && this.state.data.type === 1 && (
            <>
              <div className="OS-Content-Text">
                {i18n(["File Name: ", "文件名: "]) + this.state.data.title}
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
          )}
          {this.state.data && this.state.data.type === 2 && (
            <>
              <div className="OS-Content-Text">
                {i18n(["File Name: ", "文件名: "]) + this.state.data.title}
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
          )}
          {this.state.data && this.state.data.type === 3 && (
            <>
              <div className="OS-Content-Text">
                {i18n(["File Name: ", "文件名: "]) + this.state.data.title}
              </div>
              <div className="OS-Content-Audio">
                <ReactAplayer
                  theme="#2d303a"
                  volume={0.7}
                  audio={{
                    name: this.state.data.title,
                    artist: this.state.data.name,
                    url: `./audios/extra/${this.state.data.name}.mp3`
                  }}
                  mutex={true}
                  onInit={ap => (this.music = ap)}
                  key={this.state.data.name}></ReactAplayer>
              </div>
            </>
          )}
          {this.state.data && this.state.data.type === 4 && (
            <iframe
              src={`./extra/${this.state.data.name}.html`}
              frameborder="0"
              title={this.state.data.name}>
              Your browser doesn't support iframe tag!
            </iframe>
          )}
        </div>
      </div>
    );
  }
}

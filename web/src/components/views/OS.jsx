import React, { Component } from "react";

import { i18n } from "../../utils";

import { FaCaretRight, FaCaretDown } from "react-icons/fa";

import ReactAplayer from "react-aplayer";
import DPlayer from "react-dplayer";

import OSJson from "../common/OSJson";

export default class OS extends Component {
  state = {
    show: {},
    folders: null,
    data: null
  };

  players = [];

  refresh = () => {};

  componentDidMount() {
    //Fetch folder data
    this.fetchFolders();

    //Sidebar
    if (window.outerWidth < 767) this.props.toggleSidebar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.timeline !== prevProps.timeline) this.fetchFolders();
  }

  componentWillUnmount() {
    this.players.forEach(ap => ap.destroy());
    this.players = [];
  }

  fetchFolders() {
    if (this.props.timeline)
      fetch("./data/ostime.json").then(res => {
        res.json().then(data => {
          this.setState({
            folders: [
              {
                id: "timeline",
                name: i18n(["Timeline", "时间线"]),
                files: data
              }
            ]
          });
        });
      });
    else
      fetch("./data/oslist.json").then(res => {
        res.json().then(data => this.setState({ folders: data }));
      });
  }

  toggleFolder(id) {
    const cal = (show, id) => {
      show[id] = !show[id];
      return show;
    };
    this.setState({ show: cal(this.state.show, id) });
  }

  open(folder, item) {
    //Init
    this.players.forEach(ap => ap.destroy());
    this.players = [];
    this.refs.Content.scrollTo(0, 0);

    //Special Folder
    if (folder === "timeline") folder = item.folder;

    //Get Data
    let src = `${folder}/${item.id.toLowerCase()}.json`;
    if (localStorage.getItem(src))
      this.setState({ data: JSON.parse(localStorage.getItem(src)) });
    else
      fetch("data/osfiles/" + src).then(res => {
        res.text().then(data => {
          localStorage.setItem(src, data);
          this.setState({ data: JSON.parse(localStorage.getItem(src)) });
        });
      });
  }

  render() {
    return (
      <div className="OS">
        <div
          className={this.props.sidebar ? "OS-Sidebar" : "Hidden OS-Sidebar"}>
          {this.state.folders &&
            this.state.folders.map(data => (
              <div className="OS-Sidebar-Folder" key={"folder_" + data.id}>
                <div
                  className="OS-Sidebar-Folder-Title"
                  onClick={() => this.toggleFolder(data.id)}>
                  {data.name}
                  {this.state.show[data.id] ? (
                    <FaCaretDown />
                  ) : (
                    <FaCaretRight />
                  )}
                </div>
                {this.state.show[data.id] &&
                  data.files.map((item, index) => (
                    <div
                      className={
                        (this.state.data && this.state.data.id === item.id
                          ? "OS-Sidebar-Folder-Active "
                          : "") + "OS-Sidebar-Folder-Item"
                      }
                      key={data.id + index}
                      onClick={() => this.open(data.id, item)}>
                      {data.id === "timeline" && (
                        <img
                          src={`./images/characters/${item.folder}_s.png`}
                          alt={item.folder}
                        />
                      )}
                      {item.name}
                    </div>
                  ))}
              </div>
            ))}
        </div>
        <div
          className={this.props.sidebar ? "OS-Content" : "Full OS-Content"}
          ref="Content">
          {this.state.data && this.state.data.res && (
            <div className="OS-Content-Video">
              <DPlayer
                options={{
                  video: {
                    url: "./videos/" + this.state.data.res.toLowerCase()
                  },
                  subtitle: {
                    url: `./data/subtitles/${
                      this.state.data.res.toLowerCase().split(".")[0]
                    }.${this.props.lang}.vtt`
                  }
                }}
                key={this.state.data.res + this.props.lang}></DPlayer>
            </div>
          )}
          {this.state.data &&
            i18n(this.state.data.contents).map((data, index) => {
              // Provide Music Player
              switch (data.type) {
                case "bgm":
                  return (
                    <div
                      className="OS-Content-Audio"
                      key={this.state.data.id + index + this.props.lang}>
                      <ReactAplayer
                        theme="#2d303a"
                        volume={0.7}
                        audio={{
                          name: i18n(["BGM", "背景音乐"]),
                          artist: data.attrs[0],
                          url:`./audios/bgms/${data.attrs[0].toLowerCase()}.mp3`
                        }}
                        mutex={false}
                        onInit={ap => (this.players = this.players.concat(ap))}
                        loop="one"></ReactAplayer>
                    </div>
                  );
                case "sound":
                  return (
                    <div
                      className="OS-Content-Audio"
                      key={this.state.data.id + index + this.props.lang}>
                      <ReactAplayer
                        theme="#2d303a"
                        volume={0.7}
                        audio={{
                          name: data.attrs[1],
                          artist: this.state.data.name,
                          url:
                            `./audios/sounds/${data.attrs[0].toLowerCase()}.mp3`
                        }}
                        mutex={false}
                        onInit={ap => (this.players = this.players.concat(ap))}
                        loop="none"></ReactAplayer>
                    </div>
                  );
                case "image": // Image Display
                  return (
                    <div
                      className="OS-Content-Image"
                      key={this.state.data.id + index}>
                      <img
                        src={
                          `./images/osfiles/${data.attrs[0].toLowerCase()}.jpg`
                        }
                        alt={data.attrs[0]}
                        onClick={() =>
                          window.open(
                            `./images/osfiles/${data.attrs[0].toLowerCase()}.jpg`
                          )
                        }></img>
                    </div>
                  );
                case "text": // Text Display
                  return (
                    <div
                      className="OS-Content-Text"
                      dangerouslySetInnerHTML={{ __html: data.content }}
                      key={this.state.data.id + index}></div>
                  );
                case "mail": // MailInfo + Content
                  return (
                    <React.Fragment key={this.state.data.id + index}>
                      <div className="OS-Content-MailInfo">
                        {i18n(["Title: ", "标题: "]) + data.attrs[0]}
                        <br />
                        {i18n(["From: ", "发件人: "]) + data.attrs[1]}
                        <br />
                        {i18n(["To: ", "收件人: "]) + data.attrs[2]}
                      </div>
                      <div
                        className="OS-Content-Text"
                        dangerouslySetInnerHTML={{
                          __html: data.content
                        }}></div>
                    </React.Fragment>
                  );
                case "json": // JSON Display.
                  return (
                    <OSJson
                      data={data}
                      key={this.state.data.id + index}
                      id={this.state.data.id + index}
                    />
                  );
                case "conversation": // Conversation Display
                  return (
                    <div
                      className="OS-Content-Dialog"
                      key={this.state.data.id + index}>
                      <div className="OS-Content-Dialog-Name">
                        {data.attrs[0]}
                      </div>
                      <div
                        className="OS-Content-Dialog-Content"
                        dangerouslySetInnerHTML={{
                          __html: data.content
                        }}></div>
                    </div>
                  );
                default:
                  console.log(data);
                  return "";
              }
            })}
        </div>
      </div>
    );
  }
}

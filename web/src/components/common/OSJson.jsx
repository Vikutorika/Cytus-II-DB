import React, { Component } from "react";

export default class OSJson extends Component {
  render() {
    var j = "";
    switch (this.props.data.attrs[0]) {
      case "msgs":
        j = JSON.parse(this.props.data.content.replace(/\n/g, "\\n"));
        return (
          <div className="OS-Content-Msg">
            {j.map((data, index) => (
              <div
                className={
                  (data.MessageType === 0
                    ? "OS-Content-Msg-System "
                    : data.MessageType === 1 || data.MessageType === 3
                    ? "OS-Content-Msg-Self "
                    : "") + "OS-Content-Msg-Row"
                }
                key={this.props.id + "_json_" + index}>
                {data.Avatar && (
                  <div className="OS-Content-Msg-Avatar">
                    <img
                      src={`./images/osavatars/${data.Avatar.toLowerCase()}.png`}
                      alt={data.Avatar}></img>
                  </div>
                )}
                <div className="OS-Content-Msg-Content">
                  <div className="OS-Content-Msg-Info">
                    {data.UserName && (
                      <div className="OS-Content-Msg-Name">{data.UserName}</div>
                    )}
                    {data.Time && (
                      <div className="OS-Content-Msg-Time">{data.Time}</div>
                    )}
                  </div>
                  {(data.MessageType === 3 || data.MessageType === 4) && (
                    <div className="OS-Content-Msg-Image">
                      <img
                        src={`./images/osstickers/${data.Image.toLowerCase()}.png`}
                        alt={data.Image}
                      />
                    </div>
                  )}
                  {data.Content && (
                    <div className="OS-Content-Msg-Text">{data.Content}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      case "imageviewer":
        j = JSON.parse(this.props.data.content);
        return (
          <div className="OS-Content-Image">
            <img
              src={`./images/osspecial/${j.Image.toLowerCase()}.jpg`}
              onClick={() =>
                window.open(`./images/osspecial/${j.Image.toLowerCase()}.jpg`)
              }
              alt={j.Image}
            />
          </div>
        );
      case "gallery":
        j = JSON.parse(this.props.data.content.replace(/\n/g, ""));
        return j.map((data, index) => (
          <div
            className="OS-Content-Image"
            key={this.props.id + "_json_" + index}>
            <img
              src={`./images/osfiles/${data.Id.toLowerCase()}.jpg`}
              onClick={() =>
                window.open(`./images/osfiles/${data.Id.toLowerCase()}.jpg`)
              }
              alt={data.Id}
            />
          </div>
        ));
      default:
        console.log(this.props.data.content);
        return "";
    }
  }
}

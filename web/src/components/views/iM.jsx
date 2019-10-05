import React, { Component } from "react";
import { i18n } from "../../utils";

import { FaThumbsUp, FaComment } from "react-icons/fa";

export default class IM extends Component {
  state = {
    list: null,
    post: null
  };

  componentDidMount() {
    fetch("./data/imlist.json").then(res => {
      res.json().then(data => this.setState({ list: data }));
    });
  }

  componentDidUpdate() {
    this.refs.iM.scrollTo(this.refs.iM.scrollTop, this.refs.iM.scrollLeft);
  }

  open(item) {
    this.props.onPost();
    fetch("./data/imposts/" + item.id.toLowerCase() + ".json").then(res => {
      res.json().then(data => {
        data.title = item.title;
        this.setState({ post: data });
      });
    });
  }

  render() {
    return (
      <div className="iM">
        <div className={"iM-List " + (this.props.imlist ? "" : "Hidden")}>
          {this.state.list &&
            this.state.list.map(data => (
              <div
                className="iM-Row"
                key={data.id + "_list"}
                onClick={() => this.open(data)}>
                <div className="iM-Avatar">
                  <img
                    src={`./images/imavatars/${data.avatar.toLowerCase()}.png`}
                    alt={data.avatar}
                  />
                  {data.name}
                </div>
                <div className="iM-Header">
                  <div className="iM-Title">{i18n(data.title)}</div>
                  <div className="iM-Info">
                    <div className="iM-Info-Likes">
                      <FaThumbsUp /> {data.likes}
                    </div>
                    <div className="iM-Info-Replies">
                      <FaComment /> {data.replies}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div
          className={"iM-View " + (this.props.imlist ? "Hidden" : "")}
          ref="iM">
          {this.state.post && (
            <>
              <div className="iM-Row" key={this.state.post.id}>
                <div className="iM-Avatar">
                  <img
                    src={`./images/imavatars/${this.state.post.avatar.toLowerCase()}.png`}
                    alt={this.state.post.avatar}
                  />
                  {this.state.post.name}
                </div>
                <div className="iM-Content">
                  <div className="iM-Content-Title">
                    {i18n(this.state.post.title)}
                  </div>
                  <div
                    className="iM-Content-Text"
                    dangerouslySetInnerHTML={{
                      __html: i18n(this.state.post.contents)
                    }}
                  />
                  {this.state.post.attachments.map((data, index) => (
                    <div
                      className="iM-Content-Image"
                      key={this.state.post.id + index + "_image"}>
                      <img
                        src={`./images/imfiles/${data.toLowerCase()}.jpg`}
                        alt={data}
                        onClick={() =>
                          window.open(
                            `./images/imfiles/${data.toLowerCase()}.jpg`
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              {this.state.post.replies.map((data, index) => (
                <div className="iM-Row iM-Reply" key={data.id}>
                  <div className="iM-Avatar">
                    <img
                      src={`./images/imavatars/${data.avatar.toLowerCase()}.png`}
                      alt={data.avatar}
                    />
                    {data.name}
                  </div>
                  <div
                    className="iM-Content"
                    dangerouslySetInnerHTML={{
                      __html: i18n(data.contents)
                    }}></div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}

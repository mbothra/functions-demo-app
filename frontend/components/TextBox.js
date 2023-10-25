import React, { Component } from "react";

export class TextBox extends Component {
  render() {
    return (
      <div className="battle-text-content">
        <p style={{color:'white'}}>
          {this.props.messageOne} <br /> {this.props.messageTwo}
        </p>
      </div>
    );
  }
}

export default TextBox;

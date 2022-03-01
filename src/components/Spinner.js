import React, { Component } from "react";
import loading from "../loading.gif";
export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          className="my-3"
          src={loading}
          height="50px"
          width="50px"
          alt="loading"
        />
      </div>
    );
  }
}

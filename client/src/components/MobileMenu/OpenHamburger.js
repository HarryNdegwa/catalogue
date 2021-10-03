import React from "react";
import {GoThreeBars} from "react-icons/go";

import "./OpenHamburger.css";

class OpenHamburger extends React.Component {
  handleOpenMenu = () => {
    this.props.action();
  };
  render() {
    return <div className="open-hamburger" onClick={this.handleOpenMenu}>
      <GoThreeBars/>
    </div>;
  }
}

export default OpenHamburger;

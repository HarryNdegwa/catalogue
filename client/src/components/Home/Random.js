import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

import "./Random.css";
import { Link } from "react-router-dom";
// import RandomSkeleton from "./RandomSkeleton";

class Random extends React.Component {
  render() {
    const { title, url, src } = this.props.data;
    return (
      <div className="random">
        {/* <RandomSkeleton /> */}
        <Link to={url}>
          {" "}
          <div className="inner-random">
            <img src={src} alt="img" width="100%" height="100%" />
            <div className="inner-random-text" style={{ color: "white" }}>
              <h5>{title}</h5>
              <h5>Collection</h5>
              <p
                className="mt-2 d-flex"
                style={{
                  textTransform: "uppercase",
                  fontSize: "13px",
                  alignItems: "center",
                }}
              >
                <strong>Shop Now</strong>
                <span className="ml-1">
                  <FaLongArrowAltRight />
                </span>
              </p>
            </div>
            <div className="triangle-topleft"></div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Random;

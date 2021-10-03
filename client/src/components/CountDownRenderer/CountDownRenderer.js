import React from "react";

import "./CountDownRenderer.css";

const CountDownRenderer = (props) => {
  const { days, hours, minutes, seconds, completed } = props;
  return (
    <div className="count-down">
      {completed ? (
        <p>Complete</p>
      ) : (
        <div className="count-down-wrapper">
          <div>
            <span>
              <i>{days < 10 ? "0" + days : days}</i>
              <i>
                <small>DAYS</small>
              </i>
            </span>
          </div>
          <div>
            <span>
              <i>{hours < 10 ? "0" + hours : hours}</i>
              <i>
                <small>HRS</small>
              </i>
            </span>
          </div>
          <div>
            <span>
              <i>{minutes < 10 ? "0" + minutes : minutes}</i>
              <i>
                <small>MINS</small>
              </i>
            </span>
          </div>
          <div>
            <span>
              <i>{seconds < 10 ? "0" + seconds : seconds}</i>
              <i>
                <small>SECS</small>
              </i>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountDownRenderer;

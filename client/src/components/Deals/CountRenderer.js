import React from "react";

import "./CountRenderer.css";

const CountRenderer = (props) => {
  const { days, hours, minutes, seconds, completed } = props;
  return (
    <div>
      {completed ? (
        <p>Complete</p>
      ) : (
        <div className="count-wrapper">
          <div>
            <span>
              <i>{days < 10 ? "0" + days : days}</i>
              <i>
                <small>d</small>
              </i>
            </span>
          </div>
          <div>
            <span>
              <i>{hours < 10 ? "0" + hours : hours}</i>
              <i>
                <small>h</small>
              </i>
            </span>
          </div>
          <div>
            <span>
              <i>{minutes < 10 ? "0" + minutes : minutes}</i>
              <i>
                <small>m</small>
              </i>
            </span>
          </div>
          <div>
            <span>
              <i>{seconds < 10 ? "0" + seconds : seconds}</i>
              <i>
                <small>s</small>
              </i>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountRenderer;

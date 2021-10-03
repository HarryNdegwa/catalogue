import React from "react";

const ComingSoon = () => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 10000,
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d31c27",
        }}
      >
        <h3>Comming Soon!</h3>
      </div>
    </div>
  );
};

export default ComingSoon;

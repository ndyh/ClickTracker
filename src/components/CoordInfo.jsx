import React from "react";
import "./CoordInfo.css";

const CoordInfo = ({ index, point }) => {
  let top, left;

  point.y < window.innerHeight / 2
    ? (top = point.y + 25)
    : (top = point.y - 79);

  point.x < window.innerWidth / 2
    ? (left = point.x + 5)
    : (left = point.x - 55);

  return (
    <div
      className="coord-info"
      style={{
        top: top,
        left: left,
      }}
    >
      <p>
        <span>ID</span>: {index + 1}
      </p>
      <p>
        <span>X</span>: {point.x}
      </p>
      <p>
        <span>Y</span>: {point.y}
      </p>
    </div>
  );
};

export default CoordInfo;

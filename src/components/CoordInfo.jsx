import React, { useRef, useEffect } from "react";
import "./CoordInfo.css";

const CoordInfo = ({ point }) => {
  const canvas = useRef();
  let top, left, ctx, toX, toY;

  // Compute info panel and canvas coords based on window size
  point.y < window.innerHeight / 2
    ? ((top = point.y + 25), (toY = top))
    : ((top = point.y - 79), (toY = top + 62));
  point.x < window.innerWidth / 2
    ? (left = point.x + 5)
    : (left = point.x - 55);
  toX = left + 25; // X centered on info panel

  useEffect(() => {
    // Initialize canvas element
    const ce = canvas.current;
    ce.height = window.innerHeight;
    ce.width = window.innerWidth;
    ctx = ce.getContext("2d");

    // Draw canvas element based on point and info coords
    ctx.beginPath();
    ctx.moveTo(point.x, point.y + 3); // Adding 3 to point.y to better center
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = "#61dafb";
    ctx.lineWidth = 1.25;
    ctx.stroke();
  }, []);

  return (
    <div
      className="coord-info"
      style={{
        top: top,
        left: left,
      }}
    >
      <p>
        <span>ID</span>: {point.id + 1}
      </p>
      <p>
        <span>X</span>: {point.x}
      </p>
      <p>
        <span>Y</span>: {point.y}
      </p>
      <canvas ref={canvas}></canvas>
    </div>
  );
};

export default CoordInfo;

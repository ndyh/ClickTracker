import React, { useState } from "react";
import CoordInfo from "./components/CoordInfo";
import "./App.css";

function App() {
  const [coordInfo, setCoordInfo] = useState({});
  const [coords, setCoords] = useState([]);
  const [poppedCoords, setPoppedCoords] = useState([]);

  // Push mouseEvent X, Y to coords state
  function handleClickEvent({ clientX, clientY }) {
    setCoords([...coords, { x: clientX, y: clientY }]);
  }

  // Pop latest coords element and push element to poppedCoords state
  function handleUndo() {
    if (coords.legnth !== 0) {
      let c = [...coords];
      setPoppedCoords([...poppedCoords, c.pop()]);
      setCoords(c);
    }
  }

  // Pop latest poppedCoords element and push element back to coords state
  function handleRedo() {
    if (poppedCoords.length !== 0) {
      let pc = [...poppedCoords];
      setCoords([...coords, pc.pop()]);
      setPoppedCoords(pc);
    }
  }

  // Reset states
  function handleClear() {
    if (coords.length !== 0 || poppedCoords.length !== 0) {
      setCoords([]);
      setPoppedCoords([]);
      setCoordInfo({});
    }
  }

  return (
    <div className="App">
      <div className="btn-container">
        <button
          className="undo"
          onClick={handleUndo}
          disabled={coords.length === 0}
        >
          Undo {coords != 0 && <span>({coords.length})</span>}
        </button>
        <button
          className="redo"
          onClick={handleRedo}
          disabled={poppedCoords.length === 0}
        >
          Redo {poppedCoords != 0 && <span>({poppedCoords.length})</span>}
        </button>
        <button
          className="clear"
          onClick={handleClear}
          disabled={coords.length === 0 && poppedCoords.length === 0}
        >
          Clear
        </button>
      </div>
      <div className="click-container" onClick={handleClickEvent}>
        {coordInfo.show && <CoordInfo point={coordInfo.point} />}
        {coords.map((c, i) => (
          <div
            className="point"
            key={i}
            onMouseOver={() =>
              setCoordInfo({
                show: true,
                point: Object.assign({ id: i }, c),
              })
            }
            onMouseOut={() => setCoordInfo({ show: false })}
            style={{ top: c.y - 4, left: c.x - 3 }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;

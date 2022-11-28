import React, { useState } from "react";
import CoordInfo from "./components/CoordInfo";
import "./App.css";

function App() {
  const [coordInfo, setCoordInfo] = useState({});
  const [coords, setCoords] = useState([]);
  const [poppedCoords, setPoppedCoords] = useState([]);

  function handleClickEvent({ clientX, clientY }) {
    setCoords([...coords, { x: clientX, y: clientY }]);
  }

  function handleUndo() {
    if (coords.legnth !== 0) {
      let c = [...coords];
      setPoppedCoords([...poppedCoords, c.pop()]);
      setCoords(c);
    }
  }

  function handleRedo() {
    if (poppedCoords.length !== 0) {
      let pc = [...poppedCoords];
      setCoords([...coords, pc.pop()]);
      setPoppedCoords(pc);
    }
  }

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
        {coordInfo.show && (
          <CoordInfo index={coordInfo.id} point={coordInfo.point} />
        )}
        {coords.map((c, index) => (
          <div
            className="point"
            key={index}
            onMouseOver={() =>
              setCoordInfo({ show: true, id: index, point: c })
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

import React, { useState } from "react";
import "./App.css";

function App() {
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

  return (
    <div className="App">
      <div className="btn-container">
        <button
          className="undo"
          disabled={coords.length === 0}
          onClick={handleUndo}
        >
          Undo {coords != 0 && <span>({coords.length})</span>}
        </button>
        <button
          className="redo"
          disabled={poppedCoords.length === 0}
          onClick={handleRedo}
        >
          Redo {poppedCoords != 0 && <span>({poppedCoords.length})</span>}
        </button>
      </div>
      <div className="click-container" onClick={handleClickEvent}>
        {coords.map((item, index) => (
          <div
            className="point"
            key={index}
            style={{ top: item.y - 4, left: item.x - 3 }}
          ></div>
        ))}
        {}
      </div>
    </div>
  );
}

export default App;

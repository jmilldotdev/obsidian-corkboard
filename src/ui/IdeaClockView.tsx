import React, { useState } from "react";
import IdeaClockPlugin from "../index";
import IdeaClockCircle from "./IdeaClockCircle";

export default function IdeaClockView({
  plugin,
}: {
  plugin: IdeaClockPlugin;
}): JSX.Element {
  const [numNodes, setNumNodes] = useState(2);
  const [notes, setNotes] = useState([]);

  return (
    <>
      <div className="IdeaClock__container">
        <p>Notes</p>
        <div className="IdeaClock__notes">
          <IdeaClockCircle />
          {notes.map((note, i) => (
            <div key={i} className="IdeaClock__note">
              {note.basename}
            </div>
          ))}
        </div>
      </div>
      <input
        value={numNodes}
        onChange={(event) =>
          setNumNodes(parseInt(event.target.value.replace(/\D/, "")))
        }
      />
      <button
        onClick={async () =>
          setNotes(await plugin.handlegetRandomNotes(numNodes))
        }
      >
        Get notes
      </button>
      <button
        onClick={async () =>
          setNotes(await plugin.handlegetRandomNotesFromSearch(numNodes))
        }
      >
        Get notes from search
      </button>
    </>
  );
}

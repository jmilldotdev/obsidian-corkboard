import { TFile } from "obsidian";
import React, { useState } from "react";
import ReactFlow, { Elements } from "react-flow-renderer";
import IdeaClockPlugin from "../index";
import { AppContext, SelectedNoteContext } from "./clockContext";

export interface NoteInfo {
  index: number;
  title: string;
  path: string;
  rotate: number;
  radius: number;
  rotateReverse: number;
}

export interface SelectedNote {
  index: number | null;
  setSelectedNoteIndex: (index: number) => void;
}

export interface ArrowEndpoints {
  start: string;
  end: string;
}

interface IdeaClockViewProps {
  plugin: IdeaClockPlugin;
}

export default function IdeaClockView({
  plugin,
}: IdeaClockViewProps): JSX.Element {
  const [numNodes, setNumNodes] = useState("12");
  const [noteElements, setNoteElements] = useState<Elements>();
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(
    null
  );
  // const radius = 300;

  const randomNotesHandler = async (): Promise<void> => {
    const notes = await plugin.handlegetRandomNotes(parseInt(numNodes));
    postFillHandler(notes);
  };

  const randomNotesFromSearchHandler = async (): Promise<void> => {
    const notes = await plugin.handlegetRandomNotesFromSearch(
      parseInt(numNodes)
    );
    postFillHandler(notes);
  };

  const postFillHandler = (notes: TFile[]): void => {
    setSelectedNoteIndex(null);
    buildCircle(notes);
  };

  const buildCircle = (notes: TFile[]) => {
    const num = notes.length;
    const type = 1;
    const start = -90;
    const slice = (360 * type) / num;

    const items: Elements = [];
    let i;
    for (i = 0; i < num; i++) {
      const rotate = slice * i + start;

      items.push({
        id: i.toString(),
        data: { label: notes[i].basename },
        position: {
          x: Math.cos((rotate * Math.PI) / 180) * 300,
          y: Math.sin((rotate * Math.PI) / 180) * 300,
        },
      });
    }
    setNoteElements(items);
  };

  return (
    <AppContext.Provider value={plugin.app}>
      <SelectedNoteContext.Provider
        value={{
          index: selectedNoteIndex,
          setSelectedNoteIndex,
        }}
      >
        <div
          className="IdeaClock__container"
          style={{ width: "700px", height: "700px" }}
        >
          {noteElements && <ReactFlow elements={noteElements} />}
        </div>
        <input
          value={numNodes}
          onChange={(event) => setNumNodes(event.target.value)}
        />
        <button onClick={randomNotesHandler}>Get notes</button>
        <button onClick={randomNotesFromSearchHandler}>
          Get notes from search
        </button>
        <p>
          Selected note:{" "}
          {selectedNoteIndex === null ? "None" : selectedNoteIndex}
        </p>
      </SelectedNoteContext.Provider>
    </AppContext.Provider>
  );
}

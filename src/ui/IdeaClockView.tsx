import { TFile } from "obsidian";
import React, { useState } from "react";
import IdeaClockPlugin from "../index";
import { SelectedNoteContext } from "./clockContext";
import IdeaClockCircle from "./IdeaClockCircle";

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

interface IdeaClockViewProps {
  plugin: IdeaClockPlugin;
}

export default function IdeaClockView({
  plugin,
}: IdeaClockViewProps): JSX.Element {
  const [numNodes, setNumNodes] = useState("12");
  const [noteCircleInfo, setNoteCircleInfo] = useState<NoteInfo[]>([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(
    null
  );
  const radius = 300;

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
    console.log(notes);
    setSelectedNoteIndex(null);
    buildCircle(notes);
  };

  const buildCircle = (notes: TFile[]) => {
    const num = notes.length;
    const type = 1;
    const start = -90;
    const slice = (360 * type) / num;

    const items: NoteInfo[] = [];
    let i;
    for (i = 0; i < num; i++) {
      const rotate = slice * i + start;
      const rotateReverse = rotate * -1;

      items.push({
        index: i,
        title: notes[i].basename,
        path: notes[i].path,
        radius: radius,
        rotate: rotate,
        rotateReverse: rotateReverse,
      });
    }
    setNoteCircleInfo(items);
  };

  return (
    <SelectedNoteContext.Provider
      value={{
        index: selectedNoteIndex,
        setSelectedNoteIndex,
      }}
    >
      <div className="IdeaClock__container">
        <div className="IdeaClock__notes">
          <IdeaClockCircle noteCircleInfo={noteCircleInfo} radius={radius} />
        </div>
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
        Selected note: {selectedNoteIndex === null ? "None" : selectedNoteIndex}
      </p>
    </SelectedNoteContext.Provider>
  );
}

import { TFile } from "obsidian";
import { Elements } from "react-flow-renderer";
import { CorkboardNote, noteNodeTypeString } from "../types";

export const buildClockSpread = (
  notes: TFile[],
  numNodes: number,
  radius: number
): Elements<CorkboardNote> => {
  let numEls = numNodes;
  if (numNodes > notes.length) {
    numEls = notes.length;
  }

  const start = -90;
  const slice = 360 / numEls;

  const elements: Elements = [];
  let i;
  for (i = 0; i < numEls; i++) {
    const rotate = slice * i + start;
    const str_i = i.toString();

    elements.push({
      id: str_i,
      data: {
        label: notes[i].basename,
        path: notes[i].path,
        selected: false,
      },
      type: noteNodeTypeString,
      position: {
        x: Math.cos((rotate * Math.PI) / 180) * radius,
        y: Math.sin((rotate * Math.PI) / 180) * radius,
      },
    });
  }
  return elements;
};

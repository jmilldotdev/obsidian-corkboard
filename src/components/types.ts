import CorkboardNoteNode from "./CorkboardNoteNode";
import { TFile } from "obsidian";

export const nodeTypes = {
  noteNode: CorkboardNoteNode,
};

export const noteNodeTypeString = "noteNode";

export interface CorkboardNote {
  id: string;
  data: {
    file: TFile;
    label: string;
    path: string;
    selected: boolean;
  };
  type: string;
  postition: {
    x: number;
    y: number;
  };
}

export enum SpreadType {
  Clock,
}

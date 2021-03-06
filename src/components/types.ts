import CorkboardNoteNode from "./CorkboardNoteNode";
import { TFile } from "obsidian";

export const nodeTypes = {
  noteNode: CorkboardNoteNode,
};

export const noteNodeTypeString = "noteNode";

export interface CorkboardNote {
  file?: TFile;
  label: string;
  path: string;
}

export enum SpreadType {
  Clock,
}

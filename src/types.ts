import { TFile, View } from "obsidian";
import IdeaClockNoteNode from "./ui/IdeaClockNoteNode";

export interface SearchDOM {
  getFiles(): TFile[];
}

export interface SearchView extends View {
  dom: SearchDOM;
}

export const VIEW_TYPE = "idea-clock-view";

export const nodeTypes = {
  special: IdeaClockNoteNode,
};

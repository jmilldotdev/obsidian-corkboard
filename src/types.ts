import { TFile, View } from "obsidian";

export interface SearchDOM {
  getFiles(): TFile[];
}

export interface SearchView extends View {
  dom: SearchDOM;
}

export const VIEW_TYPE = "idea-clock-view";

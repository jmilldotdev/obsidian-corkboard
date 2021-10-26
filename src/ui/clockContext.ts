import { App } from "obsidian";
import { createContext } from "react";
import { SelectedNote } from "./IdeaClockView";

export const AppContext = createContext<App>(undefined);

export const SelectedNoteContext = createContext<SelectedNote>(undefined);

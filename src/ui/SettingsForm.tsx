import { TFile } from "obsidian";
import React from "react";
import styled from "styled-components";
import IdeaClockPlugin from "../index";
import { Elements } from "react-flow-renderer";

const StyledSettingsForm = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 250px;
  border-radius: 6px;
  box-shadow: 0px 0.5px 1px 0.5px rgba(0, 0, 0, 0.1),
    0px 2px 10px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.1);
`;

interface SettingsFormProps {
  plugin: IdeaClockPlugin;
  noteElements: Elements;
  numNodes: string;
  setNumNodes: (numNodes: string) => void;
  selectedNoteIndices: string[];
  buildCircle: (notes: TFile[]) => void;
  rebuildCircle: (notes: TFile[]) => void;
}

const SettingsForm = ({
  plugin,
  noteElements,
  numNodes,
  setNumNodes,
  selectedNoteIndices,
  buildCircle,
  rebuildCircle,
}: SettingsFormProps): JSX.Element => {
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
    if (selectedNoteIndices && selectedNoteIndices.length > 0) {
      rebuildCircle(notes);
    } else {
      buildCircle(notes);
    }
  };

  return (
    <StyledSettingsForm>
      <input
        value={numNodes}
        onChange={(event) => setNumNodes(event.target.value)}
      />
      <button onClick={randomNotesHandler}>Get notes</button>
      <button onClick={randomNotesFromSearchHandler}>
        Get notes from search
      </button>
      <button onClick={() => console.log(noteElements)}>Show notes</button>
    </StyledSettingsForm>
  );
};

export default SettingsForm;

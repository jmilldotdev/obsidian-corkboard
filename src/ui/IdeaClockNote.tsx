import React, { useContext } from "react";
import styled from "styled-components";
import { SelectedNoteContext } from "./clockContext";
import { NoteInfo } from "./IdeaClockView";

interface StyledNoteProps {
  isSelected: boolean;
}

const StyledNote = styled.p`
  position: absolute;
  background: ${({ isSelected }: StyledNoteProps) =>
    isSelected ? "#9e8aff" : "#d669bc"};
  -webkit-transition: all 2s linear;
  -moz-transition: all 2s linear;
  transition: transform 2s linear;
  color: white;
  left: 0;
  border: 5px;
  border-radius: 10%;
`;

interface IdeaClockNoteProps {
  noteInfo: NoteInfo;
}

const IdeaClockNote = ({ noteInfo }: IdeaClockNoteProps): JSX.Element => {
  const index = noteInfo.index;
  const selectedNote = useContext(SelectedNoteContext);
  const isSelected = index === selectedNote.index;

  return (
    <StyledNote
      isSelected={isSelected}
      onClick={() => {
        selectedNote.setSelectedNoteIndex(index);
        console.log(noteInfo.path);
      }}
      style={{
        transform:
          "rotate(" +
          noteInfo.rotate +
          "deg) translate(" +
          noteInfo.radius +
          "px) rotate(" +
          noteInfo.rotateReverse +
          "deg)",
      }}
    >
      {noteInfo.title}
    </StyledNote>
  );
};

export default IdeaClockNote;

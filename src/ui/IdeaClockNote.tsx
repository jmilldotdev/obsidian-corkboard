import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext, SelectedNoteContext } from "./clockContext";
import { NoteInfo } from "./IdeaClockView";

interface StyledNoteProps {
  isSelected: boolean;
}

const StyledNote = styled.div`
  position: absolute;
  background: ${({ isSelected }: StyledNoteProps) =>
    isSelected ? "#9e8aff" : "#d669bc"};
  -webkit-transition: all 2s linear;
  -moz-transition: all 2s linear;
  transition: transform 2s linear;
  color: white;
  width: 120px;
  left: 0;
  border: 5px;
  border-radius: 10%;
  text-align: center;
`;

interface IdeaClockNoteProps {
  noteInfo: NoteInfo;
  noteId: string;
}

const IdeaClockNote = ({ noteInfo }: IdeaClockNoteProps): JSX.Element => {
  const index = noteInfo.index;
  const selectedNote = useContext(SelectedNoteContext);
  const isSelected = index === selectedNote.index;

  const app = useContext(AppContext);

  return (
    <div>
      <StyledNote
        isSelected={isSelected}
        onClick={(e) => {
          if (e.ctrlKey || e.metaKey) {
            app.workspace.openLinkText(noteInfo.path, "", true, false);
          } else {
            selectedNote.setSelectedNoteIndex(index);
          }
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
    </div>
  );
};

export default IdeaClockNote;

import React from "react";
import styled from "styled-components";
import { NoteInfo } from "./IdeaClockView";

const StyledNote = styled.p`
  position: absolute;
  background: #d669bc;
  -webkit-transition: all 2s linear;
  -moz-transition: all 2s linear;
  transition: transform 2s linear;
  color: white;
  left: 0;
  border: 5px;
  border-radius: 10%;
  border-color: #d669bc;
`;

interface IdeaClockNoteProps {
  noteInfo: NoteInfo;
  selectionCallback: (index: number) => void;
}

const IdeaClockNote = ({
  noteInfo,
  selectionCallback,
}: IdeaClockNoteProps): JSX.Element => {
  return (
    <StyledNote
      onClick={() => {
        selectionCallback(noteInfo.index);
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

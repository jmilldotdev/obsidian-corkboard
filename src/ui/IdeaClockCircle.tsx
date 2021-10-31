import React from "react";
import styled from "styled-components";
import IdeaClockNote from "./IdeaClockNote";
import { ArrowEndpoints, NoteInfo } from "./IdeaClockView";

interface StyledCircleProps {
  radius: number;
}

const StyledCircle = styled.div`
  width: ${({ radius }: StyledCircleProps) => radius * 2}px;
  height: ${({ radius }: StyledCircleProps) => radius * 2}px;
  border-radius: 50%;
  border-color: #9e8aff;
  border: solid;
  margin: 40px auto 40px;
  position: relative;
`;

interface StyledCircleHoldProps {
  radius: number;
}

const StyledCircleHold = styled.div`
  position: absolute;
  left: ${({ radius }: StyledCircleHoldProps) => radius - radius / 5}px;
  top: ${({ radius }: StyledCircleHoldProps) => radius - radius / 10}px;
`;

interface IdeaClockCircleProps {
  noteCircleInfo: NoteInfo[];
  radius: number;
  arrows: ArrowEndpoints[];
  setArrowHandler: ({ start, end }: ArrowEndpoints) => void;
}

const IdeaClockCircle = ({
  noteCircleInfo,
  radius,
  setArrowHandler,
}: IdeaClockCircleProps): JSX.Element => {
  return (
    <div>
      <StyledCircle radius={radius}>
        <StyledCircleHold radius={radius}>
          {noteCircleInfo && (
            <>
              {noteCircleInfo.map((value, i) => {
                return (
                  <div key={i}>
                    <IdeaClockNote
                      key={i}
                      noteInfo={value}
                      addArrow={setArrowHandler}
                      noteId={`note-${i}`}
                    />
                  </div>
                );
              })}
            </>
          )}
        </StyledCircleHold>
      </StyledCircle>
    </div>
  );
};

export default IdeaClockCircle;

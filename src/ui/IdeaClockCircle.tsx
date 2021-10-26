import React from "react";
import Xarrow from "react-xarrows";
import styled from "styled-components";
import IdeaClockNote from "./IdeaClockNote";
import { NoteInfo } from "./IdeaClockView";

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
  left: ${({ radius }: StyledCircleHoldProps) => radius - radius / 10}px;
  top: ${({ radius }: StyledCircleHoldProps) => radius - radius / 10}px;
`;

interface IdeaClockCircleProps {
  noteCircleInfo: NoteInfo[];
  radius: number;
}

const IdeaClockCircle = ({
  noteCircleInfo,
  radius,
}: IdeaClockCircleProps): JSX.Element => {
  return (
    <div>
      <StyledCircle radius={radius}>
        <StyledCircleHold radius={radius}>
          {noteCircleInfo && (
            <>
              {noteCircleInfo.map((value, i) => {
                return (
                  <div
                    key={i}
                    id={`note-${i}`}
                    className="IdeaClock__circleNote"
                  >
                    <IdeaClockNote key={i} noteInfo={value} />
                  </div>
                );
              })}
              <Xarrow start={"note-1"} end={"note-4"} />
            </>
          )}
        </StyledCircleHold>
      </StyledCircle>
    </div>
  );
};

export default IdeaClockCircle;

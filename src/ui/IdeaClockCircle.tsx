import React from "react";
import styled from "styled-components";
import IdeaClockNote from "./IdeaClockNote";
import { NoteInfo } from "./IdeaClockView";
import LineTo from "react-lineto";

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
  const [shouldShowArrow, setShouldShowArrow] = React.useState(false);
  return (
    <div>
      <StyledCircle radius={radius}>
        <StyledCircleHold radius={radius}>
          {noteCircleInfo && (
            <>
              {noteCircleInfo.map((value, i) => {
                return (
                  <div key={i} className={`IdeaClock__Note-${i}`}>
                    <IdeaClockNote key={i} noteInfo={value} />
                  </div>
                );
              })}
              {shouldShowArrow && (
                <div>
                  <LineTo
                    from={"IdeaClock__Note-1"}
                    to={"IdeaClock__Note-7"}
                    borderColor="red"
                  />
                </div>
              )}
            </>
          )}
        </StyledCircleHold>
      </StyledCircle>
      <button onClick={() => setShouldShowArrow(!shouldShowArrow)}>
        Show Arrow
      </button>
    </div>
  );
};

export default IdeaClockCircle;

import * as React from "react";
import { useStoreActions, useStoreState } from "react-flow-renderer";
import styled from "styled-components";
import { FileSuggester } from "../suggesters/FileSuggester";
import { AppContext } from "./context";

const StyledFileSuggesterInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
`;

export const FileSuggesterInput = (): React.ReactElement => {
  const ref = React.useRef<HTMLInputElement>();
  const app = React.useContext(AppContext);

  const nodes = useStoreState((state) => state.nodes);
  const setElements = useStoreActions((actions) => actions.setElements);
  const selectedElements = useStoreState((state) => state.selectedElements);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );

  const handleSubmit = (e: any) => {
    const selectedElementId = selectedElements[0].id;
    const selectedFile = e.target.value;
    const newElements = nodes.map((node) => {
      if (node.id === selectedElementId) {
        return {
          ...node,
          data: {
            ...node.data,
            label: selectedFile.split("/").pop().split(".")[0],
            path: selectedFile,
          },
        };
      }
      return node;
    });
    setSelectedElements([]);
    setElements(newElements);
  };

  React.useEffect(() => {
    if (ref.current) {
      new FileSuggester(app, ref.current);
    }
  }, []);

  return <StyledFileSuggesterInput ref={ref} onSubmit={handleSubmit} />;
};

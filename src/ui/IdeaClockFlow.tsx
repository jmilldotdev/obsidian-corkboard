import React, { useCallback, useContext, useEffect, useState } from "react";
import ReactFlow, { Elements, addEdge } from "react-flow-renderer";
import { nodeTypes } from "src/types";
import { AppContext, SelectedNoteContext } from "./clockContext";

interface IdeaClockFlowProps {
  initialElements: Elements;
}

const IdeaClockFlow = ({
  initialElements,
}: IdeaClockFlowProps): JSX.Element => {
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const selectedNote = useContext(SelectedNoteContext);
  const app = useContext(AppContext);
  const onConnect = useCallback(
    (params) => setElements((els) => addEdge({ ...params }, els)),
    []
  );
  const onElementClick = (e: any, element: any) => {
    const { id, data } = element;
    console.log(element);
    if (e.ctrlKey || e.metaKey) {
      app.workspace.openLinkText(data.path, "", true, false);
    } else {
      selectedNote.setSelectedNoteIndex(id);
    }
  };

  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);

  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log("flow loaded:", rfi);
      }
    },
    [reactflowInstance]
  );

  return (
    <ReactFlow
      elements={elements}
      nodeTypes={nodeTypes}
      onConnect={onConnect}
      onElementClick={onElementClick}
      onLoad={onLoad}
    />
  );
};

export default IdeaClockFlow;

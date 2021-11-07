import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  ConnectionMode,
  Elements,
  FlowElement,
  ReactFlowProvider,
  removeElements,
} from "react-flow-renderer";
import CorkboardPlugin from "../index";
import { CorkboardNote, nodeTypes } from "./types";
import SettingsForm from "./SettingsForm";

interface CorkboardProps {
  plugin: CorkboardPlugin;
}

export default function Corkboard({ plugin }: CorkboardProps): JSX.Element {
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [numNodes, setNumNodes] = useState("12");
  const [elements, setElements] = useState<Elements<CorkboardNote>>([]);

  const onSelectionChange = (selectedElements: Elements) => {
    console.log("Selection changed:", selectedElements);
  };

  const onConnect = useCallback((params) => {
    setElements((els) => addEdge({ ...params }, els));
  }, []);

  const onElementClick = (e: any, element: FlowElement) => {
    const { data } = element;
    if (e.ctrlKey || e.metaKey) {
      plugin.app.workspace.openLinkText(data.path, "", true, false);
    }
  };

  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = useCallback(
    (rfi: any) => {
      console.log("On Load");
      console.log(elements);
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
      }
      setElements(elements);
    },
    [reactflowInstance]
  );

  // const onDoubleClick = useCallback(
  //   (e: any) => {
  //     console.log(e);
  //     if (e.target.className == "react-flow__pane") {
  //       const currentTargetRect = e.currentTarget.getBoundingClientRect();
  //       const position = {
  //         x: e.screenX - 0.5 * currentTargetRect.width - 50,
  //         y: e.screenY - 0.5 * currentTargetRect.height + 115,
  //       };
  //       console.log(position);
  //       const newElements = noteElements.map((e) => {
  //         return { ...e };
  //       });
  //       console.log(newElements);
  //       newElements.push({
  //         id: `${noteElements.length}`,
  //         data: {
  //           label: "",
  //           path: "",
  //           selected: false,
  //         },
  //         type: "noteNode",
  //         position,
  //       });
  //       setNoteElements(newElements);
  //     }
  //   },
  //   [noteElements]
  // );

  return (
    <ReactFlowProvider>
      <div
        className="Corkboard__container"
        style={{ width: "1080px", height: "800px" }}
      >
        {elements && (
          <ReactFlow
            elements={elements}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onElementClick={onElementClick}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            elementsSelectable={true}
            selectionKeyCode={null}
            deleteKeyCode={"Backspace"}
            multiSelectionKeyCode={"Shift"}
            onSelectionChange={onSelectionChange}
            connectionMode={ConnectionMode.Loose}
            // onDoubleClick={onDoubleClick}
            zoomOnDoubleClick={false}
          />
        )}
      </div>
      <SettingsForm
        plugin={plugin}
        numNodes={numNodes}
        setNumNodes={setNumNodes}
      />
      <button onClick={() => console.log(reactflowInstance.getElements())}>
        Show notes
      </button>
    </ReactFlowProvider>
  );
}

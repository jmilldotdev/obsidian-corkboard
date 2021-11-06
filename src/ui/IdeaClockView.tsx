import { TFile } from "obsidian";
import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  ConnectionMode,
  Elements,
  FlowElement,
} from "react-flow-renderer";
import IdeaClockPlugin from "../index";
import { nodeTypes } from "./types";
import SettingsForm from "./SettingsForm";

interface IdeaClockViewProps {
  plugin: IdeaClockPlugin;
}

export default function IdeaClockView({
  plugin,
}: IdeaClockViewProps): JSX.Element {
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [numNodes, setNumNodes] = useState("12");
  const [noteElements, setNoteElements] = useState<Elements>([]);
  const [selectedNoteIndices, setSelectedNoteIndices] = useState<string[]>([]);
  const radius = 300;

  onunload = () => {
    console.log("unload");
  };

  const buildCircle = (notes: TFile[]) => {
    const num = parseInt(numNodes);
    const type = 1;
    const start = -90;
    const slice = (360 * type) / num;

    const items: Elements = [];
    let i;
    for (i = 0; i < num; i++) {
      const rotate = slice * i + start;
      const str_i = i.toString();

      items.push({
        id: str_i,
        data: {
          label: notes[i].basename,
          path: notes[i].path,
          selected: false,
        },
        type: "noteNode",
        position: {
          x: Math.cos((rotate * Math.PI) / 180) * radius,
          y: Math.sin((rotate * Math.PI) / 180) * radius,
        },
      });
    }
    setNoteElements(items);
  };

  const rebuildCircle = (notes: TFile[]) => {
    const num = parseInt(numNodes);
    const type = 1;
    const start = -90;
    const slice = (360 * type) / num;

    const items: Elements = [];
    let i;
    for (i = 0; i < num; i++) {
      const rotate = slice * i + start;
      const str_i = i.toString();

      if (selectedNoteIndices.includes(str_i)) {
        items.push({
          id: str_i,
          data: {
            label: notes[i].basename,
            path: notes[i].path,
            selected: true,
          },
          type: "noteNode",
          position: {
            x: Math.cos((rotate * Math.PI) / 180) * radius,
            y: Math.sin((rotate * Math.PI) / 180) * radius,
          },
        });
      } else {
        items.push({
          ...noteElements[i],
        });
      }
    }
    setNoteElements(items);
  };

  const onSelectionChange = (selectedElements: Elements) => {
    const selectedElementIds =
      selectedElements && selectedElements.map((element) => element.id);
    console.log(selectedElementIds);
    setSelectedNoteIndices(selectedElementIds);
    const newElements = noteElements.map((element) => {
      let selected = false;
      if (selectedElementIds && selectedElementIds.includes(element.id)) {
        selected = true;
      }
      return {
        ...element,
        data: {
          ...element.data,
          selected,
        },
      };
    });
    console.log(newElements);
    setNoteElements(newElements);
  };

  const onConnect = useCallback((params) => {
    setNoteElements((els) => addEdge({ ...params }, els));
  }, []);

  const onElementClick = (e: any, element: FlowElement) => {
    const { data } = element;
    if (e.ctrlKey || e.metaKey) {
      plugin.app.workspace.openLinkText(data.path, "", true, false);
    }
  };

  const onLoad = useCallback(
    (rfi: any) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
      }
    },
    [reactflowInstance]
  );

  const onDoubleClick = useCallback(
    (e: any) => {
      console.log(e);
      if (e.target.className == "react-flow__pane") {
        const currentTargetRect = e.currentTarget.getBoundingClientRect();
        const position = {
          x: e.screenX - 0.5 * currentTargetRect.width - 50,
          y: e.screenY - 0.5 * currentTargetRect.height + 115,
        };
        console.log(position);
        const newElements = noteElements.map((e) => {
          return { ...e };
        });
        console.log(newElements);
        newElements.push({
          id: `${noteElements.length}`,
          data: {
            label: "",
            path: "",
            selected: false,
          },
          type: "noteNode",
          position,
        });
        setNoteElements(newElements);
      }
    },
    [noteElements]
  );

  return (
    <>
      <div
        className="IdeaClock__container"
        style={{ width: "1080px", height: "800px" }}
      >
        {noteElements && (
          <ReactFlow
            elements={noteElements}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onElementClick={onElementClick}
            onLoad={onLoad}
            elementsSelectable={true}
            selectionKeyCode={null}
            multiSelectionKeyCode={"Shift"}
            onSelectionChange={onSelectionChange}
            connectionMode={ConnectionMode.Loose}
            onDoubleClick={onDoubleClick}
            zoomOnDoubleClick={false}
          />
        )}
      </div>
      <SettingsForm
        plugin={plugin}
        noteElements={noteElements}
        numNodes={numNodes}
        setNumNodes={setNumNodes}
        selectedNoteIndices={selectedNoteIndices}
        buildCircle={buildCircle}
        rebuildCircle={rebuildCircle}
      />
    </>
  );
}

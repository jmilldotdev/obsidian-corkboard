import { TFile } from "obsidian";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { addEdge, Elements } from "react-flow-renderer";
import IdeaClockPlugin from "../index";
import { AppContext } from "./clockContext";

export interface NoteInfo {
  index: number;
  title: string;
  path: string;
  rotate: number;
  radius: number;
  rotateReverse: number;
}

export interface SelectedNote {
  index: number | null;
  setSelectedNoteIndex: (index: number) => void;
}

interface IdeaClockViewProps {
  plugin: IdeaClockPlugin;
}

export default function IdeaClockView({
  plugin,
}: IdeaClockViewProps): JSX.Element {
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [numNodes, setNumNodes] = useState("12");
  const [noteElements, setNoteElements] = useState<Elements>([]);
  const [selectedNoteElements, setSelectedNoteElements] = useState<Elements>(
    []
  );
  const radius = 300;

  const randomNotesHandler = async (): Promise<void> => {
    const notes = await plugin.handlegetRandomNotes(parseInt(numNodes));
    postFillHandler(notes);
  };

  const randomNotesFromSearchHandler = async (): Promise<void> => {
    const notes = await plugin.handlegetRandomNotesFromSearch(
      parseInt(numNodes)
    );
    postFillHandler(notes);
  };

  const postFillHandler = (notes: TFile[]): void => {
    setSelectedNoteElements([]);
    buildCircle(notes);
  };

  const buildCircle = (notes: TFile[]) => {
    const num = notes.length;
    const type = 1;
    const start = -90;
    const slice = (360 * type) / num;

    const items: Elements = [];
    let i;
    for (i = 0; i < num; i++) {
      const rotate = slice * i + start;

      items.push({
        id: i.toString(),
        data: { label: notes[i].basename, path: notes[i].path },
        position: {
          x: Math.cos((rotate * Math.PI) / 180) * radius,
          y: Math.sin((rotate * Math.PI) / 180) * radius,
        },
      });
    }
    setNoteElements(items);
  };

  const onConnect = useCallback(
    (params) => setNoteElements((els) => addEdge({ ...params }, els)),
    []
  );

  const onElementClick = (e: any, element: any) => {
    const { data } = element;
    if (e.ctrlKey || e.metaKey) {
      plugin.app.workspace.openLinkText(data.path, "", true, false);
    }
  };

  const onLoad = useCallback(
    (rfi: any) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log("flow loaded:", rfi);
      }
    },
    [reactflowInstance]
  );

  useEffect(() => {
    if (reactflowInstance && noteElements.length > 0) {
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, noteElements.length]);

  const displaySelectedNoteElements = (): string => {
    console.log(selectedNoteElements);
    return selectedNoteElements
      .map((element) => {
        return element.data.label;
      })
      .join(", ");
  };

  return (
    <AppContext.Provider value={plugin.app}>
      <div
        className="IdeaClock__container"
        style={{ width: "700px", height: "700px" }}
      >
        {noteElements && (
          <ReactFlow
            elements={noteElements}
            onConnect={onConnect}
            onElementClick={onElementClick}
            onLoad={onLoad}
            elementsSelectable={true}
            selectionKeyCode={null}
            multiSelectionKeyCode={"Shift"}
            onSelectionChange={(elements) => {
              setSelectedNoteElements(elements);
            }}
          />
        )}
      </div>
      <input
        value={numNodes}
        onChange={(event) => setNumNodes(event.target.value)}
      />
      <button onClick={randomNotesHandler}>Get notes</button>
      <button onClick={randomNotesFromSearchHandler}>
        Get notes from search
      </button>
      <p>
        Selected notes:{selectedNoteElements && displaySelectedNoteElements()}
      </p>
    </AppContext.Provider>
  );
}

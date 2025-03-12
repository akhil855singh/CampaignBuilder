import {
  ReactFlow,
  useNodesState,
  Background,
  MiniMap,
  Controls,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import { initialNodes, initialEdges } from "../Constants/Constants";
import { TextNode } from "./Components/TextNode";
import { useCallback, useMemo, useState } from "react";
import "@xyflow/react/dist/style.css";
import ContactSourceDropdown from "./Components/ContactSourceDropdown/ContactSourceDropdown";
import { ModalView, ButtonActions } from "./Components/ModalView";
import CustomEdge from "./Components/ButtonEdge";
import { ActionsModalView } from "./Components/ActionsModalView/ActionsModalView";
import { DecisionsModalView } from "./Components/DecisionsModalView/DecisionsModalView";
import { DropdownType } from "../Constants/enums";
import { SelectionPopup } from "./Components/SelectionPopup";

interface HandleData {
  id: string;
  position: string;
  coordinate: number[];
  type: DropdownType;
}

let nodeType = {
  text: TextNode,
};

let edgeTypes = {
  button: CustomEdge,
};

function CampaignBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showSelectedPopup, setShowSelectedPopup] = useState(Boolean);
  const [showContactSourceView, setShowContactSourceView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showSelectionsModal, setShowSelectionsModal] = useState("");
  const [isModalActive, setModalActive] = useState(false);
  const [nodeId, setNodeId] = useState("");
  const [mainModalItems, setMainModalItems] = useState<string[]>([]);
  const [modalType, setModalType] = useState("");

  let handleData: HandleData = {
    id: "",
    position: "",
    coordinate: [0],
    type: DropdownType.DECISION,
  };
  const [data, setData] = useState(handleData);

  // ✅ Memoize nodeTypes to avoid re-creation on every render
  const handleHandleClick = useCallback(
    (
      id: string,
      position: string,
      coordinate: number[],
      type: DropdownType
    ) => {
      console.log(
        `Handle clicked ${id} at ${position} with data: and Type: ${type}`,
        coordinate
      );
      handleData = {
        id: id,
        position: position,
        coordinate: coordinate,
        type: type,
      };
      setData(handleData);
      setModalActive(true);
      //   if (position == "Bottom") {
      //     setShowSelectedPopup((prev) => !prev);
      //   }
    },
    []
  );

  // ✅ Memoize nodeTypes to avoid re-creation on every render
  nodeType = useMemo(
    () => ({
      text: (props) => (
        <TextNode {...props} handleHandleClick={handleHandleClick} />
      ),
    }),
    []
  );

  edgeTypes = useMemo(
    () => ({
      button: (props) => <CustomEdge {...props} />,
    }),
    []
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  function handleClick(actions: ButtonActions) {
    switch (actions) {
      case ButtonActions.CANCEL:
        setShowModal(false);
        break;
      case ButtonActions.ADD:
        setShowModal(false);
        setShowContactSourceView(false);
        break;
    }
  }

  function handleModalClick() {
    setShowModal(true);
  }

  function updateHandleData(type: DropdownType) {
    console.log("type coming from selection model", type);
    handleData = {
      id: data.id,
      position: data.position,
      coordinate: data.coordinate,
      type: type,
    };
    setData(handleData);
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeType}
      edgeTypes={edgeTypes} // not working yet
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: "#fff", position: "fixed" }}
    >
      {showModal && (
        // <ActionsModalView handleClick={action => handleClick(action)} />
        <ModalView
          id={nodeId}
          items={mainModalItems}
          type={modalType}
          handleClick={(action) => handleClick(action)}
        />
      )}
      {showContactSourceView && (
        <ContactSourceDropdown handleItemClick={handleModalClick} />
      )}

      {isModalActive && (
        <SelectionPopup
          parentNodeId={data.id}
          type={data.type}
          closeModal={() => setModalActive(false)}
          parentPosition={{
            x: data.coordinate[0],
            y: data.coordinate[1],
          }}
          openModal={(type: DropdownType) => updateHandleData(type)}
        />
      )}

      <Controls />
      <MiniMap pannable zoomable />
      <Background />
    </ReactFlow>
  );
}

export default CampaignBuilder;

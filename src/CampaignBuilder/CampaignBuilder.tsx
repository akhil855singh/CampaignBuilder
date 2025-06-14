import {
  ReactFlow,
  useNodesState,
  Background,
  MiniMap,
  Controls,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "@xyflow/react";
import { initialNodes, initialEdges } from "../Constants/Constants";
import { TextNode } from "./Components/TextNode";
import { useCallback, useEffect, useMemo, useState } from "react";
import ContactSourceDropdown from "./Components/ContactSourceDropdown/ContactSourceDropdown";
import { ModalView, ButtonActions } from "./Components/ModalView";
import CustomEdge from "./Components/ButtonEdge";
import { DropdownType } from "../Constants/enums";
import { SelectionPopup } from "./Components/SelectionPopup";
import "@xyflow/react/dist/style.css";
import { position } from "@chakra-ui/react";

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
  const { getNodes } = useReactFlow();
  const [showContactSourceView, setShowContactSourceView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isModalActive, setModalActive] = useState(false);
  const [decisionModalActive, setDecisionModalActive] = useState(false);
  const [mainModalItems, setMainModalItems] = useState<string[]>([]);
  const [modalType, setModalType] = useState("");
  const [editedId, setEditedId] = useState("");
  const [copyNode, setCopyNode] = useState({});
  const [isFirstNode, setIsFirstNode] = useState(false);

  type NodeType = {
    id: string;
    positionX: string;
    positionY: string;
  };
  let nodesDictionary: Record<string, NodeType[]> = {};
  let nodeId = "";

  let handleData: HandleData = {
    id: "",
    position: "",
    coordinate: [0],
    type: DropdownType.DECISION,
  };
  const [data, setData] = useState(handleData);

  useEffect(() => {
    if (nodes.length == 0) {
      setShowContactSourceView(true);
    }
    nodesDictionary = {};
    const nodesArray = [];
    for (const node of getNodes()) {
      const newNode: NodeType = {
        id: node.parentId ? node.id.toString() : "lists",
        positionX: node.position.x.toString(),
        positionY: node.position.y.toString(),
      };
      nodesArray.push(newNode);
    }
    nodesDictionary["nodes"] = nodesArray;
    console.log("nodes dictionary", nodesDictionary);
  }, [nodes]);

  // ✅ Memoize nodeTypes to avoid k-creation on every render
  const handleHandleClick = useCallback(
    (
      id: string,
      position: string,
      coordinate: number[],
      type: DropdownType
    ) => {
      handleData = {
        id: id,
        position: position,
        coordinate: coordinate,
        type: type,
      };
      setData(handleData);

      if (getNodes()[0].id === id) {
        setIsFirstNode(true);
      } else if (getNodes()[0].id !== id) {
        setIsFirstNode(false);
      }
    },
    []
  );

  // ✅ Memoize nodeTypes to avoid re-creation on every render
  nodeType = useMemo(
    () => ({
      text: (props) => (
        <TextNode
          {...props}
          selectionViewActive={(value) => setModalActive(value)}
          copyNode={(node) => setCopyNode(node)}
          updateNode={(id) => updateNodeData(id)}
          setNodes={setNodes}
          handleHandleClick={handleHandleClick}
        />
      ),
    }),
    [setNodes]
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

  const handleClick = useCallback((actions: ButtonActions) => {
    switch (actions) {
      case ButtonActions.CANCEL:
        setShowModal(false);
        break;
      case ButtonActions.ADD:
        setShowModal(false);
        setShowContactSourceView(false);
        break;
      case ButtonActions.UPDATE:
        let allNodes = getNodes();
        allNodes.map((node: any) => {
          if (node.id === nodeId) {
            setModalType(node.mainModalType);
            setMainModalItems(node.data.items);
          }
        });

        let indexOfNode = allNodes.findIndex((n) => n.id === nodeId);
        setEditedId(nodeId);
        if (indexOfNode === 0) {
          setShowModal(true);
        } else {
          setDecisionModalActive(true);
        }
        break;
    }
  }, []);

  function updateNodeData(id: string) {
    nodeId = id;
    handleClick(ButtonActions.UPDATE);
  }

  function handleModalClick(item: string) {
    setModalType(item);
    setShowModal(true);
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeType}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      style={{ background: "#fff" }}
      onPaneClick={() => setModalActive(false)}
    >
      {showModal && (
        <ModalView
          id={editedId}
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
          isFirstNode={isFirstNode}
          nodeCopy={copyNode}
          parentNodeId={data.id}
          type={data.type}
          parentPosition={{
            x: data.coordinate[0],
            y: data.coordinate[1],
          }}
          closeSelectionOptions={() => setModalActive(false)}
        />
      )}

      <Controls />
      <MiniMap pannable zoomable />
      <Background />
    </ReactFlow>
  );
}

export default CampaignBuilder;

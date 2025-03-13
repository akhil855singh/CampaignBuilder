import React, { useCallback, useState } from "react";
import { Handle, Position, useReactFlow, Node } from "@xyflow/react";
import { DropdownType, SelectionPopup } from "./SelectionPopup";
import { PiCopySimple } from "react-icons/pi";
import { nanoid } from "nanoid";

interface Props {
  id: string;
  data: {
    label: string;
    type: DropdownType.ACTION | DropdownType.CONDITION | DropdownType.DECISION;
  }
  setNodes: React.Dispatch<React.SetStateAction<any[]>>
  positionAbsoluteX: number
  positionAbsoluteY: number
  handleHandleClick: (
    nodeId: string,
    position: string,
    coordinate: number[],
    type: DropdownType
  ) => void;
  updateNode: (id: string) => void
  copyNode: (node: Node) => void
}

function TextNode({
  id,
  data,
  setNodes,
  positionAbsoluteX,
  positionAbsoluteY,
  handleHandleClick,
  updateNode,
  copyNode
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalActive, setModalActive] = useState(false);
  const { getNodes } = useReactFlow()

  const handleClick = useCallback((
    id: string,
    position: string,
    coordinate: number[],
    type: DropdownType
  ) => {
    handleHandleClick(id, position, coordinate, type);
  }, [handleHandleClick]);

  // Handle Delete Action
  const handleDelete = useCallback(() => {
    setNodes((prevNodes) => {
      return prevNodes.filter((_, idx) => {
        const nodeIndex = prevNodes.findIndex(n => n.id === id)
        return idx < nodeIndex
      });
    });
  }, [id, setNodes])

  const handleCopyNode = useCallback(() => {
    let allNodes = getNodes()
    let nodeToClone = allNodes.find(node => node.id === id)
    if (!nodeToClone) return;

    const newNode = {
      ...nodeToClone,
      id: nanoid(),
      position: {
        x: nodeToClone.position.x + 50,
        y: nodeToClone.position.y + 50,
      },
    };
    copyNode(newNode)
  }, [getNodes, setNodes, id])

  return (
    <div
      style={ {
        width: 160,
        height: 60,
        background: "#fff",
        borderRadius: 8,
        border: "1px solid #2c3e50",
        padding: "10px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
      } }
      onMouseEnter={ () => setIsHovered(true) }
      onMouseLeave={ () => setIsHovered(false) }
    >
      {/* Handles on all sides */ }
      { data?.type && (
        <Handle
          type="target"
          position={ Position.Top }
          style={ {
            background: "blue",
            width: 20,
            height: 20,
            marginBottom: 10,
          } }
          onClick={ (e) =>
            handleClick(id, "Top", [e.clientX, e.clientY], data.type)
          }
        />
      ) }

      { [DropdownType.CONDITION, DropdownType.DECISION].includes(data.type) && (
        <div
          style={ {
            display: "flex",
            position: "absolute",
            bottom: 0,
            width: "100%",
            justifyContent: "space-evenly",
            left: 0,
          } }
        >
          <Handle
            type="source"
            id="BottomLeft"
            className="resizer-node__handle"
            position={ Position.Bottom }
            style={ { background: "green", width: 20, height: 20, left: "25%" } }
            onClick={ (e) => {
              e.preventDefault();
              handleClick(id, "BottomLeft", [e.clientX, e.clientY], data.type);
            } }
          />
          <Handle
            type="source"
            id="BottomRight"
            position={ Position.Bottom }
            style={ { background: "red", width: 20, height: 20, left: "75%" } }
            onClick={ (e) => {
              e.preventDefault();
              handleClick(id, "BottomRight", [e.clientX, e.clientY], data.type);
            } }
          />
        </div>
      ) }
      { (data.type === DropdownType.ACTION || !data?.type) && (
        <Handle
          type="source"
          id="BottomRight"
          position={ Position.Bottom }
          style={ { background: "#d5d4d4", width: 20, height: 20 } }
          onClick={ (e) => {
            e.preventDefault();
            handleClick(id, "Bottom", [e.clientX, e.clientY], data.type);
          } }
        />
      ) }

      { !data?.type && (
        <Handle
          type="source"
          position={ Position.Right }
          style={ { background: "tomato", width: 20, height: 20 } }
          onClick={ (e) =>
            handleClick(id, "Right", [e.clientX, e.clientY], data.type)
          }
        />
      ) }
      { !data?.type && (
        <Handle
          type="target"
          position={ Position.Left }
          style={ { background: "red", width: 20, height: 20 } }
          onClick={ (e) =>
            handleClick(id, "Left", [e.clientX, e.clientY], data.type)
          }
        />
      ) }

      {/* Node Content */ }
      <p style={ { color: "#000" } }>{ data.label }</p>

      {/* Edit & Delete Buttons */ }
      { isHovered && (
        <div
          style={ {
            position: "absolute",
            top: -10,
            right: -7,
            display: "flex",
            gap: 2,
          } }
        >
          <button
            onClick={ () => handleCopyNode() }
            style={ {
              background: "#357ABD",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: 20,
              height: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: "bold",
            } }
          >
            <PiCopySimple />
          </button>
          <button
            onClick={ () => updateNode(id) }
            style={ {
              background: "#357ABD",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: 20,
              height: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: "bold",
            } }
          >
            ✎
          </button>
          <button
            onClick={ handleDelete }
            style={ {
              background: "#E74C3C",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: 20,
              height: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: "bold",
            } }
          >
            ✖
          </button>
        </div>
      ) }

      { isModalActive && (
        <SelectionPopup
          parentNodeId={ id }
          type={ data.type }
          closeModal={ () => setModalActive(false) }
          parentPosition={ {
            x: positionAbsoluteX,
            y: positionAbsoluteY,
          } }
        />
      ) }
    </div>
  );
}

export { TextNode };

import React, { useCallback, useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import SelectionPopup from "./SelectionPopup";

export interface TextNodeProps {
    id: string;
    data: {
        label: string;
        type?: 'action' | 'condition' | 'decision' | undefined;
    };
    setNodes: React.Dispatch<React.SetStateAction<any[]>>;
    // handleHandleClick: (nodeId: string, position: string, coordinate: number[]) => void;
}

export function TextNode(props: any) {
    const { id, data, setNodes, positionAbsoluteX, positionAbsoluteY } = props;
    const [isHovered, setIsHovered] = useState(false);
    const [isModalActive, setModalActive] = useState(false);

    // Handle Edit Action
    const handleEdit = () => {
        const newText = prompt("Edit text:", data.label);
        if (newText) {
            setNodes((nds: any) =>
                nds.map((node: any) =>
                    node.id === id ? { ...node, data: { ...node.data, label: newText } } : node
                )
            );
        }
    };

    const handleClick = useCallback((id: string, position: string, coordinate: number[]) => {
        setModalActive(prevState => !prevState);
    }, [])

    // Handle Delete Action
    const handleDelete = () => {
        // setNodes((nds) => nds.filter((node) => node.id !== id));
    };

    return (
        <div
            style={{
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
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Handles on all sides */}
            {
                data?.type && <Handle
                    type="target"
                    position={Position.Top}
                    style={{ background: "blue", width: 20, height: 20, marginBottom: 10 }}
                    onClick={(e) => handleClick(id, "Top", [e.clientX, e.clientY])}
                />
            }

            {
                (['condition', "decision"].includes(data.type)) &&
                <div style={{
                    display: 'flex',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    justifyContent: 'space-evenly',
                    left: 0
                }}>
                    <Handle
                        type="source"
                        id="BottomLeft"
                        className="resizer-node__handle"
                        position={Position.Bottom}
                        style={{ background: "green", width: 20, height: 20, left: '25%' }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick(id, "BottomLeft", [e.clientX, e.clientY])
                        }}
                    />
                    <Handle
                        type="source"
                        id="BottomRight"
                        position={Position.Bottom}
                        style={{ background: "red", width: 20, height: 20, left: '75%' }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick(id, "BottomRight", [e.clientX, e.clientY])
                        }}
                    />
                </div>
            }
            { (data.type === "action" || !data?.type) &&
                 <Handle
                 type="source"
                 id="BottomRight"
                 position={Position.Bottom}
                 style={{ background: "#d5d4d4", width: 20, height: 20 }}
                 onClick={(e) => {
                     e.preventDefault();
                     handleClick(id, "Bottom", [e.clientX, e.clientY])
                 }}
             />
            }

            {
                !data?.type && <Handle
                    type="source"
                    position={Position.Right}
                    style={{ background: "tomato", width: 20, height: 20 }}
                    onClick={(e) => handleClick(id, "Right", [e.clientX, e.clientY])}
                />
            }
            {
                !data?.type && <Handle
                    type="target"
                    position={Position.Left}
                    style={{ background: "red", width: 20, height: 20 }}
                    onClick={(e) => handleClick(id, "Left", [e.clientX, e.clientY])}
                />
            }

            {/* Node Content */}
            <p style={{ color: "#000" }}>{data.label}</p>

            {/* Edit & Delete Buttons */}
            {isHovered && (
                <div style={{ position: "absolute", top: -10, right: -7, display: "flex", gap: 2 }}>
                    <button
                        onClick={handleEdit}
                        style={{
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
                        }}
                    >
                        ✎
                    </button>
                    <button
                        onClick={handleDelete}
                        style={{
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
                        }}
                    >
                        ✖
                    </button>
                </div>
            )}

            {
                isModalActive && <SelectionPopup
                    parentNodeId={id}
                    type={data.type}
                    closeModal={() => setModalActive(false)}
                    parentPosition={{
                        x: positionAbsoluteX,
                        y: positionAbsoluteY
                    }}
                />
            }
        </div>
    );
}

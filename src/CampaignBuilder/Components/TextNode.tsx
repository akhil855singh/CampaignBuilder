import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

export interface TextNodeProps {
    id: string;
    data: {
        label: string;
    };
    setNodes: React.Dispatch<React.SetStateAction<any[]>>;
    handleHandleClick: (nodeId: string, position: string, coordinate: number[]) => void;
}

export function TextNode({ id, data, setNodes, handleHandleClick }: TextNodeProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Handle Edit Action
    const handleEdit = () => {
        const newText = prompt("Edit text:", data.label);
        if (newText) {
            setNodes((nds) =>
                nds.map((node) =>
                    node.id === id ? { ...node, data: { ...node.data, label: newText } } : node
                )
            );
        }
    };

    // Handle Delete Action
    const handleDelete = () => {
        setNodes((nds) => nds.filter((node) => node.id !== id));
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
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: "red", width: 20, height: 20}}
                onClick={(e) => handleHandleClick(id, "Left", [e.clientX, e.clientY])}
            />
            <Handle
                type="target"
                position={Position.Top}
                style={{ background: "blue", width: 20, height: 20}}
                onClick={(e) => handleHandleClick(id, "Top", [e.clientX, e.clientY])}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                style={{ background: "orange", width: 20, height: 20 }}
                onClick={(e) => handleHandleClick(id, "Bottom", [e.clientX, e.clientY])}
            />
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: "tomato" , width: 20, height: 20}}
                onClick={(e) => handleHandleClick(id, "Right", [e.clientX, e.clientY])}
            />

            {/* Node Content */}
            <p style={{color: "#000"}}>{data.label}</p>
            
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
        </div>
    );
}

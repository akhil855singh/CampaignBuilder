import { ReactFlow, useNodesState, Background, MiniMap, Controls, useEdgesState, addEdge } from '@xyflow/react';
import { initialNodes, initialEdges } from '../Constants/Constants';
import { TextNode, TextNodeProps } from './Components/TextNode';
import ContactSourceView from './Components/ContactSourceView';
import SelectionPopup from './Components/SelectionPopup';
import { useCallback, useMemo, useState } from 'react';
import '@xyflow/react/dist/style.css';
import ContactSourceDropdown from './Components/ContactSourceDropdown/ContactSourceDropdown';
import { ModalView, ButtonActions, ButtonActionType } from './Components/ModalView';

interface HandleData {
    id: string,
    position: string,
    coordinate: number[]
}

let nodeType = {
    text: TextNode
}

function CampaignBuilder() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const [showSelectedPopup, setShowSelectedPopup] = useState(Boolean)
    const [showContactSourceView, setShowContactSourceView] = useState(true)
    const [showModal, setShowModal] = useState(false)
    let handleData: HandleData = { id: "", position: "", coordinate: [0] }
    const [data, setData] = useState(handleData)
    let nodeId = 1

    // ✅ Memoize nodeTypes to avoid re-creation on every render
    const handleHandleClick = useCallback((id: string, position: string, coordinate: number[]) => {
        console.log(`Handle clicked ${id} at ${position} with data:`, coordinate);
        handleData = {
            id: id,
            position: position,
            coordinate: coordinate
        }
        setData(handleData)
        if (position == "Bottom") {
            setShowSelectedPopup((prev) => !prev)
        }
    }, []);

    // ✅ Memoize nodeTypes to avoid re-creation on every render
    nodeType = useMemo(() => ({
        text: (props) => <TextNode { ...props } handleHandleClick={ handleHandleClick } />
    }), [handleHandleClick]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    function handleClick(actions: ButtonActionType) {
        switch (actions) {
            case ButtonActions.CANCEL:
                setShowModal(false)
                break
            case ButtonActions.ADD:
                setShowModal(false)
                setShowContactSourceView(false)
                break
        }
    }

    function handleModalClick() {
        setShowModal(true)
    }

    return (
        <ReactFlow
            nodes={ nodes }
            edges={ edges }
            nodeTypes={ nodeType }
            onNodesChange={ onNodesChange }
            onEdgesChange={ onEdgesChange }
            onConnect={ onConnect }
            style={ { background: "#fff", position: "fixed"} }
        >
            { showModal && (
                <ModalView handleClick={ (action) => handleClick(action) } />
            ) }
            { showContactSourceView && (
                <ContactSourceDropdown handleItemClick={ handleModalClick } />
            ) }
            { showSelectedPopup && (
                <div style={ { width: 700, position: "absolute", left: data.coordinate[0] - 350, top: (data.coordinate[1] + 10) } }><SelectionPopup /></div>
            ) }

            <Controls />
            <MiniMap pannable zoomable />
            <Background />
        </ReactFlow>
    )
}

export default CampaignBuilder

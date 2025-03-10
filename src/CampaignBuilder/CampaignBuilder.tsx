import { ReactFlow, useNodesState, Background, MiniMap, Controls, useEdgesState, addEdge } from '@xyflow/react';
import { initialNodes, initialEdges } from '../Constants/Constants';
import { TextNode } from './Components/TextNode';
import ContactSourceView from './Components/ContactSourceView';
import SelectionPopup from './Components/SelectionPopup';
import { useCallback, useMemo, useState } from 'react';
import '@xyflow/react/dist/style.css';
import ContactSourceDropdown from './Components/ContactSourceDropdown/ContactSourceDropdown';
import { ModalView, ButtonActions, ButtonActionType } from './Components/ModalView';
import { text } from 'framer-motion/client';
import SelectDropdown from '../components/SelectDropdown';
import CustomEdge from './Components/ButtonEdge';

interface HandleData {
    id: string,
    position: string,
    coordinate: number[]
}

let nodeType = {
    text: TextNode
}

let edgeTypes = {
    button: CustomEdge,
  };

function CampaignBuilder() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
    const [showSelectedPopup, setShowSelectedPopup] = useState(Boolean)
    const [showContactSourceView, setShowContactSourceView] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [lastNodeId, setLastNodeId] = useState("1")
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
    }), []);

    edgeTypes = useMemo(() => ({
        button: (props) => <CustomEdge { ...props } />
    }), []);

    const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

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
            nodeTypes={ nodeType}
            edgeTypes={ edgeTypes }// not working yet
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

            <Controls />
            <MiniMap pannable zoomable />
            <Background />
        </ReactFlow>
    )
}

export default CampaignBuilder

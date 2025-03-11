import { ReactFlow, useNodesState, Background, MiniMap, Controls, useEdgesState, addEdge } from '@xyflow/react';
import { initialNodes, initialEdges } from '../Constants/Constants';
import { TextNode } from './Components/TextNode';
import { useCallback, useMemo, useState } from 'react';
import '@xyflow/react/dist/style.css';
import ContactSourceDropdown from './Components/ContactSourceDropdown/ContactSourceDropdown';
import { ModalView, ButtonActions } from './Components/ModalView';
import CustomEdge from './Components/ButtonEdge';
import { ActionsModalView } from './Components/ActionsModalView/ActionsModalView';

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
    let handleData: HandleData = { id: "", position: "", coordinate: [0] }
    const [data, setData] = useState(handleData)

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

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

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
            edgeTypes={ edgeTypes }// not working yet
            onNodesChange={ onNodesChange }
            onEdgesChange={ onEdgesChange }
            onConnect={ onConnect }
            style={ { background: "#fff", position: "fixed" } }
        >
            { showModal && (
                // <ActionsModalView handleClick={action => handleClick(action)} />
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

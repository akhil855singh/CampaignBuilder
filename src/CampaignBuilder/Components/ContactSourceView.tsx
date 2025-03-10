import { useCallback, useState, useEffect, useRef } from 'react';
import { addEdge, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { initialEdges } from '../../Constants/Constants';

let data = ["hell", "Mello", "Gello", "hell", "Mello", "Gello"]

function ContactSourceView() {
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [hoveredIndex, setHoveredIndex] = useState(0);
    const [openModel, setOpenModal] = useState(false)
    const [inputValue, setInputValue] = useState("");
    const [filteredData, setFilteredData] = useState(data)
    const [showInputView, setShowInputView] = useState(true)

    const dropdownRef = useRef(null);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    // Handle edge deletion when clicked
    const onEdgeClick = useCallback(
        (event, edge) => {
            event.stopPropagation(); // Prevent unwanted events
            setEdges((eds) => eds.filter((e) => e.id !== edge.id)); // Remove edge
        },
        [setEdges]
    );

    // 🔹 Filter data dynamically based on input
    useEffect(() => {
        if (inputValue.trim() === "") {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter(item => {
                if (inputValue.length > 0) {
                    return item.toLowerCase().includes(inputValue.toLowerCase())
                }
            }));
        }
    }, [inputValue, data]);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowInputView(false);
        }
    }

    <div
        onClick={ handleClickOutside }
        style={ {
            position: "relative",
            top: 100,
            right: -screen.width / 3,
            width: 500,
            height: 200,
            justifyItems: "center",
            zIndex: 5
        } }>
        <div style={ {
            position: "relative",
            width: 200,
            height: 45,
            border: "1.5px solid #fdba33",
            borderRadius: 8,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            paddingTop: "10px",
            paddingBottom: "15px"
        } }>
            <i className='mr-sm ri-team-line'></i>
            <p style={ { fontSize: "13px" } }>Add a contact source...</p>
        </div>
        <div style={ {
            position: "relative",
            top: -10,
            width: 300,
            height: 80,
            border: "2px solid #cdcdcd",
            borderRadius: 8,
            background: "#ededed",
            padding: "10px 20px",
            marginBottom: "5px"
        } } >
            <p style={ { fontSize: "16px", marginBottom: "5px" } }>Contact Sources</p>
            <div
                ref={ dropdownRef } onClick={ () => showInputView ? setShowInputView(false) : [setShowInputView(true), setHoveredIndex(0)] } style={ { width: 260, height: 32, paddingLeft: 8, border: "1px solid #d5d5d5", background: "#fff", display: "flex", alignItems: "center", gap: 165 } }>
                <p style={ { fontSize: "13px", display: "flex", alignItems: "center" } }>Choose me...</p>
                <i className="ri-arrow-drop-down-fill"></i>
            </div>
            { showInputView &&
                <div style={ {
                    width: 260, height: 150,
                    overflow: "hidden",
                    background: "#fff",
                    borderRadius: "0 0 10px 10px",
                    boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.4)"
                } }>
                    <input
                        type="text"
                        value={ inputValue }
                        onChange={ (e) => {
                            setInputValue(e.target.value)
                            if (e.target.value.length != 0) {
                                filteredData.filter(item => {
                                    setFilteredData(item.includes(e.target.value))
                                })
                            } else {
                                setFilteredData(data)
                            }
                        } }
                        style={ { height: 30, width: 250, margin: "5px 25px 0 5px", paddingLeft: "5px", paddingRight: "25px" } }
                        onClick={ (e) => e.stopPropagation() }
                    />
                    <i className="ri-search-line" style={ { position: "absolute", right: 30, top: 77 } }></i>
                    <div style={ { height: "150px", overflowY: "auto" } }>
                        { filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <p
                                    key={ index }
                                    style={ {
                                        color: hoveredIndex === index ? "#fff" : "gray",
                                        padding: 8,
                                        margin: "0 3.5px 0 3.5px",
                                        marginTop: 10,
                                        background: hoveredIndex === index ? "red" : "",
                                    } }
                                    onMouseEnter={ () => setHoveredIndex(index) }
                                    onMouseLeave={ () => setHoveredIndex(null) }
                                    onClick={ () => setOpenModal(true) }
                                >
                                    { item }
                                </p>
                            ))
                        ) : (
                            <p style={ { padding: "10px", color: "gray" } }>No results found</p>
                        ) }
                    </div>
                </div>
            }
        </div>
    </div>
}

export default ContactSourceView
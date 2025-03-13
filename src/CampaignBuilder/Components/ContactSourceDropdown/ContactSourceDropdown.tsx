import { useReactFlow } from "@xyflow/react";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { MainNodeTypes } from "../../../Constants/enums";

interface Props {
  handleItemClick: (item: string) => void;
}

let data = [MainNodeTypes.CONTACT_SEGMENTS, MainNodeTypes.CAMPAIGN_FORMS];

function ContactSourceDropdown({ handleItemClick }: Props) {
  const [showInputView, setShowInputView] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const { setNodes } = useReactFlow();
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowInputView(false);
    }
  };

  // ✅ Memoize nodeTypes to avoid re-creation on every render
  function handleClickedItem(item: String) {
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: nanoid(),
        type: "text",
        position: {
          x: screen.width / 2.5,
          y: screen.height / 4,
        },
        data: {
          label: item,
        },
      },
    ]);
  }

  return (
    <div
      onClick={ (e) => handleClickOutside(e) }
      style={ {
        position: "relative",
        top: 100,
        right: -screen.width / 3,
        width: 500,
        height: 200,
        justifyItems: "center",
        zIndex: 5,
      } }
    >
      <div
        style={ {
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
          paddingBottom: "15px",
          pointerEvents: "none",
          cursor: "default",
        } }
      >
        <i className="mr-sm ri-team-line"></i>
        <p style={ { fontSize: "13px", color: "#000" } }>
          Add a contact source...
        </p>
      </div>
      <div
        style={ {
          position: "relative",
          top: -10,
          width: 300,
          height: 80,
          border: "2px solid #cdcdcd",
          borderRadius: 8,
          background: "#ededed",
          padding: "10px 20px",
          marginBottom: "5px",
        } }
      >
        <p style={ { fontSize: "16px", marginBottom: "5px", color: "#000" } }>
          Contact Sources
        </p>
        <div
          ref={ dropdownRef }
          onClick={ () =>
            showInputView
              ? setShowInputView(false)
              : [setShowInputView(true), setHoveredIndex(0)]
          }
          style={ {
            width: 260,
            height: 32,
            paddingLeft: 8,
            border: "1px solid #d5d5d5",
            background: "#fff",
            display: "flex",
            alignItems: "center",
          } }
        >
          <p style={ { fontSize: "13px", color: "#000" } }>Choose me...</p>
          <i className="ri-arrow-drop-down-fill"></i>
        </div>
        { showInputView && (
          <div
            style={ {
              width: 260,
              height: 150,
              overflow: "hidden",
              background: "#fff",
              borderRadius: "0 0 10px 10px",
              boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.4)",
            } }
          >
            <input
              type="text"
              value={ inputValue }
              onChange={ (e) => {
                setInputValue(e.target.value);
                if (e.target.value.length != 0) {
                  setFilteredData(
                    filteredData.filter((item) =>
                      item.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                  );
                } else {
                  setFilteredData(data);
                }
              } }
              style={ {
                background: "#fff",
                color: "#000",
                border: "1px solid #000",
                borderRadius: 5,
                height: 30,
                width: 250,
                margin: "5px 25px 0 5px",
                paddingLeft: "5px",
                paddingRight: "25px",
              } }
              onClick={ (e) => e.stopPropagation() }
            />
            <i
              className="ri-search-line"
              style={ { position: "absolute", right: 30, top: 77 } }
            ></i>
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
                    onClick={ () => handleItemClick(item) }
                    // onClick={() => [handleItemClick(), handleClickedItem(item)]}
                    onMouseEnter={ () => setHoveredIndex(index) }
                    onMouseLeave={ () => setHoveredIndex(null) }
                  // onClick={ () => setOpenModal(true) }
                  >
                    { item }
                  </p>
                ))
              ) : (
                <p style={ { padding: "10px", color: "gray" } }>
                  No results found
                </p>
              ) }
            </div>
          </div>
        ) }
      </div>
    </div>
  );
}

export default ContactSourceDropdown;
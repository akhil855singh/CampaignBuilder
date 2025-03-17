import { Button, Flex } from "@chakra-ui/react";
import { useReactFlow } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { RiCornerRightUpLine } from "react-icons/ri";
import { contactActions } from "./ActionsModalView/ActionsModaViewModal";
import { DropdownType } from "./SelectionPopup";
import {
  contactDecisions,
  contactConditions,
} from "./DecisionsModalView/DecisionsModal";

interface Props {
  parentId: string;
  dropdownProps: {
    dropdownType: DropdownType;
    dropdownColor: string;
  };
  parentPosition: {
    x: number;
    y: number;
  };
  selectedOption: (
    modalType: string,
    selectedItem: string,
    parentId: string,
    dropdownProps: { dropdownType: DropdownType; dropdownColor: string }
  ) => void;
  backBtn: () => void;
  closeDropdown: () => void;
}

let data: string[] = [];

function DropdownView({
  parentId,
  dropdownProps,
  parentPosition,
  selectedOption,
  backBtn,
  closeDropdown,
}: Props) {
  const [showInputView, setShowInputView] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    switch (dropdownProps.dropdownType) {
      case DropdownType.ACTION:
        data = contactActions;
        setFilteredData(data);
        break;
      case DropdownType.CONDITION:
        data = contactConditions;
        setFilteredData(data);
        break;
      case DropdownType.DECISION:
        data = contactDecisions;
        setFilteredData(data);
        break;
      default:
        setFilteredData(data);
        break;
    }
  }, [dropdownProps.dropdownType]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowInputView(false);
    }
  };

  const { getNodes } = useReactFlow();

  const triggerHandleClick = (nodeId: string) => {
    const node = getNodes().find((n) => n.id === nodeId);
    if (node && node.data?.handleClickRef?.current) {
      node.data.handleClickRef.current("Bottom", [100, 200]); // Example
    }
  };

  return (
    <div
      onClick={(e) => handleClickOutside(e)}
      style={{
        position: "relative",
        left: (parentPosition.x - 280) / 2,
        width: 500,
        height: 200,
        zIndex: 5,
      }}
    >
      <div
        style={{
          position: "relative",
          top: -10,
          width: 300,
          height: 80,
          border: "2px solid #cdcdcd",
          borderRadius: 8,
          background: "#ededed",
          padding: "10px 20px",
          marginBottom: "5px",
        }}
      >
        <Flex justifyContent="space-between">
          <p style={{ fontSize: "16px", marginBottom: "5px", color: "#000" }}>
            {dropdownProps.dropdownType}
          </p>
          <Button
            _focus={{ outline: "none", border: "none" }}
            _hover={{ bg: dropdownProps.dropdownColor, border: "none" }}
            w="3"
            leftIcon={
              <RiCornerRightUpLine
                style={{ fontSize: 20, transform: "translate(4px, 0px)" }}
                onClick={backBtn}
              />
            }
            bg={dropdownProps.dropdownColor}
            h={7}
          ></Button>
        </Flex>
        <div
          ref={dropdownRef}
          onClick={() =>
            showInputView
              ? setShowInputView(false)
              : [setShowInputView(true), setHoveredIndex(0)]
          }
          style={{
            width: 260,
            height: 32,
            paddingLeft: 8,
            border: "1px solid #d5d5d5",
            background: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "13px", color: "#000" }}>Choose me...</p>
          <i className="ri-arrow-drop-down-fill"></i>
        </div>
        {showInputView && (
          <div
            style={{
              width: 260,
              height: 150,
              overflow: "hidden",
              background: "#fff",
              borderRadius: "0 0 10px 10px",
              boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.4)",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
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
              }}
              style={{
                background: "#fff",
                color: "#000",
                border: "1px solid #000",
                borderRadius: 5,
                height: 30,
                width: 250,
                margin: "5px 25px 0 5px",
                paddingLeft: "5px",
                paddingRight: "25px",
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <i
              className="ri-search-line"
              style={{ position: "absolute", right: 30, top: 77 }}
            ></i>
            <div style={{ height: "150px", overflowY: "auto" }}>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <p
                    key={index}
                    style={{
                      color: hoveredIndex === index ? "#fff" : "gray",
                      padding: 8,
                      margin: "0 3.5px 0 3.5px",
                      marginTop: 10,
                      background: hoveredIndex === index ? "red" : "",
                    }}
                    onClick={() => [
                      selectedOption(
                        item,
                        parentId,
                        dropdownProps,
                        parentPosition
                      ),
                      closeDropdown,
                    ]}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    // onClick={ () => setOpenModal(true) }
                  >
                    {item}
                  </p>
                ))
              ) : (
                <p style={{ padding: "10px", color: "gray" }}>
                  No results found
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DropdownView;

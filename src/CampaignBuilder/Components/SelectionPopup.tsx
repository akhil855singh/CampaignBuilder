import {
  Text,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import DropdownView from "./DropdownView";
import { DropdownType } from "../../Constants/enums";
import { useReactFlow } from "@xyflow/react";
import { nanoid } from "nanoid";
import { DecisionsModalView } from "./DecisionsModalView/DecisionsModalView";

interface Props {
  parentNodeId: string;
  closeModal: () => void;
  type: DropdownType.ACTION | DropdownType.CONDITION | DropdownType.DECISION;
  parentPosition: {
    x: number;
    y: number;
  };
}

const SelectionPopup = ({
  closeModal,
  type,
  parentNodeId = "",
  parentPosition,
}: Props) => {
  const rootRef = useRef(null);
  const [selectedType, setSelectedType] = useState({
    buttonText: "",
    title: "",
    type: DropdownType,
    description: "",
    color: "",
  });

  const [selectedItem, setSelectedItem] = useState("");
  const [close, setClose] = useState(false);
  const { setNodes, setEdges } = useReactFlow();
  const [blocks, setBlocks] = useState([
    {
      buttonText: "Select",
      title: "Action",
      type: DropdownType.ACTION,
      description:
        "An action is something executed by Vinmax (e.g. send an email).",
      color: "#e90010",
    },
    {
      buttonText: "Select",
      title: "Condition",
      type: DropdownType.CONDITION,
      description:
        "A condition is based on known profile field values or submitted form data.",
      color: "#f3533e",
    },
  ]);

  useEffect(() => {
    console.log("popup type", type);
    if (
      type === DropdownType.ACTION ||
      type === DropdownType.CONDITION ||
      !type
    ) {
      setBlocks([
        {
          buttonText: "Select",
          title: "Decision",
          type: DropdownType.DECISION,
          description:
            "A decision is a condition that splits the flow of the campaign based on the profile field values or submitted form data.",
          color: "#00B49C",
        },
        {
          buttonText: "Select",
          title: "Action",
          type: DropdownType.ACTION,
          description:
            "An action is something executed by Vinmax (e.g. send an email).",
          color: "#e90010",
        },
        {
          buttonText: "Select",
          title: "Condition",
          type: DropdownType.CONDITION,
          description:
            "A condition is based on known profile field values or submitted form data.",
          color: "#f3533e",
        },
      ]);
    }
  }, [type]);

  const openSelectionHandlePopup = (item: string) => {
    setClose(true);
    setSelectedItem(item);
  };

  const onChangeHandler = (name: string) => {
    const id = nanoid();
    console.log("for new node", parentNodeId, parentPosition, selectedType);
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        parentId: parentNodeId,
        id: id,
        type: "text",
        connectable: true,
        position: {
          x: parentPosition.x,
          y: parentPosition.y,
        },
        data: {
          label: name,
          type: selectedType.type,
        },
      },
    ]);

    setEdges((prevEdges) => [
      ...prevEdges,
      {
        id: `e${parentNodeId}-${id}`,
        source: parentNodeId,
        target: id,
        type: "smoothstep",
        zIndex: 11,
        animated: true,
        labelBgStyle: { fill: "#fff", fillOpacity: 0.7 },
        labelBgPadding: [2, 4],
        labelBgBorderRadius: 4,
      },
    ]);
    closeModal();
  };

  return (
    <div
      style={ {
        //top: "calc(100% + 20px)",
        top: parentPosition.y + 20,
        left: parentPosition.x - screen.width / 2,
        position: "relative",
        zIndex: 1000,
      } }
    >
      { selectedType.buttonText.length > 0 ? (
        // <SelectDropdown onChange={onChangeHandler} />
        <DropdownView
          parentId={ parentNodeId }
          dropdownProps={ {
            dropdownType: selectedType.type,
            dropdownColor: selectedType.color,
          } }
          parentPosition={ parentPosition }
          selectedOption={ (item: string) => openSelectionHandlePopup(item) }
        />
      ) : (
        <SimpleGrid
          ref={ rootRef }
          spacing={ 4 }
          justifyContent="center"
          display="flex"
          templateColumns="repeat(3, minmax(200px, 1fr))"
        >
          <button onClick={ closeModal }>close</button>
          { blocks.map((block, index) => (
            <Card
              key={ index }
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              borderColor={ block.color }
              style={ { cursor: "pointer", width: "250px" } }
            >
              <CardHeader style={ { background: block.color, color: "white" } }>
                <Heading as="h3" size="md">
                  { block.title }
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>{ block.description }</Text>
              </CardBody>
              <CardFooter>
                <Button
                  onClick={ () => [setSelectedType(block)] }
                  colorScheme="blue"
                >
                  { block.buttonText }
                </Button>
              </CardFooter>
            </Card>
          )) }
        </SimpleGrid>
      ) }
      { close && (
        <DecisionsModalView
          close={ () => setClose(false) }
          add={ (name: string) => onChangeHandler(name) }
          popupType={ selectedItem }
        />
      ) }
    </div>
  );
};

export { SelectionPopup, DropdownType };

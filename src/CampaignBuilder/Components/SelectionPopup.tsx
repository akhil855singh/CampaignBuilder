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

interface Props {
  parentNodeId: string;
  closeModal: () => void;
  type: DropdownType.ACTION | DropdownType.CONDITION | DropdownType.DECISION;
  parentPosition: {
    x: number;
    y: number;
  };
  openModal: (type: string) => void;
}

const SelectionPopup = ({
  closeModal,
  type,
  parentNodeId = "",
  parentPosition,
  openModal,
}: Props) => {
  const rootRef = useRef(null);
  const [selectedType, setSelectedType] = useState({
    buttonText: "",
    title: "",
    type: "",
    description: "",
    color: "",
  });
  const { setNodes, setEdges } = useReactFlow();
  const [blocks, setBlocks] = useState([
    {
      buttonText: "Select",
      title: "Action",
      type: "action",
      description:
        "An action is something executed by Vinmax (e.g. send an email).",
      color: "#e90010",
    },
    {
      buttonText: "Select",
      title: "Condition",
      type: "condition",
      description:
        "A condition is based on known profile field values or submitted form data.",
      color: "#f3533e",
    },
  ]);

  useEffect(() => {
    if ((DropdownType.ACTION, DropdownType.CONDITION.includes(type) || !type)) {
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

  const onChangeHandler = (event: any) => {
    const id = nanoid();
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        parentId: parentNodeId,
        id: nanoid(),
        type: "text",
        connectable: true,
        position: {
          x: parentPosition.x,
          y: parentPosition.y,
        },
        data: {
          label: event.target.value,
          type: selectedType,
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
      style={{
        top: "calc(100% + 20px)",
        position: "absolute",
        zIndex: 1000,
      }}
    >
      {selectedType.buttonText.length > 0 ? (
        // <SelectDropdown onChange={onChangeHandler} />
        <DropdownView
          parentId={parentNodeId}
          dropdownProps={{
            dropdownType: selectedType.type,
            dropdownColor: selectedType.color,
          }}
          openModal={openModal}
        />
      ) : (
        <SimpleGrid
          ref={rootRef}
          spacing={4}
          justifyContent="center"
          display="flex"
          templateColumns="repeat(3, minmax(200px, 1fr))"
        >
          <button onClick={closeModal}>close</button>
          {blocks.map((block, index) => (
            <Card
              key={index}
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              borderColor={block.color}
              style={{ cursor: "pointer", width: "250px" }}
            >
              <CardHeader style={{ background: block.color, color: "white" }}>
                <Heading as="h3" size="md">
                  {block.title}
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>{block.description}</Text>
              </CardBody>
              <CardFooter>
                <Button
                  onClick={() => [setSelectedType(block)]}
                  colorScheme="blue"
                >
                  {block.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export { SelectionPopup, DropdownType };

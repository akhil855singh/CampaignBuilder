import {
  Text,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import DropdownView from "./DropdownView";
import { DropdownType } from "../../Constants/enums";
import { useReactFlow } from "@xyflow/react";
import { nanoid } from "nanoid";
import { DecisionsModalView } from "./DecisionsModalView/DecisionsModalView";

interface Props {
  isFirstNode: boolean;
  nodeCopy: {};
  parentNodeId: string;
  type: DropdownType.ACTION | DropdownType.CONDITION | DropdownType.DECISION;
  parentPosition: {
    x: number;
    y: number;
  };
  closeSelectionOptions: () => void;
}

const SelectionPopup = ({
  isFirstNode,
  nodeCopy,
  type,
  parentNodeId = "",
  parentPosition,
  closeSelectionOptions,
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
  const { setNodes, setEdges } = useReactFlow();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  function openSelectionHandlePopup(item: string) {
    setSelectedItem(item);
    // closeSelectionOptions()
    setShowModal(true);
  }

  function insertCopiedNode() {
    setNodes((prevNodes) => prevNodes.splice(1, 0, nodeCopy));
  }

  const onChangeHandler = (name: string) => {
    const id = nanoid();
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        parentId: parentNodeId,
        id: id,
        type: "text",
        connectable: true,
        position: {
          x: parentPosition.x - parentPosition.x / 2,
          y: parentPosition.y - parentPosition.y / 2,
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
  };

  return (
    <div
      style={{
        //top: "calc(100% + 20px)",
        top: parentPosition.y + 5,
        left: parentPosition.x / 2,
        position: "relative",
        zIndex: 1000,
      }}
    >
      {showDropdown ? (
        <DropdownView
          position={[parentPosition.y + 20, parentPosition.x]}
          parentId={parentNodeId}
          dropdownProps={{
            dropdownType: selectedType.type,
            dropdownColor: selectedType.color,
          }}
          parentPosition={parentPosition}
          selectedOption={(item: string) => [openSelectionHandlePopup(item)]}
          backBtn={() => setShowDropdown(false)}
        />
      ) : (
        <>
          <SimpleGrid
            ref={rootRef}
            spacing={4}
            justifyContent="center"
            display="flex"
            templateColumns="repeat(3, minmax(200px, 1fr))"
            maxW={250 * 3}
            padding={5}
          >
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
                    onClick={() => [
                      [setSelectedType(block), setShowDropdown(true)],
                    ]}
                    colorScheme="blue"
                  >
                    {block.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>

          {isFirstNode && Object.keys(nodeCopy).length > 0 && (
            <Box
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              boxShadow="sm"
              p={4}
              position="relative"
              w={248 * 3}
            >
              <Box
                h="3px"
                bgGradient="linear(to-r, teal.300, blue.500, orange.400)"
                borderTopRadius="md"
                mb={4}
              />

              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontWeight="bold">Insert cloned event here</Text>
                  <Text color="gray.500">Name: lkjhk</Text>
                  <Text color="gray.500">From: New campaign</Text>
                </Box>
                <Button
                  onClick={() => insertCopiedNode()}
                  textColor="gray.900"
                  size="sm"
                  bg={"rgb(231, 231, 231)"}
                  variant="outline"
                >
                  Insert
                </Button>
              </Flex>
            </Box>
          )}
        </>
      )}
      {showModal && (
        <DecisionsModalView
          close={() => [
            setShowModal(false),
            setShowDropdown(false),
            closeSelectionOptions(),
          ]}
          add={(name: string) => onChangeHandler(name)}
          popupType={selectedItem}
          selectionType={selectedType.type}
        />
      )}
    </div>
  );
};

export { SelectionPopup, DropdownType };

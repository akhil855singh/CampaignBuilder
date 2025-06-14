import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useReactFlow } from "@xyflow/react";
import { nanoid } from "nanoid";
import { ButtonActions, MainNodeTypes } from "../../Constants/enums";
import { LuPencilLine } from "react-icons/lu";

interface Props {
  id: string;
  type: string;
  items: string[];
  handleClick: (actions: ButtonActions) => void;
}

const mainNodeData = [
  "Contact segments",
  "Campaign forms"
]

const segments = [
  "24feb (90023)",
  "25feb (90024)",
  "30 days from today (26)",
  "4 march (90029)",
  "A/B test 1 (90027)",
  "A/B test 2 (90028)",
  "ABP test Feb 25 (90007)",
  "APB_Demo_Segment (90015)",
  "Admin - OnlyRK (90011)",
];

const ModalView = ({ id, type, items, handleClick }: Props) => {
  const { setNodes } = useReactFlow()
  const [selectedSegments, setSelectedSegments] = useState<string[]>(items);

  console.log("ID - ", id)
  useEffect(() => {
    switch (type) {
      case MainNodeTypes.CONTACT_SEGMENTS:
        setSelectedSegments(items)
        break
      case MainNodeTypes.CAMPAIGN_FORMS:
        break
    }
  }, [type])

  const handleSelectSegment = (segment: string) => {
    if (!selectedSegments.includes(segment)) {
      setSelectedSegments([...selectedSegments, segment]);
    }
  };


  function handleClickedItem() {
    if (items.length > 0) {
      console.log("udateing", id)
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, label: selectedSegments.join(","), items: selectedSegments } } : node
        )
      );
    } else {
      setNodes((prevNodes) => [
        ...prevNodes,
        {
          id: nanoid(),
          type: "text",
          connectable: true,
          position: {
            x: screen.width / 2.5,
            y: screen.height / 4,
          },
          data: {
            label: selectedSegments.join(", "),
            items: selectedSegments,
            mainModalType: type
          },
        },
      ]);
    }
  };

  const handleRemoveSegment = (segment: string) => {
    setSelectedSegments(selectedSegments.filter((s) => s !== segment));
  };

  return (
    <Flex align="center" position="relative" justify="center" alignItems="flex-start" h="100vh" zIndex={ 20 } bg="rgba(0, 0, 0, 0.4)">
      <Box bg="white" p="16px" mt={ 10 } rounded="md" boxShadow="xl" w="700px">
        {/* Title */ }
        <Text color="gray.900" fontSize="2xl" fontWeight="regular">
          Contact Source
        </Text>
        <Text fontSize="sm" color="gray.500">
          Contacts that are members of the selected segments will be automatically added to this campaign.
        </Text>

        {/* Contact Segments Selection */ }
        <FormControl mt={ 4 }>
          <FormLabel color="gray.500" fontWeight="bold">
            Contact segments <Text as="span" color="red.500">*</Text>
          </FormLabel>

          <Menu>
            <MenuButton
              as={ Button }
              rightIcon={ <ChevronDownIcon /> }
              w="full"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              textAlign="left"
              _hover={ { bg: "gray.50" } }
              _focus={ { borderColor: "blue.400", boxShadow: "outline" } }
            >
              { selectedSegments.length > 0 ? (
                selectedSegments.join(", ")
              ) : (
                <Text color="gray.500">Choose one or more...</Text>
              ) }
            </MenuButton>

            <MenuList>
              { segments.map((segment) => (
                <MenuItem key={ segment } onClick={ () => handleSelectSegment(segment) }>
                  { segment }
                </MenuItem>
              )) }
            </MenuList>
          </Menu>

          {/* Selected Segments Display */ }
          { selectedSegments.length > 0 && (
            <Flex mt={ 2 } gap={ 2 } flexWrap="wrap">
              { selectedSegments.map((segment) => (
                <Tag key={ segment } colorScheme="blue" size="lg">
                  <TagLabel>{ segment }</TagLabel>
                  <TagCloseButton onClick={ () => handleRemoveSegment(segment) } />
                </Tag>
              )) }
            </Flex>
          ) }
        </FormControl>

        {/* Action Buttons */ }
        <Flex mt={ 6 } justify="flex-end">
          {
            items.length > 0 ?
              (
                <Button onClick={ () => [handleClickedItem(), handleClick(ButtonActions.CANCEL)] } borderWidth={ 1 } borderColor="gray.400" color="gray.900" mr={ 2 }> <LuPencilLine />
                  Update</Button>
              )
              :
              (
                <Button onClick={ () => [handleClickedItem(), handleClick(ButtonActions.ADD)] } borderWidth={ 1 } borderColor="gray.400" color="gray.900" mr={ 2 }> + Add</Button>
              )
          }

          <Button onClick={ () => handleClick(ButtonActions.CANCEL) } borderWidth={ 1 } borderColor="gray.400" color="gray.900">
            ✖ Cancel
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
export { ModalView, ButtonActions };

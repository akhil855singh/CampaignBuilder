import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  TagLabel,
  TagCloseButton,
  FormControl,
  FormLabel,
  Flex,
  Textarea,
  Icon,
  InputGroup,
  Select,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ActionsTypes, DecisionsTypes } from "../../../Constants/enums";
import { categories, getPopUpHeaderText } from "./DecisionsModalViewModal";
import { HelpCircle, XCircle } from "lucide-react";
import { InfoIcon } from "@chakra-ui/icons";
interface Props {
  close: () => void;
  add: (item: string) => void;
  popupType: string;
}

const DecisionsModalView = ({ close, add, popupType }: Props) => {
  // const [popupType, setPopUpType] = useState(DecisionsTypes.DEVICE_VISIT);
  const { title, description } = getPopUpHeaderText(popupType);
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({
    deviceTypes: [],
    deviceBrands: [],
    deviceOS: [],
    assets: [],
    limitToPages: [],
    channel: [],
    pointsGroup: [],
    addContactTo: [],
    removeContactFrom: [],
    selectStage: [],
  });
  console.log(popupType);
  // Generic function to handle selection
  const handleSelect = (category: string, value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category]
        : [...prev[category], value],
    }));
  };

  const [selectedName, setSelectedName] = useState("");

  // Generic function to remove selection
  const handleRemove = (category: string, value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== value),
    }));
  };

  interface CustomFormFieldProps {
    label: string;
    placeholder: string;
    labelColor?: string; // Optional label color
    icon?: React.ReactNode; // Optional icon/image
  }
  const CustomFormField: React.FC<CustomFormFieldProps> = ({
    label,
    placeholder,
    labelColor = "black",
    icon,
  }) => (
    <FormControl mt={ 4 }>
      <FormLabel color="black">
        { label }{ " " }
        <Text as="span" color={ labelColor }>
          { icon }
        </Text>
      </FormLabel>
      <Input placeholder={ placeholder || "Enter value" } />
    </FormControl>
  );

  // Define TypeScript types for props
  interface MultiSelectFieldProps {
    label: string;
    categoryKey: string;
    selectedItems: Record<string, string[]>; // Generic object with string arrays
    handleSelect: (categoryKey: string, value: string) => void;
    handleRemove: (categoryKey: string, value: string) => void;
    options: string[];
    showspan: boolean;
  }
  const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
    label,
    categoryKey,
    selectedItems,
    handleSelect,
    handleRemove,
    options,
    showspan,
  }) => (
    <FormControl mt={ 4 }>
      <FormLabel color="black">
        { label }
        { showspan && (
          <Text as="span" color="gray.400">
            ❓
          </Text>
        ) }
      </FormLabel>
      <Menu>
        <MenuButton
          as={ Button }
          color="gray.800"
          rightIcon={ <ChevronDownIcon /> }
          w="full"
          textAlign="left"
          justifyContent="space-between"
          border="1px solid"
          borderColor="gray.800"
        >
          { selectedItems[categoryKey]?.length > 0
            ? selectedItems[categoryKey].join(", ")
            : "Choose one or more..." }
        </MenuButton>
        <MenuList>
          { options.map((option) => (
            <MenuItem
              key={ option }
              onClick={ () => handleSelect(categoryKey, option) }
            >
              { option }
            </MenuItem>
          )) }
        </MenuList>
      </Menu>
      {/* Selected Items */ }
      <Flex mt={ 2 } gap={ 2 } flexWrap="wrap">
        { selectedItems[categoryKey]?.map((option) => (
          <Tag key={ option } colorScheme="blue" size="md">
            <TagLabel>{ option }</TagLabel>
            <TagCloseButton onClick={ () => handleRemove(categoryKey, option) } />
          </Tag>
        )) }
      </Flex>
    </FormControl>
  );
  interface ExpandableTextAreaProps {
    label: string;
    placeholder?: string;
  }

  const ExpandableTextArea: React.FC<ExpandableTextAreaProps> = ({
    label,
    placeholder,
  }) => {
    return (
      <FormControl mt={ 4 }>
        <FormLabel>{ label }</FormLabel>
        <Box position="relative" width="full">
          <Textarea
            placeholder={ placeholder || "Enter text..." }
            size="md"
            resize="both" // Allows left-corner expansion
            minHeight="100px"
            width="100%"
          />
        </Box>
      </FormControl>
    );
  };
  interface SingleSelectProps {
    label: string;
    options: string[];
    placeholder?: string;
    onChange?: (value: string) => void;
  }
  const SingleSelect: React.FC<SingleSelectProps> = ({
    label,
    options,
    placeholder = "Select an option",
    onChange,
  }) => {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = event.target.value;
      setSelectedValue(newValue);
      if (onChange) onChange(newValue);
    };

    const handleClear = () => {
      setSelectedValue("");
      if (onChange) onChange("");
    };

    return (
      <FormControl>
        <FormLabel
          display="flex"
          alignItems="center"
          fontWeight="bold"
          margin={ 2 }
        >
          { label }
          <Icon as={ InfoIcon } ml={ 1 } color="gray.400" boxSize={ 4 } />{ " " }
          {/* Info icon */ }
        </FormLabel>

        <InputGroup>
          <Select
            value={ selectedValue }
            onChange={ handleChange }
            placeholder={ placeholder }
          >
            { options.map((option) => (
              <option key={ option } value={ option }>
                { option }
              </option>
            )) }
          </Select>

          {/* Show Clear Button when a value is selected */ }
          { selectedValue && (
            <InputRightElement width="4.5rem">
              <Flex align="center" gap={ 1 }>
                {/* Clear Selection Icon (XCircle) */ }
                <IconButton
                  icon={ <XCircle size={ 16 } /> }
                  aria-label="Clear selection"
                  size="xs"
                  variant="ghost"
                  onClick={ handleClear }
                />
              </Flex>
            </InputRightElement>
          ) }
        </InputGroup>
      </FormControl>
    );
  };

  return (
    <Flex
      position="fixed"
      top={ 0 }
      left={ 0 }
      w="100vw"
      h="100vh"
      alignSelf="center"
      zIndex={ 20 }
      align="flex-start"
      justify="center"
      bg="rgba(0, 0, 0, 0.3)"
    >
      <Box top={ 20 } bg="white" p={ 6 } rounded="md" boxShadow="lg" w="600px">
        {/* Title */ }

        <Text fontSize="xl" color="black" fontWeight="bold">
          { title }
        </Text>
        <Text fontSize="sm" color="gray.500">
          { description }
        </Text>

        {/* Name Input */ }
        { (popupType === DecisionsTypes.DEVICE_VISIT ||
          popupType === DecisionsTypes.DOWNLOAD_ASSETS ||
          popupType === DecisionsTypes.REQUEST_DYNAMIC_CONTENT ||
          popupType === DecisionsTypes.SENDS_A_APP_PUSH_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_RCS_BOT_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_RCS_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_TEXT_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_WEB_PUSH_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_WHATS_APP_BOT_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_WHATS_APP_MESSAGE ||
          popupType === DecisionsTypes.SUBMITS_FORM ||
          popupType === DecisionsTypes.VISITS_A_PAGE ||
          popupType === ActionsTypes.ADD_DO_NOT_CONTACT ||
          popupType === ActionsTypes.ADD_TO_COMPANY_SCORE ||
          popupType === ActionsTypes.ADD_TO_COMPANY_ACTION) && (
            <FormControl mt={ 4 }>
              <FormLabel color="black">Name</FormLabel>
              <Input
                onChange={ (e) => setSelectedName(e.target.value) }
                placeholder="Enter name"
              />
            </FormControl>
          ) }

        {/* Name Input */ }
        { (popupType === DecisionsTypes.SENDS_A_APP_PUSH_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_RCS_BOT_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_RCS_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_TEXT_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_WEB_PUSH_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_WHATS_APP_BOT_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_WHATS_APP_MESSAGE) && (
            <CustomFormField
              label="Pattern the reply should match"
              placeholder=""
              labelColor="gray.300"
              icon="❓"
            ></CustomFormField>
          ) }

        {/* Device Type Selection */ }
        { popupType === DecisionsTypes.DEVICE_VISIT && (
          <MultiSelectField
            label="Device type"
            categoryKey="deviceTypes"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.deviceTypes }
            showspan={ false }
          />
        ) }
        {/* Device brand Selection */ }
        { popupType === DecisionsTypes.DEVICE_VISIT && (
          <MultiSelectField
            label="Device brand"
            categoryKey="deviceBrands"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.deviceBrands }
            showspan={ false }
          />
        ) }
        {/* Device OS Selection */ }
        { popupType === DecisionsTypes.DEVICE_VISIT && (
          <MultiSelectField
            label="Device OS"
            categoryKey="deviceOS"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.deviceOS }
            showspan={ false }
          />
        ) }

        {/* Device OS Selection */ }
        { popupType === DecisionsTypes.DOWNLOAD_ASSETS && (
          <MultiSelectField
            label="Limit to Assets"
            categoryKey="assets"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.assets }
            showspan={ true }
          />
        ) }

        {/*Visit to pages Selection */ }
        { popupType === DecisionsTypes.VISITS_A_PAGE && (
          <MultiSelectField
            label="Limit to Pages"
            categoryKey="limitToPages"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.limitToPages }
            showspan={ false }
          />
        ) }
        { popupType === DecisionsTypes.VISITS_A_PAGE && (
          <CustomFormField
            label="URL"
            placeholder=""
            labelColor="gray.300"
            icon="❓"
          ></CustomFormField>
        ) }
        { popupType === DecisionsTypes.VISITS_A_PAGE && (
          <CustomFormField
            label="Referrer"
            placeholder=""
            labelColor="gray.300"
            icon="❓"
          ></CustomFormField>
        ) }

        {/* Channel Selection */ }

        { popupType === ActionsTypes.ADD_DO_NOT_CONTACT && (
          <MultiSelectField
            label="Channels"
            categoryKey="channel"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.channel }
            showspan={ false }
          />
        ) }
        { popupType === ActionsTypes.ADD_DO_NOT_CONTACT && (
          <ExpandableTextArea
            label="Reason"
            placeholder="Enter your reason here..."
          />
        ) }

        { popupType === ActionsTypes.ADD_TO_COMPANY_SCORE && (
          <CustomFormField
            label="Add to company's score"
            placeholder=""
            labelColor="red"
            icon="*"
          ></CustomFormField>
        ) }

        { popupType === ActionsTypes.ADD_TO_COMPANY_ACTION && (
          <CustomFormField
            label="Companies"
            placeholder=""
            labelColor="red"
            icon="*"
          ></CustomFormField>
        ) }
        { popupType === ActionsTypes.ADJUST_CONTACT_POINTS && (
          <CustomFormField
            label="Points (+/-)"
            placeholder=""
            labelColor="red"
            icon="*"
          ></CustomFormField>
        ) }

        { popupType === ActionsTypes.ADJUST_CONTACT_POINTS && (
          <SingleSelect
            label="Point group"
            options={ categories.pointGroups }
            placeholder="Choose one..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        ) }
        { popupType === ActionsTypes.CHANGE_CAMPAIGNS && (
          <MultiSelectField
            label="Add contact to"
            categoryKey="addContactTo"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.addContactTo }
            showspan={ false }
          />
        ) }
        { popupType === ActionsTypes.CHANGE_CAMPAIGNS && (
          <MultiSelectField
            label="Remove contact from"
            categoryKey="removeContactFrom"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.removeContactFrom }
            showspan={ false }
          />
        ) }
        { popupType === ActionsTypes.CHANGE_CONTACT_STAGE && (
          <SingleSelect
            label="Select stage"
            options={ categories.selectStage }
            placeholder="Choose one..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        ) }

        {/* Action Buttons */ }
        <Flex mt={ 6 } justify="flex-end">
          <Button
            onClick={ close }
            borderColor="gray.400"
            color="gray.900"
            mr={ 2 }
          >
            ✖ Cancel
          </Button>
          <Button onClick={ () => [add(selectedName), close] } colorScheme="blue">
            + Add
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export { DecisionsModalView };

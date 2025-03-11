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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { DecisionsTypes } from "../../../Constants/enums";
import { categories, getPopUpHeaderText } from "./DecisionsModalViewModal";

interface Props {
  popupType: string
}

const DecisionsModalView = ({ popupType }: Props) => {
  // const [popupType, setPopUpType] = useState(DecisionsTypes.DEVICE_VISIT);
  const { title, description } = getPopUpHeaderText(popupType);
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({
    deviceTypes: [],
    deviceBrands: [],
    deviceOS: [],
    assets: [],
    limitToPages: [],
  });

  // Generic function to handle selection
  const handleSelect = (category: string, value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category].includes(value) ? prev[category] : [...prev[category], value],
    }));
  };

  // Generic function to remove selection
  const handleRemove = (category: string, value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== value),
    }));
  };

  interface CustomFormFieldProps {
    label: string,
    placeholder: string
  }
  const CustomFormField: React.FC<CustomFormFieldProps> = ({ label, placeholder }) => <FormControl mt={ 4 }>
    <FormLabel color="black">
      { label } <Text as="span" color="gray.400">❓</Text>
    </FormLabel>
    <Input placeholder={ placeholder || "Enter value" } />
  </FormControl>

  // Define TypeScript types for props
  interface MultiSelectFieldProps {
    label: string;
    categoryKey: string;
    selectedItems: Record<string, string[]>; // Generic object with string arrays
    handleSelect: (categoryKey: string, value: string) => void;
    handleRemove: (categoryKey: string, value: string) => void;
    options: string[];
    showspan: Boolean;
  }
  const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
    label, categoryKey, selectedItems, handleSelect, handleRemove, options, showspan
  }) => <FormControl mt={ 4 }>
      <FormLabel color="black" >{ label }{ showspan && <Text as="span" color="gray.400">❓</Text> }</FormLabel>
      <Menu>
        <MenuButton as={ Button } color="gray.800" rightIcon={ <ChevronDownIcon /> } w="full" textAlign="left" justifyContent="space-between"
          border="1px solid" borderColor="gray.800">
          { selectedItems[categoryKey]?.length > 0
            ? selectedItems[categoryKey].join(", ")
            : "Choose one or more..." }
        </MenuButton>
        <MenuList>
          { options.map((option) => (
            <MenuItem key={ option } onClick={ () => handleSelect(categoryKey, option) }>
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
    </FormControl>;

  return (
    <Flex position="relative" zIndex={ 20 } align="flex-start" justify="center" minH="100vh" bg="rgba(0, 0, 0, 0.4)">
      <Box bg="white" p={ 6 } rounded="md" boxShadow="lg" w="600px">
        {/* Title */ }

        <Text fontSize="xl" color="black" fontWeight="bold">{ title }</Text>
        <Text fontSize="sm" color="gray.500">{ description }</Text>

        {/* Name Input */ }
        { popupType === DecisionsTypes.DEVICE_VISIT
          || popupType === DecisionsTypes.DOWNLOAD_ASSETS
          || popupType === DecisionsTypes.REQUEST_DYNAMIC_CONTENT
          || popupType === DecisionsTypes.SENDS_A_APP_PUSH_MESSAGE
          || popupType === DecisionsTypes.SENDS_A_RCS_BOT_MESSAGE
          || popupType === DecisionsTypes.SENDS_A_RCS_MESSAGE
          || popupType === DecisionsTypes.SENDS_A_TEXT_MESSAGE
          || popupType === DecisionsTypes.SENDS_A_WEB_PUSH_MESSAGE
          || popupType === DecisionsTypes.SENDS_A_WHATS_APP_BOT_MESSAGE
          || popupType === DecisionsTypes.SENDS_A_WHATS_APP_MESSAGE
          || popupType === DecisionsTypes.SUBMITS_FORM
          || popupType === DecisionsTypes.VISITS_A_PAGE
          &&
          <FormControl mt={ 4 }>
            <FormLabel color="black">Name</FormLabel>
            <Input placeholder="Enter name" />
          </FormControl>
        }

        {/* Name Input */ }
        { popupType === DecisionsTypes.SENDS_A_APP_PUSH_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_RCS_BOT_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_RCS_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_TEXT_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_WEB_PUSH_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_WHATS_APP_BOT_MESSAGE ||
          popupType === DecisionsTypes.SENDS_A_WHATS_APP_MESSAGE
          &&
          <CustomFormField label="Pattern the reply should match" placeholder=""></CustomFormField>
        }



        {/* Device Type Selection */ }
        { popupType === DecisionsTypes.DEVICE_VISIT
          &&
          <MultiSelectField
            label="Device type"
            categoryKey="deviceTypes"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.deviceTypes }
            showspan={ false }
          />
        }
        {/* Device brand Selection */ }
        { popupType === DecisionsTypes.DEVICE_VISIT
          &&
          <MultiSelectField
            label="Device brand"
            categoryKey="deviceBrands"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.deviceBrands }
            showspan={ false }
          />
        }
        {/* Device OS Selection */ }
        { popupType === DecisionsTypes.DEVICE_VISIT
          &&
          <MultiSelectField
            label="Device OS"
            categoryKey="deviceOS"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.deviceOS }
            showspan={ false }
          />
        }

        {/* Device OS Selection */ }
        { popupType === DecisionsTypes.DOWNLOAD_ASSETS
          &&
          <MultiSelectField
            label="Limit to Assets"
            categoryKey="assets"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.assets }
            showspan={ true }
          />
        }

        {/*Visit to pages Selection */ }
        { popupType === DecisionsTypes.VISITS_A_PAGE
          &&
          <MultiSelectField
            label="Limit to Pages"
            categoryKey="limitToPages"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.limitToPages }
            showspan={ false }
          />
        }
        { popupType === DecisionsTypes.VISITS_A_PAGE && <CustomFormField label="URL" placeholder=""></CustomFormField> }
        { popupType === DecisionsTypes.VISITS_A_PAGE && <CustomFormField label="Referrer" placeholder=""></CustomFormField> }




        {/* Action Buttons */ }
        <Flex mt={ 6 } justify="flex-end">
          <Button borderColor="gray.400" color="gray.900" mr={ 2 } >✖ Cancel</Button>
          <Button colorScheme="blue">+ Add</Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export {
  DecisionsModalView
};

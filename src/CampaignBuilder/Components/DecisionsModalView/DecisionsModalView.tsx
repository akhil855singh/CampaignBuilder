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
import { XCircle } from "lucide-react";
import { InfoIcon } from "@chakra-ui/icons";
import { ActionsTypes, DecisionsTypes } from "../../../Constants/enums";
import { categories, CustomFormFieldProps, ExpandableTextAreaProps, getPopUpHeaderText, MultiSelectFieldProps, SingleSelectProps } from "./DecisionsModalViewModal";
interface Props {
  // type: string
  // items: string[]
  close: () => void;
  add: (item: string) => void;
  popupType: string;
}

const DecisionsModalView = ({ close, add, popupType }: Props) => {
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
    jumpToEvent: [],
    addContactToSelectedSegment: [],
    removeContactFromSelectedSegment: [],
    addTags: [],
    removeTags: [],
  });

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

  const CustomFormFieldWithOutSpan: React.FC<CustomFormFieldProps> = ({ label, placeholder }) => <FormControl mt={ 4 }>
    <FormLabel color="black">
      { label }
    </FormLabel>
    <Input placeholder={ placeholder || "Enter value" } />
  </FormControl>

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
          >

            <h1 style={ { color: "#000" } }>Hello</h1>
          </ExpandableTextArea>
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
        { popupType === ActionsTypes.CHANGE_CONTACT_STAGE
          &&
          <SingleSelect
            label="Select stage"
            options={ categories.selectStage }
            placeholder="Choose one..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }
        { popupType === ActionsTypes.JUMP_TO_EVENT
          &&
          <SingleSelect
            label="Event to jump to"
            options={ categories.jumpToEvent }
            placeholder="Choose one..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }
        { popupType === ActionsTypes.MODIFY_CONTACT_SEGMENTS
          &&
          <MultiSelectField
            label="Add contact to selected segment(s)"
            categoryKey="addContactToSelectedSegment"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.addContactToSelectedSegment }
            showspan={ false }
          />
        }
        { popupType === ActionsTypes.MODIFY_CONTACT_SEGMENTS
          &&
          <MultiSelectField
            label="Remove contact from selected segment(s)"
            categoryKey="removeContactFromSelectedSegment"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.removeContactFromSelectedSegment }
            showspan={ false }
          />
        }

        { popupType === ActionsTypes.MODIFY_CONTACT_TAGS
          &&
          <MultiSelectField
            label="Add tags"
            categoryKey="addTags"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.addTags }
            showspan={ false }
          />
        }
        { popupType === ActionsTypes.MODIFY_CONTACT_TAGS
          &&
          <MultiSelectField
            label="Remove tags"
            categoryKey="removeTags"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.removeTags }
            showspan={ false }
          />
        }

        { popupType === ActionsTypes.PUSH_CONTACT_TO_INTEGRATION
          &&
          <SingleSelect
            label="Integration"
            options={ categories.integration }
            placeholder="Choose one..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }
        { popupType === ActionsTypes.REMOVE_DO_NOT_CONTACT
          &&
          <MultiSelectField
            label="Channels"
            categoryKey="channel"
            selectedItems={ selectedItems }
            handleSelect={ handleSelect }
            handleRemove={ handleRemove }
            options={ categories.channel }
            showspan={ false }
          />
        }

        { popupType === ActionsTypes.SEND_APP_PUSH_MESSAGE
          &&
          <SingleSelect
            label="Select Message"
            options={ categories.selectMessage }
            placeholder="Search Option..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }

        { popupType === ActionsTypes.UPDATE_CONTACT_OWNER
          &&
          <SingleSelect
            label="Add to the following:"
            options={ categories.selectMessage }
            placeholder="Search Option..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }

        { popupType === ActionsTypes.SEND_MARKETING_MESSAGE
          &&
          <SingleSelect
            label="Select a marketing message"
            options={ categories.selectAMarketingMessage }
            placeholder="Search Option..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }
        { popupType === ActionsTypes.SEND_RCSBOT_MESSAGE
          &&
          <SingleSelect
            label="Select Message "
            options={ categories.selectMessage }
            placeholder="Search Option..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }
        { popupType === ActionsTypes.SEND_RCS_MESSAGE
          &&
          <SingleSelect
            label="Select Message "
            options={ categories.selectMessage }
            placeholder="Search Option..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }
        { popupType === ActionsTypes.SEND_TEXT_MESSAGE
          &&
          <SingleSelect
            label="Select Message "
            options={ categories.selectMessage }
            placeholder="Search Option..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }
        { popupType === ActionsTypes.SEND_TEXT_MESSAGE
          &&
          <SingleSelect
            label="Select Message "
            options={ categories.selectMessage }
            placeholder="Search Option..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }
        { popupType === ActionsTypes.SEND_WEBPUSH_MESSAGE
          &&
          <SingleSelect
            label="Select Message "
            options={ categories.selectMessage }
            placeholder="Search Option..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }
        { popupType === ActionsTypes.SEND_WHATSAPPBOT_MESSAGE
          &&
          <SingleSelect
            label="Select Message "
            options={ categories.selectMessage }
            placeholder="Search Option..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }
        { popupType === ActionsTypes.SEND_WHATSAPP_MESSAGE
          &&
          <SingleSelect
            label="Select Message "
            options={ categories.selectMessage }
            placeholder="Search Option..."
            onChange={ (value) => console.log("Selected:", value) }
          />
        }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="vernac language" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Account Type" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="TriggerInstantCommunication" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Due Date" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Account Balance amount" placeholder="" ></CustomFormFieldWithOutSpan> }

        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Account Status" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Dormant/Inactive Since" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Date of birth" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Onboarding Date" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Expiry_date" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="DOB" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="webpush_activated" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Gender" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="apppush_activated" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Middle Name" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Hobbies" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Title" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="First Name" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Last Name" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Primary company" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="father name" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Position" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Customer ID" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Email" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Mobile" placeholder="" ></CustomFormFieldWithOutSpan> }

        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Phone" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Points" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Points" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Fax" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Mother Name" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Address Line 1" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Address Line 2" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="City" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="State" placeholder="" ></CustomFormFieldWithOutSpan> }

        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Zip Code" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Country" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Preferred Locale" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Preferred Timezone" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Date Last Active" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Attribution Date" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Attribution" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Website" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Facebook" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Foursquare" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Instagram" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="LinkedIn" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Skype" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT
          &&
          <CustomFormFieldWithOutSpan label="Twitter" placeholder="" ></CustomFormFieldWithOutSpan> }


        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Address 1" placeholder="" ></CustomFormFieldWithOutSpan> }

        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Address 2" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Company Email" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Phone" placeholder="" ></CustomFormFieldWithOutSpan> }

        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="City" placeholder="" ></CustomFormFieldWithOutSpan> }

        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="State" placeholder="" ></CustomFormFieldWithOutSpan> }

        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Zip Code" placeholder="" ></CustomFormFieldWithOutSpan> }

        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Country" placeholder="" ></CustomFormFieldWithOutSpan> }

        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Company Name" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Website" placeholder="" ></CustomFormFieldWithOutSpan> }

        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Number of Employees" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Fax" placeholder="" ></CustomFormFieldWithOutSpan> }
        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Annual Revenue" placeholder="" ></CustomFormFieldWithOutSpan> }

        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Industry" placeholder="" ></CustomFormFieldWithOutSpan> }

        { popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY
          &&
          <CustomFormFieldWithOutSpan label="Description" placeholder="" ></CustomFormFieldWithOutSpan> }



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
          <Button onClick={ () => [add(selectedName), close()] } colorScheme="blue">
            + Add
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export { DecisionsModalView };

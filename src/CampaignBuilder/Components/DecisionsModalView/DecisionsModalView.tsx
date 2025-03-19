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
  Select,
  InputGroup,
  InputRightElement,
  IconButton,
  Checkbox,
  Stack,
  HStack,
  InputRightAddon,
} from "@chakra-ui/react";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import { XCircle } from "lucide-react";
import { InfoIcon, AddIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  ActionsTypes,
  ConditionsTypes,
  DecisionsTypes,
  DropdownType,
} from "../../../Constants/enums";
import {
  categories,
  actionsCategories,
  CustomFormFieldProps,
  ExpandableTextAreaProps,
  getPopUpHeaderText,
  MultiSelectFieldProps,
  SingleSelectProps,
} from "./DecisionsModal";
import { WebhookEditor } from "../WebhookEditor";
interface Props {
  // type: string
  // items: string[]
  close: () => void;
  add: (item: string) => void;
  popupType: string;
  selectionType: string;
}

const options = [
  { value: "minutes", label: "minute(s)" },
  { value: "hours", label: "hour(s)" },
  { value: "days", label: "day(s)" },
  { value: "months", label: "month(s)" },
  { value: "years", label: "year(s)" },
];

const DecisionsModalView = ({
  close,
  add,
  popupType,
  selectionType,
}: Props) => {
  const { title, description } = getPopUpHeaderText(popupType);
  const [filterEnabled, setFilterEnabled] = useState<Boolean | null>(false);
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

  const [actionsSelectedItems, setActionsSelectedItems] = useState<Record<string, string[]>>({
    emailTypes: []
  })

  const [selectedName, setSelectedName] = useState("");
  const [executionType, setExecutionType] = useState("relative");
  const [emailExecutionType, setEmailExecutionType] = useState("transactional")
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(options[2]);

  const handleChange = (
    selected: SingleValue<{ value: string; label: string }>
  ) => {
    setSelectedOption(selected); // Ensure it correctly handles null values
  };

  // Generic function to handle selection
  const handleSelect = (category: string, value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category]
        : [...prev[category], value],
    }));
  };

  const handleActionSelect = (category: string, value: string) => {
    setActionsSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category]
        : [...prev[category], value],
    }));
  };

  // Generic function to remove selection
  const handleRemove = (category: string, value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== value),
    }));
  };

  const handleActionRemove = (category: string, value: string) => {
    setActionsSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== value),
    }));
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#fff",
      borderRadius: "8px",
      borderColor: "#ccc",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#888",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "white",
      borderRadius: "8px",
      border: "1px solid #ccc",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "red" : "white",
      color: state.isSelected ? "white" : "black",
      padding: 10,
      "&:hover": {
        color: "white",
        backgroundColor: "red",
      },
    }),
  };

  const Segment = () => {
    return (
      <Box mt={ 5 }>
        <Text fontSize={ 12 }>Execute this event... </Text>
        <Flex gap={ 2 } mt={ 2 }>
          <Button
            fontSize={ 13 }
            textColor="gray.900"
            border="1px solid"
            borderColor="gray.300"
            variant={ executionType === "immediate" ? "solid" : "outline" }
            onClick={ () => setExecutionType("immediate") }
          >
            Immediately
          </Button>
          <Button
            fontSize={ 13 }
            textColor="gray.900"
            border="1px solid"
            borderColor="gray.300"
            variant={ executionType === "relative" ? "solid" : "outline" }
            onClick={ () => setExecutionType("relative") }
          >
            At a relative time period
          </Button>
          <Button
            fontSize={ 13 }
            textColor="gray.900"
            border="1px solid"
            borderColor="gray.300"
            variant={ executionType === "specific" ? "solid" : "outline" }
            onClick={ () => setExecutionType("specific") }
          >
            At a specific date/time
          </Button>
        </Flex>

        {/* <Flex gap={ 2 } mt={ 4 }>
            <Input placeholder="Send from" w="50%" />
            <Text>or between the hours of</Text>
            <Input placeholder="Start time" w="20%" />
            <Input placeholder="End time" w="20%" />
          </Flex>

          <FormControl mt={ 4 }>
            <FormLabel>Companies *</FormLabel>
            <Select placeholder="Search options..." />
          </FormControl>

          <Button mt={ 2 } colorScheme="red">+ New Company</Button> */}
      </Box>
    );
  };

  const CustomFormFieldWithWeekdays = () => {
    return (
      <Flex justifyContent="space-between" gap={ 2 } mt={ 5 }>
        <Flex flex="1">
          <Text
            alignSelf="center"
            p={ 2 }
            paddingLeft={ 4 }
            paddingRight={ 4 }
            bg="gray.200"
          >
            #
          </Text>
          <Input borderRadius="0 8px 8px 0" flex="1" width="60px" />
        </Flex>
        <Select flex="2">
          <option value="days">Day(s)</option>
          <option value="hours">Hour(s)</option>
          <option value="minutes">Minute(s)</option>
        </Select>
      </Flex>
    );
  };

  const CustomFormFieldWithTime = () => {
    return (
      <Flex mt={ 2 } gap={ 5 }>
        <FormControl flex={ 1 } mt={ 4 }>
          <Text fontSize={ 14 }>Send from</Text>
          <Input type="time" />
        </FormControl>
        <FormControl flex={ 2 } mt={ 4 }>
          <Text fontSize={ 14 }>or between the hours of </Text>
          <Input type="time" />
        </FormControl>
        <FormControl flex={ 1 } mt={ 4 }>
          <Text fontSize={ 14 }>and</Text>
          <Input type="time" />
        </FormControl>
      </Flex>
    );
  };

  interface CustomFormFieldDateAndTimeProps {
    label: string
    inputType: string
  }

  const CustomForlFieldDateTime = ({ label, inputType }: CustomFormFieldDateAndTimeProps) => {
    return (
      <FormControl mt={ 4 }>
        <FormLabel>{ label }</FormLabel>
        <Input type={ inputType } />
      </FormControl>
    )
  }

  const TimeoutInput = () => {
    return (
      <FormControl isRequired maxW="600px">
        <FormLabel fontWeight="bold">
          Timeout
        </FormLabel>
        <InputGroup>
          <Input type="number" defaultValue="10" textAlign="left" />
          <InputRightAddon bg="gray.100">seconds</InputRightAddon>
        </InputGroup>
      </FormControl>
    );
  };

  const CustomFormFileEmailSend = () => {
    return (
      <Box>
        <HStack>
          <SingleSelect
            label="Email to send"
            options={ ["greater than", "less than"] }
            placeholder="Choose one..."
            onChange={ (value) => console.log("Selected:", value) }
          />
          <Box mb={ 3 } mt={ 5 }>
            <Text fontSize={ 12 }>Email type </Text>
            <Flex gap={ 2 } mt={ 2 }>
              <Button
                fontSize={ 13 }
                textColor="gray.900"
                border="1px solid"
                borderColor="gray.300"
                variant={ emailExecutionType === "transactional" ? "solid" : "outline" }
                onClick={ () => setEmailExecutionType("transactional") }
              >
                Transactional
              </Button>
              <Button
                fontSize={ 13 }
                textColor="gray.900"
                border="1px solid"
                borderColor="gray.300"
                variant={ emailExecutionType === "marketing" ? "solid" : "outline" }
                onClick={ () => setEmailExecutionType("marketing") }
              >
                Marketing
              </Button>
            </Flex>
          </Box>
        </HStack>
        { (emailExecutionType === "marketing") && (
          <HStack mt={ -3 }>
            <SingleSelect
              label="Priority"
              options={ ["Hign", "Normal"] }
              placeholder="Choose one..."
              onChange={ (value) => console.log("Selected:", value) }
            />
            <CustomFormField
              label="Attempts"
              placeholder=""
              labelColor="black"
              icon=""
              marginBottom={ 2 }
            />
          </HStack>
        ) }
      </Box>
    )
  }

  const EmailButtons = () => {
    return (
      <HStack mt={ 4 }>
        <Button leftIcon={ <AddIcon /> } variant="outline" fontSize={ 12 }>
          New Email
        </Button>
        <Button leftIcon={ <EditIcon /> } variant="outline" fontSize={ 12 }>
          Edit Email
        </Button>
        <Button leftIcon={ <ExternalLinkIcon /> } variant="outline" fontSize={ 12 }>
          Preview Email
        </Button>
      </HStack>
    )
  }

  const CustomFormFieldEmailToUser = () => {
    return (
      <HStack gap={ 10 } alignItems="flex-start">
        <MultiSelectField
          label="Send email to user"
          categoryKey="emailTypes"
          selectedItems={ actionsSelectedItems }
          handleSelect={ handleActionSelect }
          handleRemove={ handleActionRemove }
          options={ actionsCategories.sendEmailToUser }
          showspan={ true }
          maxWidth="250"
        />
        <Box mt={ 4 }>
          <CustomFieldSwitchButton label="Send email to contact's owner" />
        </Box>
      </HStack>
    )
  }

  interface CustomFieldYesNoButtonProps {
    label: string
  }

  const CustomFieldSwitchButton = ({ label }: CustomFieldYesNoButtonProps) => {
    return (
      <FormControl>
        <FormLabel fontSize={ 14 }>{ label }</FormLabel>
        <HStack>
          <Button
            colorScheme={ !filterEnabled ? "red" : "gray" }
            variant={ !filterEnabled ? "solid" : "outline" }
            onClick={ () => setFilterEnabled(false) }
          >
            No
          </Button>
          <Button
            colorScheme={ filterEnabled ? "green" : "gray" }
            variant={ filterEnabled ? "solid" : "outline" }
            onClick={ () => setFilterEnabled(true) }
          >
            Yes
          </Button>
        </HStack>
      </FormControl>
    )
  }

  const CustomFieldSwitchButtonWithClear = ({ label }: CustomFieldYesNoButtonProps) => {
    return (
      <FormControl mt={ 4 }>
        <FormLabel fontSize={ 14 }>{ label }</FormLabel>
        <HStack>
          <Button
            bg={ filterEnabled === null ? "gray.100" : "white" }
            borderRadius={ 0 }
            onClick={ () => setFilterEnabled(null) }
          >
            <CloseIcon />
          </Button>
          <Button
            ml={ -2 }
            colorScheme={ filterEnabled === false ? "red" : "gray" }
            variant="solid"
            onClick={ () => setFilterEnabled(false) }
            borderRadius={ 0 }
          >
            No
          </Button>
          <Button
            ml={ -2 }
            colorScheme={ filterEnabled === true ? "green" : "gray" }
            variant="solid"
            onClick={ () => setFilterEnabled(true) }
            borderRadius={ 0 }
            _hover={ { outline: "none", border: "1px #ddd" } }
          >
            Yes
          </Button>
        </HStack>
      </FormControl>
    )
  }

  const CustomFormFieldCheckMarkDays = () => {
    return (
      <>
        <FormLabel fontSize={ 14 } mt={ 4 }>
          Schedule only on selected days:
        </FormLabel>
        <Stack direction="row" wrap="wrap">
          { [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
            "Weekdays",
          ].map((day) => (
            <Checkbox key={ day }>{ day }</Checkbox>
          )) }
        </Stack>
      </>
    );
  };

  const CustomFormField: React.FC<CustomFormFieldProps> = ({
    label,
    placeholder,
    labelColor = "black",
    icon,
    marginBottom = 0
  }) => (
    <FormControl mb={ marginBottom } mt={ 4 }>
      <FormLabel fontSize={ 12 } color="black">
        { label }{ " " }
        <Text as="span" color={ labelColor }>
          { icon }
        </Text>
      </FormLabel>
      <Input placeholder={ placeholder || "Enter value" } />
    </FormControl>
  );

  const CustomFormFieldWithOutSpan: React.FC<CustomFormFieldProps> = ({
    label,
    placeholder,
  }) => (
    <FormControl mt={ 4 }>
      <FormLabel color="black">{ label }</FormLabel>
      <Input placeholder={ placeholder || "Enter value" } />
    </FormControl>
  );

  const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
    label,
    categoryKey,
    selectedItems,
    handleSelect,
    handleRemove,
    options,
    showspan,
    maxWidth = "full"
  }) => (
    <FormControl maxW={ maxWidth } mt={ 4 }>
      <FormLabel fontSize={ 14 } color="black">
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
          minH="10"
          h="auto"
          whiteSpace="normal"
          wordBreak="break-word"
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
          fontSize={ 12 }
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
      overflow="auto"
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
        { (popupType === ActionsTypes.DELETE_CONTACT) && (
          <Text fontSize="sm" color={ "red.500" }>
            { description }
          </Text>
        ) }
        { (popupType !== ActionsTypes.DELETE_CONTACT) && (
          <Text fontSize="sm" color={ "gray.500" }>
            { description }
          </Text>
        ) }


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
          popupType === ActionsTypes.ADD_TO_COMPANY_ACTION ||
          popupType === ActionsTypes.ADJUST_CONTACT_POINTS ||
          popupType === ActionsTypes.CHANGE_CAMPAIGNS ||
          popupType === ActionsTypes.CHANGE_CONTACT_STAGE ||
          popupType === ActionsTypes.DELETE_CONTACT ||
          popupType === ActionsTypes.JUMP_TO_EVENT ||
          popupType === ActionsTypes.MODIFY_CONTACT_SEGMENTS ||
          popupType === ActionsTypes.MODIFY_CONTACT_TAGS ||
          popupType === ActionsTypes.PUSH_CONTACT_TO_INTEGRATION ||
          popupType === ActionsTypes.REMOVE_DO_NOT_CONTACT ||
          popupType === ActionsTypes.SEND_APP_PUSH_MESSAGE ||
          popupType === ActionsTypes.SEND_WEBHOOK ||
          popupType === ActionsTypes.SEND_EMAIL ||
          popupType === ActionsTypes.SEND_EMAIL_TO_USER ||
          popupType === ActionsTypes.SEND_MARKETING_MESSAGE ||
          popupType === ActionsTypes.SEND_RCSBOT_MESSAGE ||
          popupType === ActionsTypes.SEND_RCS_MESSAGE ||
          popupType === ActionsTypes.SEND_TEXT_MESSAGE ||
          popupType === ActionsTypes.SEND_WEBPUSH_MESSAGE ||
          popupType === ActionsTypes.SEND_WHATSAPPBOT_MESSAGE ||
          popupType === ActionsTypes.SEND_WHATSAPP_MESSAGE ||
          popupType === ActionsTypes.UPDATE_CONTACT ||
          popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY ||
          popupType === ActionsTypes.UPDATE_CONTACT_OWNER ||
          popupType === ConditionsTypes.CONTACT_CAMPAIGNS ||
          popupType === ConditionsTypes.CONTACT_DEVICE ||
          popupType === ConditionsTypes.CONTACT_FIELD_VALUE ||
          popupType === ConditionsTypes.CONTACT_OWNER ||
          popupType === ConditionsTypes.CONTACT_POINTS ||
          popupType === ConditionsTypes.CONTACT_SEGMENTS ||
          popupType === ConditionsTypes.CONTACT_STAGES ||
          popupType === ConditionsTypes.CONTACT_TAGS ||
          popupType === ConditionsTypes.FORM_FIELD_VALUE ||
          popupType === ConditionsTypes.HAS_ACTIVE_NOTIFICATION ||
          popupType === ConditionsTypes.HAS_VALID_EMAIL_ADDRESS ||
          popupType === ConditionsTypes.MARKED_AS_DNC ||
          popupType === ConditionsTypes.VISITED_PAGE) && (
            <FormControl mt={ 4 }>
              <FormLabel fontSize={ 12 } color="black">
                Name
              </FormLabel>
              <Input
                onChange={ (e) => setSelectedName(e.target.value) }
                placeholder="Enter name"
              />
            </FormControl>
          ) }

        { (selectionType === DropdownType.ACTION ||
          selectionType === DropdownType.CONDITION) && <Segment /> }

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
        {/* { popupType === ActionsTypes.ADD_DO_NOT_CONTACT && (
          <ExpandableTextArea
            label="Reason"
            placeholder="Enter your reason here..."
          >

            <h1 style={ { color: "#000" } }>Hello</h1>
          </ExpandableTextArea>
        ) } */}

        { executionType === "relative" && (
          <>
            { popupType === ActionsTypes.ADD_DO_NOT_CONTACT && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <MultiSelectField
                  label="Channels"
                  categoryKey="channel"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.channel }
                  showspan={ false }
                />
                <FormControl mt={ 4 }>
                  <FormLabel>Reason</FormLabel>
                  <Textarea placeholder="Enter reason" />
                </FormControl>
              </>
            ) }
            { popupType === ActionsTypes.ADD_TO_COMPANY_SCORE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <CustomFormField
                  label="Add to company's score"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_CAMPAIGNS && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <CustomFormField
                  label="Campaigns membership"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>

                <Box mt={ 4 }>
                  {/* Filter Toggle */ }
                  <CustomFieldSwitchButton label="Filter by date added to campaign<" />

                  {/* Conditional Fields */ }
                  { filterEnabled && (
                    <>
                      {/* Expression Dropdown */ }
                      <SingleSelect
                        label="Expression"
                        options={ ["greater than", "less than"] }
                        placeholder="Choose one..."
                        onChange={ (value) => console.log("Selected:", value) }
                      />

                      {/* Date Input */ }
                      <CustomForlFieldDateTime
                        label="Date"
                        inputType="datetime-local"
                      />
                    </>
                  ) }
                </Box>
              </>
            ) }

            { popupType === ActionsTypes.ADD_TO_COMPANY_ACTION && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <CustomFormField
                  label="Companies"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Company
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.ADJUST_CONTACT_POINTS && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <CustomFormField
                  label="Points (+/-)"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
                <SingleSelect
                  label="Point group"
                  options={ categories.pointGroups }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ActionsTypes.CHANGE_CAMPAIGNS && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <MultiSelectField
                  label="Add contact to"
                  categoryKey="addContactTo"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.addContactTo }
                  showspan={ false }
                />

                <MultiSelectField
                  label="Remove contact from"
                  categoryKey="removeContactFrom"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.removeContactFrom }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ActionsTypes.CHANGE_CONTACT_STAGE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Select stage"
                  options={ categories.selectStage }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ActionsTypes.DELETE_CONTACT && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
              </>
            ) }

            { popupType === ActionsTypes.JUMP_TO_EVENT && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Event to jump to"
                  options={ categories.jumpToEvent }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ActionsTypes.MODIFY_CONTACT_SEGMENTS && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <MultiSelectField
                  label="Add contact to selected segment(s)"
                  categoryKey="addContactToSelectedSegment"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.addContactToSelectedSegment }
                  showspan={ false }
                />

                <MultiSelectField
                  label="Remove contact from selected segment(s)"
                  categoryKey="removeContactFromSelectedSegment"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.removeContactFromSelectedSegment }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ActionsTypes.MODIFY_CONTACT_TAGS && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <MultiSelectField
                  label="Add tags"
                  categoryKey="addTags"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.addTags }
                  showspan={ false }
                />
                <MultiSelectField
                  label="Remove tags"
                  categoryKey="removeTags"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.removeTags }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ActionsTypes.PUSH_CONTACT_TO_INTEGRATION && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Integration"
                  options={ categories.integration }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ActionsTypes.REMOVE_DO_NOT_CONTACT && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <MultiSelectField
                  label="Channels"
                  categoryKey="channel"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.channel }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ActionsTypes.SEND_APP_PUSH_MESSAGE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Select Message"
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Apppush Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit Apppush Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_WEBHOOK && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <CustomFormField
                  label="Url"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
                <SingleSelect
                  label="Method"
                  options={ ["GET", "POSt", "PUT", "PATCH", "DELETE"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <WebhookEditor />
                <TimeoutInput />
              </>
            ) }

            { (popupType === ActionsTypes.SEND_EMAIL) && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <CustomFormFileEmailSend />
                <EmailButtons />
              </>
            ) }

            { (popupType === ActionsTypes.SEND_EMAIL_TO_USER) && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <CustomFormFieldEmailToUser />
                <CustomFormField
                  label="To"
                  placeholder="Optional"
                />
                <CustomFormField
                  label="CC"
                  placeholder="Optional"
                />
                <CustomFormField
                  label="BCC"
                  placeholder="Optional"
                />
                <SingleSelect
                  label="Email to send"
                  options={ ["2W-Insurace Reminder-Pre-Expire-Airtel Payment Bank"] }
                />
                <EmailButtons />
              </>
            ) }

            { popupType === ActionsTypes.SEND_MARKETING_MESSAGE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Select a marketing message"
                  options={ categories.selectAMarketingMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ActionsTypes.SEND_RCSBOT_MESSAGE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New RcsBot Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit RcsBot Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_RCS_MESSAGE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Rcs Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit Rcs Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_TEXT_MESSAGE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Text Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit Text Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_WEBPUSH_MESSAGE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Webpush Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit Webpush Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_WHATSAPPBOT_MESSAGE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <AddIcon /> }
                >
                  New WhatsappBot Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <EditIcon /> }
                >
                  Edit WhatsappBot Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_WHATSAPP_MESSAGE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <AddIcon /> }
                >
                  New Whatsapp Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <EditIcon /> }
                >
                  Edit Whatsapp Message
                </Button>
              </>
            ) }

            { (popupType === ActionsTypes.UPDATE_CONTACT) && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <CustomFormFieldWithOutSpan
                  label="vernac language"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFieldSwitchButtonWithClear
                  label="Vernacular_enabled"
                />
                <CustomFormFieldWithOutSpan
                  label="Account Type"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="TriggerInstantCommunication"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFieldSwitchButtonWithClear
                  label="bill_paymnet_done"
                />
                <CustomFormFieldWithOutSpan
                  label="Due Date"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Account Balance amount"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Account Status"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Dormant/Inactive Since"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Date of birth"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Onboarding Date"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Expiry_date"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="DOB"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="webpush_activated"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Gender"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="apppush_activated"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Middle Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Hobbies"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Title"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="First Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Last Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Primary company"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="father name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Position"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Customer ID"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Email"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Mobile"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Phone"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Points"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Points"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Fax"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Mother Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Address Line 1"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Address Line 2"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="City"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="State"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Zip Code"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Country"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Preferred Locale"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Preferred Timezone"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Date Last Active"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Attribution Date"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Attribution"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Website"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Facebook"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Foursquare"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Instagram"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="LinkedIn"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Skype"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Twitter"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
              </>
            ) }

            { (popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY) && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <CustomFormFieldWithOutSpan
                  label="Address 1"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Address 2"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Company Email"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Phone"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="City"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="State"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Zip Code"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Country"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Company Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Website"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Number of Employees"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Fax"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Annual Revenue"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Industry"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Description"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
              </>
            ) }

            { popupType === ActionsTypes.UPDATE_CONTACT_OWNER && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Add to the following:"
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            {/* Device Type Selection */ }
            { popupType === ConditionsTypes.CONTACT_DEVICE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <MultiSelectField
                  label="Device type"
                  categoryKey="deviceTypes"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceTypes }
                  showspan={ false }
                />
                <MultiSelectField
                  label="Device brand"
                  categoryKey="deviceBrands"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceBrands }
                  showspan={ false }
                />
                <MultiSelectField
                  label="Device OS"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_FIELD_VALUE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Contact Field"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomFormField
                  label="Value"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                />
                <SingleSelect
                  label="Operator"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_OWNER && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <MultiSelectField
                  label="Contact Owner"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_POINTS && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Operator"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomFormField
                  label="Score"
                  labelColor="red"
                  icon="*"
                  placeholder=""
                />
                <SingleSelect
                  label="Point group"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_SEGMENTS && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <MultiSelectField
                  label="Segments"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_STAGES && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <MultiSelectField
                  label="Stage"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_TAGS && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <MultiSelectField
                  label="Tags"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ConditionsTypes.FORM_FIELD_VALUE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Limit to forms"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <SingleSelect
                  label="Operator"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <SingleSelect
                  label="Field"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomFormField
                  label="Value"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                />
              </>
            ) }

            { popupType === ConditionsTypes.HAS_ACTIVE_NOTIFICATION && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
              </>
            ) }

            { popupType === ConditionsTypes.HAS_VALID_EMAIL_ADDRESS && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
              </>
            ) }

            { popupType === ConditionsTypes.MARKED_AS_DNC && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <MultiSelectField
                  label="Channels"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
                <SingleSelect
                  label="Reason"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ConditionsTypes.VISITED_PAGE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <CustomFormField
                  label="Page Url"
                  placeholder="http://"
                />
                <SingleSelect
                  label="Page"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomForlFieldDateTime
                  label="Start Date"
                  inputType="datetime-local"
                />
                <CustomForlFieldDateTime
                  label="End Date"
                  inputType="datetime-local"
                />
                <CustomFormField
                  label="Time spent (seconds)"
                  placeholder="0"
                />
              </>
            ) }

            { popupType === ConditionsTypes.VISITED_PAGE && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <SingleSelect
                  label="Page"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomForlFieldDateTime
                  label="Start Date"
                  inputType="datetime-local"
                />
                <CustomForlFieldDateTime
                  label="End Date"
                  inputType="datetime-local"
                />
                <CustomFormField
                  label="Time spent (seconds)"
                  placeholder="0"
                />
              </>
            ) }
          </>
        ) }

        { executionType === "immediate" && (
          <>
            { popupType === ActionsTypes.ADD_DO_NOT_CONTACT && (
              <>
                <MultiSelectField
                  label="Channels"
                  categoryKey="channel"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.channel }
                  showspan={ false }
                />
                <FormControl mt={ 4 }>
                  <FormLabel>Reason</FormLabel>
                  <Textarea placeholder="Enter reason" />
                </FormControl>
              </>
            ) }

            { popupType === ActionsTypes.ADD_TO_COMPANY_SCORE && (
              <CustomFormField
                label="Add to company's score"
                placeholder=""
                labelColor="red"
                icon="*"
              ></CustomFormField>
            ) }

            { popupType === ConditionsTypes.CONTACT_CAMPAIGNS && (
              <>
                <CustomFormField
                  label="Campaigns membership"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>

                <Box mt={ 4 }>
                  {/* Filter Toggle */ }
                  <CustomFieldSwitchButton label="Filter by date added to campaign<" />

                  { filterEnabled && (
                    <>
                      <SingleSelect
                        label="Expression"
                        options={ ["greater than", "less than"] }
                        placeholder="Choose one..."
                        onChange={ (value) => console.log("Selected:", value) }
                      />

                      {/* Date Input */ }
                      <CustomForlFieldDateTime
                        label="Date"
                        inputType="datetime-local"
                      />
                    </>
                  ) }
                </Box>
              </>
            ) }

            { popupType === ActionsTypes.ADD_TO_COMPANY_ACTION && (
              <>
                <CustomFormField
                  label="Companies"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Company
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.ADJUST_CONTACT_POINTS && (
              <>
                <CustomFormField
                  label="Points (+/-)"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
                <SingleSelect
                  label="Point group"
                  options={ categories.pointGroups }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ActionsTypes.CHANGE_CAMPAIGNS && (
              <>
                <MultiSelectField
                  label="Add contact to"
                  categoryKey="addContactTo"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.addContactTo }
                  showspan={ false }
                />

                <MultiSelectField
                  label="Remove contact from"
                  categoryKey="removeContactFrom"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.removeContactFrom }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ActionsTypes.CHANGE_CONTACT_STAGE && (
              <SingleSelect
                label="Select stage"
                options={ categories.selectStage }
                placeholder="Choose one..."
                onChange={ (value) => console.log("Selected:", value) }
              />
            ) }

            { popupType === ActionsTypes.JUMP_TO_EVENT && (
              <SingleSelect
                label="Event to jump to"
                options={ categories.jumpToEvent }
                placeholder="Choose one..."
                onChange={ (value) => console.log("Selected:", value) }
              />
            ) }

            { popupType === ActionsTypes.MODIFY_CONTACT_SEGMENTS && (
              <>
                <MultiSelectField
                  label="Add contact to selected segment(s)"
                  categoryKey="addContactToSelectedSegment"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.addContactToSelectedSegment }
                  showspan={ false }
                />

                <MultiSelectField
                  label="Remove contact from selected segment(s)"
                  categoryKey="removeContactFromSelectedSegment"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.removeContactFromSelectedSegment }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ActionsTypes.MODIFY_CONTACT_TAGS && (
              <>
                <MultiSelectField
                  label="Add tags"
                  categoryKey="addTags"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.addTags }
                  showspan={ false }
                />
                <MultiSelectField
                  label="Remove tags"
                  categoryKey="removeTags"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.removeTags }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ActionsTypes.PUSH_CONTACT_TO_INTEGRATION && (
              <SingleSelect
                label="Integration"
                options={ categories.integration }
                placeholder="Choose one..."
                onChange={ (value) => console.log("Selected:", value) }
              />
            ) }

            { popupType === ActionsTypes.REMOVE_DO_NOT_CONTACT && (

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

            { popupType === ActionsTypes.SEND_APP_PUSH_MESSAGE && (
              <>
                <SingleSelect
                  label="Select Message"
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Apppush Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit Apppush Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_WEBHOOK && (
              <>
                <CustomFormField
                  label="Url"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
                <SingleSelect
                  label="Method"
                  options={ ["GET", "POSt", "PUT", "PATCH", "DELETE"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <WebhookEditor />
                <TimeoutInput />
              </>
            ) }

            { (popupType === ActionsTypes.SEND_EMAIL) && (
              <>
                <CustomFormFileEmailSend />
                <EmailButtons />
              </>
            ) }

            { (popupType === ActionsTypes.SEND_EMAIL_TO_USER) && (
              <>
                <CustomFormFieldEmailToUser />
                <CustomFormField
                  label="To"
                  placeholder="Optional"
                />
                <CustomFormField
                  label="CC"
                  placeholder="Optional"
                />
                <CustomFormField
                  label="BCC"
                  placeholder="Optional"
                />
                <SingleSelect
                  label="Email to send"
                  options={ ["2W-Insurace Reminder-Pre-Expire-Airtel Payment Bank"] }
                />
                <EmailButtons />
              </>
            ) }

            { popupType === ActionsTypes.SEND_MARKETING_MESSAGE && (
              <SingleSelect
                label="Select a marketing message"
                options={ categories.selectAMarketingMessage }
                placeholder="Search Option..."
                onChange={ (value) => console.log("Selected:", value) }
              />
            ) }

            { popupType === ActionsTypes.SEND_RCSBOT_MESSAGE && (
              <>
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New RcsBot Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit RcsBot Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_RCS_MESSAGE && (
              <>
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Rcs Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit Rcs Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_TEXT_MESSAGE && (
              <>
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Text Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit Text Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_WEBPUSH_MESSAGE && (
              <>
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <AddIcon /> }
                >
                  New Webpush Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <EditIcon /> }
                >
                  Edit Webpush Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_WHATSAPPBOT_MESSAGE && (
              <>
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <AddIcon /> }
                >
                  New WhatsappBot Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <EditIcon /> }
                >
                  Edit WhatsappBot Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_WHATSAPP_MESSAGE && (
              <>
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <AddIcon /> }
                >
                  New Whatsapp Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <EditIcon /> }
                >
                  Edit Whatsapp Message
                </Button>
              </>
            ) }

            { (popupType === ActionsTypes.UPDATE_CONTACT) && (
              <>
                <CustomFormFieldWithOutSpan
                  label="vernac language"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFieldSwitchButtonWithClear
                  label="Vernacular_enabled"
                />
                <CustomFormFieldWithOutSpan
                  label="Account Type"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="TriggerInstantCommunication"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFieldSwitchButtonWithClear
                  label="bill_paymnet_done"
                />
                <CustomFormFieldWithOutSpan
                  label="Due Date"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Account Balance amount"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Account Status"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Dormant/Inactive Since"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Date of birth"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Onboarding Date"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Expiry_date"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="DOB"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="webpush_activated"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Gender"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="apppush_activated"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Middle Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Hobbies"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Title"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="First Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Last Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Primary company"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="father name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Position"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Customer ID"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Email"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Mobile"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Phone"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Points"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Points"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Fax"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Mother Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Address Line 1"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Address Line 2"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="City"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="State"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Zip Code"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Country"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Preferred Locale"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Preferred Timezone"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Date Last Active"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Attribution Date"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Attribution"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Website"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Facebook"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Foursquare"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Instagram"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="LinkedIn"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Skype"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Twitter"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
              </>
            ) }

            { (popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY) && (
              <>
                <CustomFormFieldWithOutSpan
                  label="Address 1"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Address 2"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Company Email"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Phone"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="City"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="State"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Zip Code"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Country"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Company Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Website"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Number of Employees"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Fax"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Annual Revenue"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Industry"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Description"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
              </>
            ) }

            { popupType === ActionsTypes.UPDATE_CONTACT_OWNER && (
              <SingleSelect
                label="Add to the following:"
                options={ categories.selectMessage }
                placeholder="Search Option..."
                onChange={ (value) => console.log("Selected:", value) }
              />
            ) }

            {/* Device Type Selection */ }
            { popupType === ConditionsTypes.CONTACT_DEVICE && (
              <>
                <MultiSelectField
                  label="Device type"
                  categoryKey="deviceTypes"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceTypes }
                  showspan={ false }
                />
                <MultiSelectField
                  label="Device brand"
                  categoryKey="deviceBrands"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceBrands }
                  showspan={ false }
                />
                <MultiSelectField
                  label="Device OS"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_FIELD_VALUE && (
              <>
                <SingleSelect
                  label="Contact Field"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomFormField
                  label="Value"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                />
                <SingleSelect
                  label="Operator"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_OWNER && (
              <MultiSelectField
                label="Contact Owner"
                categoryKey="deviceOS"
                selectedItems={ selectedItems }
                handleSelect={ handleSelect }
                handleRemove={ handleRemove }
                options={ categories.deviceOS }
                showspan={ false }
              />
            ) }

            { popupType === ConditionsTypes.CONTACT_POINTS && (
              <>
                <SingleSelect
                  label="Operator"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomFormField
                  label="Score"
                  labelColor="red"
                  icon="*"
                  placeholder=""
                />
                <SingleSelect
                  label="Point group"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_SEGMENTS && (

              <MultiSelectField
                label="Segments"
                categoryKey="deviceOS"
                selectedItems={ selectedItems }
                handleSelect={ handleSelect }
                handleRemove={ handleRemove }
                options={ categories.deviceOS }
                showspan={ false }
              />
            ) }

            { popupType === ConditionsTypes.CONTACT_STAGES && (
              <MultiSelectField
                label="Stage"
                categoryKey="deviceOS"
                selectedItems={ selectedItems }
                handleSelect={ handleSelect }
                handleRemove={ handleRemove }
                options={ categories.deviceOS }
                showspan={ false }
              />
            ) }

            { popupType === ConditionsTypes.CONTACT_TAGS && (
              <MultiSelectField
                label="Tags"
                categoryKey="deviceOS"
                selectedItems={ selectedItems }
                handleSelect={ handleSelect }
                handleRemove={ handleRemove }
                options={ categories.deviceOS }
                showspan={ false }
              />
            ) }

            { popupType === ConditionsTypes.FORM_FIELD_VALUE && (
              <>
                <SingleSelect
                  label="Limit to forms"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <SingleSelect
                  label="Operator"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <SingleSelect
                  label="Field"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomFormField
                  label="Value"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                />
              </>
            ) }

            { popupType === ConditionsTypes.MARKED_AS_DNC && (
              <>
                <MultiSelectField
                  label="Channels"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
                <SingleSelect
                  label="Reason"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ConditionsTypes.VISITED_PAGE && (
              <>
                <CustomFormField
                  label="Page Url"
                  placeholder="https://"
                />
                <SingleSelect
                  label="Page"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomForlFieldDateTime
                  label="Start Date"
                  inputType="datetime-local"
                />
                <CustomForlFieldDateTime
                  label="End Date"
                  inputType="datetime-local"
                />
                <CustomFormField
                  label="Time spent (seconds)"
                  placeholder="0"
                />
              </>
            ) }
          </>
        ) }

        { executionType === "specific" && (
          <>
            { popupType === ActionsTypes.ADD_DO_NOT_CONTACT && (
              <>
                <FormControl mt={ 4 }>
                  <Input type="datetime-local" />
                </FormControl>
                <MultiSelectField
                  label="Channels"
                  categoryKey="channel"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.channel }
                  showspan={ false }
                />
                <FormControl mt={ 4 }>
                  <FormLabel>Reason</FormLabel>
                  <Textarea placeholder="Enter reason" />
                </FormControl>
              </>
            ) }
            { popupType === ActionsTypes.ADD_TO_COMPANY_SCORE && (
              <>
                <FormControl mt={ 4 }>
                  <Input type="datetime-local" />
                </FormControl>
                <CustomFormField
                  label="Add to company's score"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
              </>
            ) }
            { popupType === ConditionsTypes.CONTACT_CAMPAIGNS && (
              <>
                {/* Date Input */ }
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <CustomFormField
                  label="Campaigns membership"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
                <Box mt={ 4 }>
                  {/* Filter Toggle */ }
                  <CustomFieldSwitchButton label="Filter by date added to campaign" />
                  {/* Conditional Fields */ }
                  { filterEnabled && (
                    <>
                      {/* Expression Dropdown */ }
                      <SingleSelect
                        label="Expression"
                        options={ ["greater than", "less than"] }
                        placeholder="Choose one..."
                        onChange={ (value) => console.log("Selected:", value) }
                      />
                      {/* Date Input */ }
                      <CustomForlFieldDateTime
                        label="Date"
                        inputType="datetime-local"
                      />
                    </>
                  ) }
                </Box>
              </>
            ) }

            { popupType === ActionsTypes.ADD_TO_COMPANY_ACTION && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <CustomFormField
                  label="Companies"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Company
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.ADJUST_CONTACT_POINTS && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <CustomFormField
                  label="Points (+/-)"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
                <SingleSelect
                  label="Point group"
                  options={ categories.pointGroups }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ActionsTypes.CHANGE_CAMPAIGNS && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <MultiSelectField
                  label="Add contact to"
                  categoryKey="addContactTo"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.addContactTo }
                  showspan={ false }
                />

                <MultiSelectField
                  label="Remove contact from"
                  categoryKey="removeContactFrom"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.removeContactFrom }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ActionsTypes.CHANGE_CONTACT_STAGE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Select stage"
                  options={ categories.selectStage }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ActionsTypes.DELETE_CONTACT && (
              <CustomForlFieldDateTime
                label="Date"
                inputType="datetime-local"
              />
            ) }

            { popupType === ActionsTypes.JUMP_TO_EVENT && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Event to jump to"
                  options={ categories.jumpToEvent }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ActionsTypes.MODIFY_CONTACT_SEGMENTS && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <MultiSelectField
                  label="Add contact to selected segment(s)"
                  categoryKey="addContactToSelectedSegment"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.addContactToSelectedSegment }
                  showspan={ false }
                />

                <MultiSelectField
                  label="Remove contact from selected segment(s)"
                  categoryKey="removeContactFromSelectedSegment"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.removeContactFromSelectedSegment }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ActionsTypes.MODIFY_CONTACT_TAGS && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <MultiSelectField
                  label="Add tags"
                  categoryKey="addTags"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.addTags }
                  showspan={ false }
                />
                <MultiSelectField
                  label="Remove tags"
                  categoryKey="removeTags"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.removeTags }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ActionsTypes.PUSH_CONTACT_TO_INTEGRATION && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Integration"
                  options={ categories.integration }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ActionsTypes.REMOVE_DO_NOT_CONTACT && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <MultiSelectField
                  label="Channels"
                  categoryKey="channel"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.channel }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ActionsTypes.SEND_APP_PUSH_MESSAGE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Select Message"
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Apppush Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit Apppush Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_WEBHOOK && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <CustomFormField
                  label="Url"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
                <SingleSelect
                  label="Method"
                  options={ ["GET", "POSt", "PUT", "PATCH", "DELETE"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <WebhookEditor />
                <TimeoutInput />
              </>
            ) }

            { (popupType === ActionsTypes.SEND_EMAIL) && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <CustomFormFileEmailSend />
                <EmailButtons />
              </>
            ) }

            { (popupType === ActionsTypes.SEND_EMAIL_TO_USER) && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <CustomFormFieldEmailToUser />
                <CustomFormField
                  label="To"
                  placeholder="Optional"
                />
                <CustomFormField
                  label="CC"
                  placeholder="Optional"
                />
                <CustomFormField
                  label="BCC"
                  placeholder="Optional"
                />
                <SingleSelect
                  label="Email to send"
                  options={ ["2W-Insurace Reminder-Pre-Expire-Airtel Payment Bank"] }
                />
                <EmailButtons />
              </>
            ) }

            { popupType === ActionsTypes.SEND_MARKETING_MESSAGE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Select a marketing message"
                  options={ categories.selectAMarketingMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ActionsTypes.SEND_RCSBOT_MESSAGE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New RcsBot Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit RcsBot Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_RCS_MESSAGE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Rcs Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit Rcs Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_TEXT_MESSAGE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                >
                  + New Text Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                >
                  + Edit Text Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_WEBPUSH_MESSAGE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <AddIcon /> }
                >
                  New Webpush Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <EditIcon /> }
                >
                  Edit Webpush Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_WHATSAPPBOT_MESSAGE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <AddIcon /> }
                >
                  New WhatsappBot Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <EditIcon /> }
                >
                  Edit WhatsappBot Message
                </Button>
              </>
            ) }

            { popupType === ActionsTypes.SEND_WHATSAPP_MESSAGE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Select Message "
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <Button
                  mt={ 4 }
                  fontSize={ 14 }
                  colorScheme="red"
                  variant="solid"
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <AddIcon /> }
                >
                  New Whatsapp Message
                </Button>
                <Button
                  mt={ 4 }
                  ml={ 1 }
                  fontSize={ 14 }
                  textColor="white"
                  colorScheme="red"
                  variant="solid"
                  disabled={ true }
                  onClick={ () => setFilterEnabled(false) }
                  leftIcon={ <EditIcon /> }
                >
                  Edit Whatsapp Message
                </Button>
              </>
            ) }

            { (popupType === ActionsTypes.UPDATE_CONTACT) && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <CustomFormFieldWithOutSpan
                  label="vernac language"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFieldSwitchButtonWithClear
                  label="Vernacular_enabled"
                />
                <CustomFormFieldWithOutSpan
                  label="Account Type"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="TriggerInstantCommunication"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFieldSwitchButtonWithClear
                  label="bill_paymnet_done"
                />
                <CustomFormFieldWithOutSpan
                  label="Due Date"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Account Balance amount"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Account Status"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Dormant/Inactive Since"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Date of birth"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Onboarding Date"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Expiry_date"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="DOB"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="webpush_activated"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Gender"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="apppush_activated"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Middle Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Hobbies"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Title"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="First Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Last Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Primary company"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="father name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Position"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Customer ID"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Email"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Mobile"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Phone"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Points"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Points"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Fax"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Mother Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Address Line 1"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Address Line 2"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="City"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="State"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Zip Code"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Country"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Preferred Locale"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Preferred Timezone"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Date Last Active"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Attribution Date"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Attribution"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Website"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Facebook"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Foursquare"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Instagram"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="LinkedIn"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Skype"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Twitter"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
              </>
            ) }
            { (popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY) && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <CustomFormFieldWithOutSpan
                  label="Address 1"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Address 2"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Company Email"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Phone"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="City"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="State"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Zip Code"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Country"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Company Name"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Website"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Number of Employees"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Fax"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Annual Revenue"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Industry"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
                <CustomFormFieldWithOutSpan
                  label="Description"
                  placeholder=""
                ></CustomFormFieldWithOutSpan>
              </>
            ) }

            { popupType === ActionsTypes.UPDATE_CONTACT_OWNER && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Add to the following:"
                  options={ categories.selectMessage }
                  placeholder="Search Option..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_DEVICE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <MultiSelectField
                  label="Device type"
                  categoryKey="deviceTypes"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceTypes }
                  showspan={ false }
                />
                <MultiSelectField
                  label="Device brand"
                  categoryKey="deviceBrands"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceBrands }
                  showspan={ false }
                />
                <MultiSelectField
                  label="Device OS"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_FIELD_VALUE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Contact Field"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomFormField
                  label="Value"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                />
                <SingleSelect
                  label="Operator"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_OWNER && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <MultiSelectField
                  label="Contact Owner"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_POINTS && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Operator"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomFormField
                  label="Score"
                  labelColor="red"
                  icon="*"
                  placeholder=""
                />
                <SingleSelect
                  label="Point group"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_SEGMENTS && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <MultiSelectField
                  label="Segments"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_STAGES && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <MultiSelectField
                  label="Stage"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ConditionsTypes.CONTACT_TAGS && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <MultiSelectField
                  label="Tags"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
              </>
            ) }

            { popupType === ConditionsTypes.FORM_FIELD_VALUE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <SingleSelect
                  label="Limit to forms"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <SingleSelect
                  label="Operator"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <SingleSelect
                  label="Field"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomFormField
                  label="Value"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                />
              </>
            ) }

            { popupType === ConditionsTypes.HAS_ACTIVE_NOTIFICATION && (
              <CustomForlFieldDateTime
                label="Date"
                inputType="datetime-local"
              />
            ) }

            { popupType === ConditionsTypes.HAS_VALID_EMAIL_ADDRESS && (
              <CustomForlFieldDateTime
                label="Date"
                inputType="datetime-local"
              />
            ) }

            { popupType === ConditionsTypes.MARKED_AS_DNC && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <MultiSelectField
                  label="Channels"
                  categoryKey="deviceOS"
                  selectedItems={ selectedItems }
                  handleSelect={ handleSelect }
                  handleRemove={ handleRemove }
                  options={ categories.deviceOS }
                  showspan={ false }
                />
                <SingleSelect
                  label="Reason"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
              </>
            ) }

            { popupType === ConditionsTypes.VISITED_PAGE && (
              <>
                <CustomForlFieldDateTime
                  label="Date"
                  inputType="datetime-local"
                />
                <CustomFormField
                  label="Page Url"
                  placeholder="https://"
                />
                <SingleSelect
                  label="Page"
                  options={ ["Select", "less than"] }
                  placeholder="Choose one..."
                  onChange={ (value) => console.log("Selected:", value) }
                />
                <CustomForlFieldDateTime
                  label="Start Date"
                  inputType="datetime-local"
                />
                <CustomForlFieldDateTime
                  label="End Date"
                  inputType="datetime-local"
                />
                <CustomFormField
                  label="Time spent (seconds)"
                  placeholder="0"
                />
              </>
            ) }
          </>
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
          <Button
            onClick={ () => [add(selectedName), close()] }
            colorScheme="blue"
          >
            + Add
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export { DecisionsModalView };

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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { XCircle } from "lucide-react";
import { InfoIcon } from "@chakra-ui/icons";
import {
  ActionsTypes,
  ConditionsTypes,
  DecisionsTypes,
  DropdownType,
} from "../../../Constants/enums";
import {
  categories,
  CustomFormFieldProps,
  ExpandableTextAreaProps,
  getPopUpHeaderText,
  MultiSelectFieldProps,
  SingleSelectProps,
} from "./DecisionsModal";
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
  const [filterEnabled, setFilterEnabled] = useState(false);
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
  const [executionType, setExecutionType] = useState("relative");
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(options[2]);

  const handleChange = (
    selected: SingleValue<{ value: string; label: string }>
  ) => {
    setSelectedOption(selected); // Ensure it correctly handles null values
  };

  // Generic function to remove selection
  const handleRemove = (category: string, value: string) => {
    setSelectedItems((prev) => ({
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
      <Box mt={5}>
        <Text fontSize={12}>Execute this event... </Text>
        <Flex gap={2} mt={2}>
          <Button
            fontSize={13}
            textColor="gray.900"
            border="1px solid"
            borderColor="gray.300"
            variant={executionType === "immediate" ? "solid" : "outline"}
            onClick={() => setExecutionType("immediate")}
          >
            Immediately
          </Button>
          <Button
            fontSize={13}
            textColor="gray.900"
            border="1px solid"
            borderColor="gray.300"
            variant={executionType === "relative" ? "solid" : "outline"}
            onClick={() => setExecutionType("relative")}
          >
            At a relative time period
          </Button>
          <Button
            fontSize={13}
            textColor="gray.900"
            border="1px solid"
            borderColor="gray.300"
            variant={executionType === "specific" ? "solid" : "outline"}
            onClick={() => setExecutionType("specific")}
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
      <Flex justifyContent="space-between" gap={2} mt={5}>
        <Flex flex="1">
          <Text
            alignSelf="center"
            p={2}
            paddingLeft={4}
            paddingRight={4}
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
      <Flex mt={2} gap={5}>
        <FormControl flex={1} mt={4}>
          <Text fontSize={14}>Send from</Text>
          <Input type="time" />
        </FormControl>
        <FormControl flex={2} mt={4}>
          <Text fontSize={14}>or between the hours of </Text>
          <Input type="time" />
        </FormControl>
        <FormControl flex={1} mt={4}>
          <Text fontSize={14}>and</Text>
          <Input type="time" />
        </FormControl>
      </Flex>
    );
  };

  const CustomFormFieldCheckMarkDays = () => {
    return (
      <>
        <FormLabel fontSize={14} mt={4}>
          Schedule only on selected days:
        </FormLabel>
        <Stack direction="row" wrap="wrap">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
            "Weekdays",
          ].map((day) => (
            <Checkbox key={day}>{day}</Checkbox>
          ))}
        </Stack>
      </>
    );
  };

  const CustomFormField: React.FC<CustomFormFieldProps> = ({
    label,
    placeholder,
    labelColor = "black",
    icon,
  }) => (
    <FormControl mt={4}>
      <FormLabel fontSize={12} color="black">
        {label}{" "}
        <Text as="span" color={labelColor}>
          {icon}
        </Text>
      </FormLabel>
      <Input placeholder={placeholder || "Enter value"} />
    </FormControl>
  );

  interface CustomFormFieldChooseOneProps {
    label: string;
    placeholder: string;
    options: string[];
  }

  const CustomFormFieldChooseOne = ({
    label,
    placeholder,
    options,
  }: CustomFormFieldChooseOneProps) => {
    return (
      <FormControl mt={4}>
        <FormLabel>{label}</FormLabel>
        <Select placeholder={placeholder}>
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </Select>
      </FormControl>
    );
  };

  const CustomFormFieldWithOutSpan: React.FC<CustomFormFieldProps> = ({
    label,
    placeholder,
  }) => (
    <FormControl mt={4}>
      <FormLabel color="black">{label}</FormLabel>
      <Input placeholder={placeholder || "Enter value"} />
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
  }) => (
    <FormControl mt={4}>
      <FormLabel fontSize={14} color="black">
        {label}
        {showspan && (
          <Text as="span" color="gray.400">
            ❓
          </Text>
        )}
      </FormLabel>
      <Menu>
        <MenuButton
          as={Button}
          color="gray.800"
          rightIcon={<ChevronDownIcon />}
          w="full"
          textAlign="left"
          justifyContent="space-between"
          border="1px solid"
          borderColor="gray.800"
        >
          {selectedItems[categoryKey]?.length > 0
            ? selectedItems[categoryKey].join(", ")
            : "Choose one or more..."}
        </MenuButton>
        <MenuList>
          {options.map((option) => (
            <MenuItem
              key={option}
              onClick={() => handleSelect(categoryKey, option)}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {/* Selected Items */}
      <Flex mt={2} gap={2} flexWrap="wrap">
        {selectedItems[categoryKey]?.map((option) => (
          <Tag key={option} colorScheme="blue" size="md">
            <TagLabel>{option}</TagLabel>
            <TagCloseButton onClick={() => handleRemove(categoryKey, option)} />
          </Tag>
        ))}
      </Flex>
    </FormControl>
  );

  const ExpandableTextArea: React.FC<ExpandableTextAreaProps> = ({
    label,
    placeholder,
  }) => {
    return (
      <FormControl mt={4}>
        <FormLabel>{label}</FormLabel>
        <Box position="relative" width="full">
          <Textarea
            placeholder={placeholder || "Enter text..."}
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
          margin={2}
        >
          {label}
          <Icon as={InfoIcon} ml={1} color="gray.400" boxSize={4} />{" "}
          {/* Info icon */}
        </FormLabel>

        <InputGroup>
          <Select
            value={selectedValue}
            onChange={handleChange}
            placeholder={placeholder}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          {/* Show Clear Button when a value is selected */}
          {selectedValue && (
            <InputRightElement width="4.5rem">
              <Flex align="center" gap={1}>
                {/* Clear Selection Icon (XCircle) */}
                <IconButton
                  icon={<XCircle size={16} />}
                  aria-label="Clear selection"
                  size="xs"
                  variant="ghost"
                  onClick={handleClear}
                />
              </Flex>
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
    );
  };
  return (
    <Flex
      overflow="auto"
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      alignSelf="center"
      zIndex={20}
      align="flex-start"
      justify="center"
      bg="rgba(0, 0, 0, 0.3)"
    >
      <Box top={20} bg="white" p={6} rounded="md" boxShadow="lg" w="600px">
        {/* Title */}
        <Text fontSize="xl" color="black" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {description}
        </Text>

        {/* Name Input */}
        {(popupType === DecisionsTypes.DEVICE_VISIT ||
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
          <FormControl mt={4}>
            <FormLabel fontSize={12} color="black">
              Name
            </FormLabel>
            <Input
              onChange={(e) => setSelectedName(e.target.value)}
              placeholder="Enter name"
            />
          </FormControl>
        )}

        {(selectionType === DropdownType.ACTION ||
          selectionType === DropdownType.CONDITION) && <Segment />}

        {/* Name Input */}
        {(popupType === DecisionsTypes.SENDS_A_APP_PUSH_MESSAGE ||
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
        )}

        {/* Device Type Selection */}
        {popupType === DecisionsTypes.DEVICE_VISIT && (
          <MultiSelectField
            label="Device type"
            categoryKey="deviceTypes"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.deviceTypes}
            showspan={false}
          />
        )}
        {/* Device brand Selection */}
        {popupType === DecisionsTypes.DEVICE_VISIT && (
          <MultiSelectField
            label="Device brand"
            categoryKey="deviceBrands"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.deviceBrands}
            showspan={false}
          />
        )}
        {/* Device OS Selection */}
        {popupType === DecisionsTypes.DEVICE_VISIT && (
          <MultiSelectField
            label="Device OS"
            categoryKey="deviceOS"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.deviceOS}
            showspan={false}
          />
        )}

        {/* Device OS Selection */}
        {popupType === DecisionsTypes.DOWNLOAD_ASSETS && (
          <MultiSelectField
            label="Limit to Assets"
            categoryKey="assets"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.assets}
            showspan={true}
          />
        )}

        {/*Visit to pages Selection */}
        {popupType === DecisionsTypes.VISITS_A_PAGE && (
          <MultiSelectField
            label="Limit to Pages"
            categoryKey="limitToPages"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.limitToPages}
            showspan={false}
          />
        )}
        {popupType === DecisionsTypes.VISITS_A_PAGE && (
          <CustomFormField
            label="URL"
            placeholder=""
            labelColor="gray.300"
            icon="❓"
          ></CustomFormField>
        )}
        {popupType === DecisionsTypes.VISITS_A_PAGE && (
          <CustomFormField
            label="Referrer"
            placeholder=""
            labelColor="gray.300"
            icon="❓"
          ></CustomFormField>
        )}

        {/* Channel Selection */}
        {/* { popupType === ActionsTypes.ADD_DO_NOT_CONTACT && (
          <ExpandableTextArea
            label="Reason"
            placeholder="Enter your reason here..."
          >

            <h1 style={ { color: "#000" } }>Hello</h1>
          </ExpandableTextArea>
        ) } */}

        {executionType === "relative" && (
          <>
            {popupType === ActionsTypes.ADD_DO_NOT_CONTACT && (
              <>
                <CustomFormFieldWithWeekdays />
                <CustomFormFieldWithTime />
                <CustomFormFieldCheckMarkDays />
                <MultiSelectField
                  label="Channels"
                  categoryKey="channel"
                  selectedItems={selectedItems}
                  handleSelect={handleSelect}
                  handleRemove={handleRemove}
                  options={categories.channel}
                  showspan={false}
                />
                <FormControl mt={4}>
                  <FormLabel>Reason</FormLabel>
                  <Textarea placeholder="Enter reason" />
                </FormControl>
              </>
            )}
            {popupType === ActionsTypes.ADD_TO_COMPANY_SCORE && (
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
            )}

            {popupType === ConditionsTypes.CONTACT_CAMPAIGNS && (
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

                <Box mt={4}>
                  {/* Filter Toggle */}
                  <FormControl>
                    <FormLabel>Filter by date added to campaign</FormLabel>
                    <HStack>
                      <Button
                        colorScheme={!filterEnabled ? "red" : "gray"}
                        variant={!filterEnabled ? "solid" : "outline"}
                        onClick={() => setFilterEnabled(false)}
                      >
                        No
                      </Button>
                      <Button
                        colorScheme={filterEnabled ? "green" : "gray"}
                        variant={filterEnabled ? "solid" : "outline"}
                        onClick={() => setFilterEnabled(true)}
                      >
                        Yes
                      </Button>
                    </HStack>
                  </FormControl>

                  {/* Conditional Fields */}
                  {filterEnabled && (
                    <>
                      {/* Expression Dropdown */}
                      <CustomFormFieldChooseOne
                        label="Expression"
                        placeholder="Choose one..."
                        options={["greater than", "less than"]}
                      />

                      {/* Date Input */}
                      <FormControl mt={4}>
                        <FormLabel>Date</FormLabel>
                        <Input type="datetime-local" />
                      </FormControl>
                    </>
                  )}
                </Box>
              </>
            )}
          </>
        )}

        {executionType === "immediate" && (
          <>
            {popupType === ActionsTypes.ADD_DO_NOT_CONTACT && (
              <>
                <MultiSelectField
                  label="Channels"
                  categoryKey="channel"
                  selectedItems={selectedItems}
                  handleSelect={handleSelect}
                  handleRemove={handleRemove}
                  options={categories.channel}
                  showspan={false}
                />
                <FormControl mt={4}>
                  <FormLabel>Reason</FormLabel>
                  <Textarea placeholder="Enter reason" />
                </FormControl>
              </>
            )}

            {popupType === ActionsTypes.ADD_TO_COMPANY_SCORE && (
              <CustomFormField
                label="Add to company's score"
                placeholder=""
                labelColor="red"
                icon="*"
              ></CustomFormField>
            )}

            {popupType === ConditionsTypes.CONTACT_CAMPAIGNS && (
              <>
                <CustomFormField
                  label="Campaigns membership"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>

                <Box mt={4}>
                  {/* Filter Toggle */}
                  <FormControl>
                    <FormLabel>Filter by date added to campaign</FormLabel>
                    <HStack>
                      <Button
                        colorScheme={!filterEnabled ? "red" : "gray"}
                        variant={!filterEnabled ? "solid" : "outline"}
                        onClick={() => setFilterEnabled(false)}
                      >
                        No
                      </Button>
                      <Button
                        colorScheme={filterEnabled ? "green" : "gray"}
                        variant={filterEnabled ? "solid" : "outline"}
                        onClick={() => setFilterEnabled(true)}
                      >
                        Yes
                      </Button>
                    </HStack>
                  </FormControl>

                  {filterEnabled && (
                    <>
                      <CustomFormFieldChooseOne
                        label="Expression"
                        placeholder="Choose one..."
                        options={["greater than", "less than"]}
                      />

                      {/* Date Input */}
                      <FormControl mt={4}>
                        <FormLabel>Date</FormLabel>
                        <Input type="datetime-local" />
                      </FormControl>
                    </>
                  )}
                </Box>
              </>
            )}
          </>
        )}

        {executionType === "specific" && (
          <>
            {popupType === ActionsTypes.ADD_DO_NOT_CONTACT && (
              <>
                <FormControl mt={4}>
                  <Input type="datetime-local" />
                </FormControl>
                <MultiSelectField
                  label="Channels"
                  categoryKey="channel"
                  selectedItems={selectedItems}
                  handleSelect={handleSelect}
                  handleRemove={handleRemove}
                  options={categories.channel}
                  showspan={false}
                />
                <FormControl mt={4}>
                  <FormLabel>Reason</FormLabel>
                  <Textarea placeholder="Enter reason" />
                </FormControl>
              </>
            )}
            {popupType === ActionsTypes.ADD_TO_COMPANY_SCORE && (
              <>
                <FormControl mt={4}>
                  <Input type="datetime-local" />
                </FormControl>
                <CustomFormField
                  label="Add to company's score"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>
              </>
            )}
            {popupType === ConditionsTypes.CONTACT_CAMPAIGNS && (
              <>
                {/* Date Input */}
                <FormControl mt={4}>
                  <FormLabel>Date</FormLabel>
                  <Input type="datetime-local" />
                </FormControl>
                <CustomFormField
                  label="Campaigns membership"
                  placeholder=""
                  labelColor="red"
                  icon="*"
                ></CustomFormField>

                <Box mt={4}>
                  {/* Filter Toggle */}
                  <FormControl>
                    <FormLabel>Filter by date added to campaign</FormLabel>
                    <HStack>
                      <Button
                        colorScheme={!filterEnabled ? "red" : "gray"}
                        variant={!filterEnabled ? "solid" : "outline"}
                        onClick={() => setFilterEnabled(false)}
                      >
                        No
                      </Button>
                      <Button
                        colorScheme={filterEnabled ? "green" : "gray"}
                        variant={filterEnabled ? "solid" : "outline"}
                        onClick={() => setFilterEnabled(true)}
                      >
                        Yes
                      </Button>
                    </HStack>
                  </FormControl>

                  {/* Conditional Fields */}
                  {filterEnabled && (
                    <>
                      {/* Expression Dropdown */}
                      <FormControl mt={4}>
                        <FormLabel>Expression</FormLabel>
                        <Select placeholder="Choose one...">
                          <option value="before">greater than</option>
                          <option value="after">less than</option>
                        </Select>
                      </FormControl>

                      {/* Date Input */}
                      <FormControl mt={4}>
                        <FormLabel>Date</FormLabel>
                        <Input type="datetime-local" />
                      </FormControl>
                    </>
                  )}
                </Box>
              </>
            )}
          </>
        )}

        {popupType === ActionsTypes.ADD_TO_COMPANY_ACTION && (
          <CustomFormField
            label="Companies"
            placeholder=""
            labelColor="red"
            icon="*"
          ></CustomFormField>
        )}
        {popupType === ActionsTypes.ADJUST_CONTACT_POINTS && (
          <CustomFormField
            label="Points (+/-)"
            placeholder=""
            labelColor="red"
            icon="*"
          ></CustomFormField>
        )}

        {popupType === ActionsTypes.ADJUST_CONTACT_POINTS && (
          <SingleSelect
            label="Point group"
            options={categories.pointGroups}
            placeholder="Choose one..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.CHANGE_CAMPAIGNS && (
          <MultiSelectField
            label="Add contact to"
            categoryKey="addContactTo"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.addContactTo}
            showspan={false}
          />
        )}
        {popupType === ActionsTypes.CHANGE_CAMPAIGNS && (
          <MultiSelectField
            label="Remove contact from"
            categoryKey="removeContactFrom"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.removeContactFrom}
            showspan={false}
          />
        )}
        {popupType === ActionsTypes.CHANGE_CONTACT_STAGE && (
          <SingleSelect
            label="Select stage"
            options={categories.selectStage}
            placeholder="Choose one..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.CHANGE_CONTACT_STAGE && (
          <SingleSelect
            label="Select stage"
            options={categories.selectStage}
            placeholder="Choose one..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.JUMP_TO_EVENT && (
          <SingleSelect
            label="Event to jump to"
            options={categories.jumpToEvent}
            placeholder="Choose one..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.MODIFY_CONTACT_SEGMENTS && (
          <MultiSelectField
            label="Add contact to selected segment(s)"
            categoryKey="addContactToSelectedSegment"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.addContactToSelectedSegment}
            showspan={false}
          />
        )}
        {popupType === ActionsTypes.MODIFY_CONTACT_SEGMENTS && (
          <MultiSelectField
            label="Remove contact from selected segment(s)"
            categoryKey="removeContactFromSelectedSegment"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.removeContactFromSelectedSegment}
            showspan={false}
          />
        )}

        {popupType === ActionsTypes.MODIFY_CONTACT_TAGS && (
          <MultiSelectField
            label="Add tags"
            categoryKey="addTags"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.addTags}
            showspan={false}
          />
        )}
        {popupType === ActionsTypes.MODIFY_CONTACT_TAGS && (
          <MultiSelectField
            label="Remove tags"
            categoryKey="removeTags"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.removeTags}
            showspan={false}
          />
        )}

        {popupType === ActionsTypes.PUSH_CONTACT_TO_INTEGRATION && (
          <SingleSelect
            label="Integration"
            options={categories.integration}
            placeholder="Choose one..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.REMOVE_DO_NOT_CONTACT && (
          <MultiSelectField
            label="Channels"
            categoryKey="channel"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.channel}
            showspan={false}
          />
        )}

        {popupType === ActionsTypes.SEND_APP_PUSH_MESSAGE && (
          <SingleSelect
            label="Select Message"
            options={categories.selectMessage}
            placeholder="Search Option..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT_OWNER && (
          <SingleSelect
            label="Add to the following:"
            options={categories.selectMessage}
            placeholder="Search Option..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}

        {popupType === ActionsTypes.SEND_MARKETING_MESSAGE && (
          <SingleSelect
            label="Select a marketing message"
            options={categories.selectAMarketingMessage}
            placeholder="Search Option..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.SEND_RCSBOT_MESSAGE && (
          <SingleSelect
            label="Select Message "
            options={categories.selectMessage}
            placeholder="Search Option..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.SEND_RCS_MESSAGE && (
          <SingleSelect
            label="Select Message "
            options={categories.selectMessage}
            placeholder="Search Option..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.SEND_TEXT_MESSAGE && (
          <SingleSelect
            label="Select Message "
            options={categories.selectMessage}
            placeholder="Search Option..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.SEND_TEXT_MESSAGE && (
          <SingleSelect
            label="Select Message "
            options={categories.selectMessage}
            placeholder="Search Option..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.SEND_WEBPUSH_MESSAGE && (
          <SingleSelect
            label="Select Message "
            options={categories.selectMessage}
            placeholder="Search Option..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.SEND_WHATSAPPBOT_MESSAGE && (
          <SingleSelect
            label="Select Message "
            options={categories.selectMessage}
            placeholder="Search Option..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.SEND_WHATSAPP_MESSAGE && (
          <SingleSelect
            label="Select Message "
            options={categories.selectMessage}
            placeholder="Search Option..."
            onChange={(value) => console.log("Selected:", value)}
          />
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="vernac language"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Account Type"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="TriggerInstantCommunication"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Due Date"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Account Balance amount"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Account Status"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Dormant/Inactive Since"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Date of birth"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Onboarding Date"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Expiry_date"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="DOB"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="webpush_activated"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Gender"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="apppush_activated"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Middle Name"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Hobbies"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Title"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="First Name"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Last Name"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Primary company"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="father name"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Position"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Customer ID"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Email"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Mobile"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Phone"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Points"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Points"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Fax"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Mother Name"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Address Line 1"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Address Line 2"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="City"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="State"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Zip Code"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Country"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Preferred Locale"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Preferred Timezone"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Date Last Active"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Attribution Date"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Attribution"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Website"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Facebook"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Foursquare"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Instagram"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="LinkedIn"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Skype"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT && (
          <CustomFormFieldWithOutSpan
            label="Twitter"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Address 1"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Address 2"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Company Email"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Phone"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="City"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="State"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Zip Code"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Country"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Company Name"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Website"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Number of Employees"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Fax"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}
        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Annual Revenue"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Industry"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {popupType === ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY && (
          <CustomFormFieldWithOutSpan
            label="Description"
            placeholder=""
          ></CustomFormFieldWithOutSpan>
        )}

        {/* Action Buttons */}
        <Flex mt={6} justify="flex-end">
          <Button
            onClick={close}
            borderColor="gray.400"
            color="gray.900"
            mr={2}
          >
            ✖ Cancel
          </Button>
          <Button
            onClick={() => [add(selectedName), close()]}
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

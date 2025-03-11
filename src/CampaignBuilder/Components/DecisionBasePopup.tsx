import React, { useState } from "react";
import {
    Box,
    Button,
    Input,
    Text,
    VStack,
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
enum DecisionPopupType{
    DEVICE_VISIT = "device_type",
    DOWNLOAD_ASSETS = "download_assets",
    REQUEST_DYNAMIC_CONTENT = "request_dynamic_content",
    SENDS_A_APP_PUSH_MESSAGE = "send_a_app_push_message",
    SENDS_A_RCS_BOT_MESSAGE = "send_a_rcs_bot_message",
    SENDS_A_RCS_MESSAGE = "send_a_rcs_message",
    SENDS_A_TEXT_MESSAGE = "send_a_text_message",
    SENDS_A_WEB_PUSH_MESSAGE = "send_a_web_push_message",
    SENDS_A_WHATS_APP_BOT_MESSAGE = "send_a_whats_app_bot_message",
    SENDS_A_WHATS_APP_MESSAGE = "send_a_whats_app_message",
    SUBMITS_FORM = "submit_forms",
    VISITS_A_PAGE = "visits_a_page",

}
const getPopUpHeaderText = (popupType:DecisionPopupType) =>{
    switch(popupType){
        case DecisionPopupType.DEVICE_VISIT:
            return {title:"Device visit", description:"Trigger device on a page/url hit."}
            case DecisionPopupType.DOWNLOAD_ASSETS:  
            return {title:"Downloads asset", description:"Trigger actions upon downloading an asset."}
            case DecisionPopupType.REQUEST_DYNAMIC_CONTENT:  
            return {title:"Request dynamic content", description:"This is the top level for a dynamic content request."}
            case DecisionPopupType.SENDS_A_APP_PUSH_MESSAGE:  
            return {title:"Sends a apppush message", description:"Contact sent or replied to a apppush message"}
            case DecisionPopupType.SENDS_A_RCS_BOT_MESSAGE:  
            return {title:"Sends a rcsbot message", description:"Contact sent or replied to a rcsbot message"}
            case DecisionPopupType.SENDS_A_RCS_MESSAGE:  
            return {title:"Sends a rcs message", description:"Contact sent or replied to a rcs message"}
            case DecisionPopupType.SENDS_A_TEXT_MESSAGE:  
            return {title:"Sends a text message", description:"Contact sent or replied to a text message"}
            case DecisionPopupType.SENDS_A_WEB_PUSH_MESSAGE:  
            return {title:"Sends a webpush message", description:"Contact sent or replied to a webpush message"}
            case DecisionPopupType.SENDS_A_WHATS_APP_BOT_MESSAGE:  
            return {title:"Sends a whatsappbot message", description:"Contact sent or replied to a whatsappbot message"}
            case DecisionPopupType.SENDS_A_WHATS_APP_MESSAGE:  
            return {title:"Sends a whatsapp message", description:"Contact sent or replied to a whatsapp message"}
            case DecisionPopupType.SUBMITS_FORM:  
            return {title:"Submits form", description:"Trigger actions when a contact submits a form"}
            case DecisionPopupType.VISITS_A_PAGE:  
            return {title:"Visits a page", description:"Trigger actions on a page/url hit."}
            default :
            return {title:"Device visit", description:"Trigger device on a page/url hit."}
    }

}
const categories = {
    deviceTypes: ["Smartphone", "Desktop", "Tablet","Mac Book"],
    deviceBrands: ["Apple", "Samsung", "OnePlus", "F2 Mobile", "7 Mobile"],
    deviceOS: ["iOS", "Android", "Windows", "AmigaOS", "BlackBerry"],
    assets: ["en_apb.png", "en_SKY_VAULT_SMS.xlsx", "file1.docx", "report.pdf"],
    limitToPages:["test1","test2","test3","test4"]
  };
 

const DecisionBasePopup = () => {
    const [popupType, setPopUpType] = useState(DecisionPopupType.DEVICE_VISIT);
    
    const {title,description} = getPopUpHeaderText(popupType);
   


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
  
      interface CustomFormFieldProps{
        label:string,
        placeholder:string
      }
      const CustomFormField: React.FC<CustomFormFieldProps> =({label,placeholder})=><FormControl mt={4}>
          <FormLabel>
              {label} <Text as="span" color="gray.400">❓</Text>
          </FormLabel>
          <Input placeholder={placeholder || "Enter value"} />
      </FormControl>

         // Define TypeScript types for props
            interface MultiSelectFieldProps {
                label: string;
                categoryKey: string;
                selectedItems: Record<string, string[]>; // Generic object with string arrays
                handleSelect: (categoryKey: string, value: string) => void;
                handleRemove: (categoryKey: string, value: string) => void;
                options: string[];
                showspan:Boolean;
            }
            const MultiSelectField: React.FC<MultiSelectFieldProps> = ({ 
                label, categoryKey, selectedItems, handleSelect, handleRemove, options ,showspan
              }) => <FormControl mt={4}>
                <FormLabel>{label}{showspan && <Text as="span" color="gray.400">❓</Text>}</FormLabel>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="full" textAlign="left" justifyContent="space-between">
                        {selectedItems[categoryKey]?.length > 0
                            ? selectedItems[categoryKey].join(", ")
                            : "Choose one or more..."}
                    </MenuButton>
                    <MenuList>
                        {options.map((option) => (
                            <MenuItem key={option} onClick={() => handleSelect(categoryKey, option)}>
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
            </FormControl>;
   
    return (
      <Flex position="relative" zIndex={20} align="center" justify="center" minH="100vh" bg="gray.100">
        <Box bg="white" p={6} rounded="md" boxShadow="lg" w="600px">
          {/* Title */}
          
          <Text fontSize="xl" fontWeight="bold">{title}</Text>
          <Text fontSize="sm" color="gray.500">{description}</Text>
  
          {/* Name Input */}
          { popupType === DecisionPopupType.DEVICE_VISIT 
          ||popupType === DecisionPopupType.DOWNLOAD_ASSETS 
          || popupType === DecisionPopupType.REQUEST_DYNAMIC_CONTENT
          || popupType === DecisionPopupType.SENDS_A_APP_PUSH_MESSAGE
          || popupType === DecisionPopupType.SENDS_A_RCS_BOT_MESSAGE
          || popupType === DecisionPopupType.SENDS_A_RCS_MESSAGE
          || popupType === DecisionPopupType.SENDS_A_TEXT_MESSAGE
          || popupType === DecisionPopupType.SENDS_A_WEB_PUSH_MESSAGE
          || popupType === DecisionPopupType.SENDS_A_WHATS_APP_BOT_MESSAGE
          || popupType === DecisionPopupType.SENDS_A_WHATS_APP_MESSAGE
          || popupType === DecisionPopupType.SUBMITS_FORM
          || popupType === DecisionPopupType.VISITS_A_PAGE
          && 
          <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter name" />
          </FormControl>
         }

          {/* Name Input */}
          {popupType === DecisionPopupType.SENDS_A_APP_PUSH_MESSAGE ||
          popupType === DecisionPopupType.SENDS_A_RCS_BOT_MESSAGE ||
          popupType === DecisionPopupType.SENDS_A_RCS_MESSAGE ||
          popupType === DecisionPopupType.SENDS_A_TEXT_MESSAGE ||
          popupType === DecisionPopupType.SENDS_A_WEB_PUSH_MESSAGE||
          popupType === DecisionPopupType.SENDS_A_WHATS_APP_BOT_MESSAGE ||
          popupType === DecisionPopupType.SENDS_A_WHATS_APP_MESSAGE
          && 
          <CustomFormField label="Pattern the reply should match" placeholder=""></CustomFormField>
          }
        
  
          {/* Device Type Selection */}
          { popupType === DecisionPopupType.DEVICE_VISIT
          &&
           <MultiSelectField 
            label="Device type"
            categoryKey="deviceTypes"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.deviceTypes}
            showspan= {false}
            />
           }
            {/* Device brand Selection */}
           { popupType === DecisionPopupType.DEVICE_VISIT
          &&
           <MultiSelectField 
            label="Device brand"
            categoryKey="deviceBrands"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.deviceBrands}
            showspan= {false}
            />
           }
            {/* Device OS Selection */}
            { popupType === DecisionPopupType.DEVICE_VISIT
          &&
           <MultiSelectField 
            label="Device OS"
            categoryKey="deviceOS"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.deviceOS}
            showspan= {false}
            />
           }

            {/* Device OS Selection */}
            { popupType === DecisionPopupType.DOWNLOAD_ASSETS
          &&
           <MultiSelectField 
            label="Limit to Assets"
            categoryKey="assets"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.assets}
            showspan= {true}
            />
           }

            {/*Visit to pages Selection */}
            { popupType === DecisionPopupType.DOWNLOAD_ASSETS
          &&
           <MultiSelectField 
            label="Limit to Pages"
            categoryKey="limitToPages"
            selectedItems={selectedItems}
            handleSelect={handleSelect}
            handleRemove={handleRemove}
            options={categories.limitToPages}
            showspan= {false}
            />
           }
            {popupType === DecisionPopupType.VISITS_A_PAGE &&  <CustomFormField label="URL" placeholder=""></CustomFormField>}
          {popupType === DecisionPopupType.VISITS_A_PAGE && <CustomFormField label="Referrer" placeholder=""></CustomFormField>}


  
          {/* Action Buttons */}
          <Flex mt={6} justify="flex-end">
            <Button variant="outline" mr={2}>✖ Cancel</Button>
            <Button colorScheme="blue">+ Add</Button>
          </Flex>
        </Box>
      </Flex>
    );
  };
  
export default DecisionBasePopup;

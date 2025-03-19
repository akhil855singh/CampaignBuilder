import { ReactNode } from "react";
import { ActionsTypes, ConditionsTypes, DecisionsTypes } from "../../../Constants/enums";

interface CustomFormFieldProps {
    label: string;
    placeholder: string;
    labelColor?: string;
    icon?: React.ReactNode;
    marginBottom?: number 
}

interface MultiSelectFieldProps {
    label: string;
    categoryKey: string;
    maxWidth?: string;
    selectedItems: Record<string, string[]>;
    handleSelect: (categoryKey: string, value: string) => void;
    handleRemove: (categoryKey: string, value: string) => void;
    options: string[];
    showspan: boolean;
}

interface ExpandableTextAreaProps {
  label: string;
  placeholder?: string;
  children: ReactNode
}

interface SingleSelectProps {
  label: string;
  options: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

const contactDecisions = [
  "Device visit",
  "Downloads asset",
  "Request dynamic content",
  "Sends a apppush message",
  "Sends a rcsbot message",
  "Sends a rcs message",
  "Sends a text message",
  "Sends a webpush message",
  "Sends a whatsappbot message",
  "Sends a whatsapp message",
  "Submits form",
  "Visits a page"
];

const categories = {
  deviceTypes: ["Smartphone", "Desktop", "Tablet", "Mac Book"],
  deviceBrands: ["Apple", "Samsung", "OnePlus", "F2 Mobile", "7 Mobile"],
  deviceOS: ["iOS", "Android", "Windows", "AmigaOS", "BlackBerry"],
  assets: ["en_apb.png", "en_SKY_VAULT_SMS.xlsx", "file1.docx", "report.pdf"],
  limitToPages: ["test1", "test2", "test3", "test4"],
  channel:["Email","Text Massage","Whatsapp Message","Rcs Message","WhatsappBot Message","RcsBot Message","Webpush Messag","Apppush Message"],
  pointGroups:["New Subscribers", "Returning Users", "VIP Members"],
  addContactTo:["This campaign (restart the campaign)","25Feb_testing","A/B test 28Feb","A/B testing 34march 2"],
  removeContactFrom:["This campaign (restart the campaign)","25Feb_testing","A/B test 28Feb","A/B testing 34march 2"],
  selectStage:["Stage 1", "Stage 2", "Stage 3", "Stage 4"],
  jumpToEvent:["Stage 1", "Stage 2", "Stage 3", "Stage 4"],
  addContactToSelectedSegment:["Stage 1", "Stage 2", "Stage 3", "Stage 4"],
  removeContactFromSelectedSegment:["Stage 1", "Stage 2", "Stage 3", "Stage 4"],
  addTags:["admin 1", "admin 2", "admin 3", "admin 4"],
  removeTags:["admin 1", "admin 2", "admin 3", "admin 4"],
  integration:["Stage 1", "Stage 2", "Stage 3", "Stage 4"],
  selectMessage:["Stage 1", "Stage 2", "Stage 3", "Stage 4"],
  selectAMarketingMessage:["Stage 1", "Stage 2", "Stage 3", "Stage 4"],
};

// Actions
const actionsCategories = {
  sendEmailToUser: ["Click Here, Click Here", "Admin, Airtel", "ops, tech"]
}

const contactConditions: string[] = [
  "Contact campaigns",
  "Contact device",
  "Contact field value",
  "Contact owner",
  "Contact points",
  "Contact segments",
  "Contact stages",
  "Contact tags",
  "Form field value",
  "Has active notification",
  "Has valid email address",
  "Marked as DNC",
  "Visited page"
];

const getPopUpHeaderText = (popupType: string) => {
  switch (popupType) {
    case DecisionsTypes.DEVICE_VISIT:
      return { title: "Device visit", description: "Trigger device on a page/url hit." }
    case DecisionsTypes.DOWNLOAD_ASSETS:
      return { title: "Downloads asset", description: "Trigger actions upon downloading an asset." }
    case DecisionsTypes.REQUEST_DYNAMIC_CONTENT:
      return { title: "Request dynamic content", description: "This is the top level for a dynamic content request." }
    case DecisionsTypes.SENDS_A_APP_PUSH_MESSAGE:
      return { title: "Sends a apppush message", description: "Contact sent or replied to a apppush message" }
    case DecisionsTypes.SENDS_A_RCS_BOT_MESSAGE:
      return { title: "Sends a rcsbot message", description: "Contact sent or replied to a rcsbot message" }
    case DecisionsTypes.SENDS_A_RCS_MESSAGE:
      return { title: "Sends a rcs message", description: "Contact sent or replied to a rcs message" }
    case DecisionsTypes.SENDS_A_TEXT_MESSAGE:
      return { title: "Sends a text message", description: "Contact sent or replied to a text message" }
    case DecisionsTypes.SENDS_A_WEB_PUSH_MESSAGE:
      return { title: "Sends a webpush message", description: "Contact sent or replied to a webpush message" }
    case DecisionsTypes.SENDS_A_WHATS_APP_BOT_MESSAGE:
      return { title: "Sends a whatsappbot message", description: "Contact sent or replied to a whatsappbot message" }
    case DecisionsTypes.SENDS_A_WHATS_APP_MESSAGE:
      return { title: "Sends a whatsapp message", description: "Contact sent or replied to a whatsapp message" }
    case DecisionsTypes.SUBMITS_FORM:
      return { title: "Submits form", description: "Trigger actions when a contact submits a form" }
    case DecisionsTypes.VISITS_A_PAGE:
      return { title: "Visits a page", description: "Trigger actions on a page/url hit." }
    case ActionsTypes.ADD_DO_NOT_CONTACT:
      return { title: "Add Do Not Contact", description: "Add DoNotContact flag to the contact" }
    case ActionsTypes.ADD_TO_COMPANY_SCORE:
      return { title: "Add to company's score", description: "This action will add the specified value to the company's existing score" }
    case ActionsTypes.ADD_TO_COMPANY_ACTION:
      return { title: "Add to company action", description: "This action will add contacts to the selected company" }
    case ActionsTypes.ADJUST_CONTACT_POINTS:
      return { title: "Adjust contact points", description: "Increase or decrease points" }
    case ActionsTypes.CHANGE_CAMPAIGNS:
      return { title: "Change campaigns", description: "Add contact to specific campaigns and/or remove from specific campaigns when the event is triggered." }
    case ActionsTypes.CHANGE_CONTACT_STAGE:
      return { title: "Change contact's stage", description: "Choose a stage to change a contact to." }
    case ActionsTypes.DELETE_CONTACT:
      return { title: "Delete contact", description: "Permanently deletes the contact as well as all associated statistical data. Warning: this is irreversible!" }
    case ActionsTypes.JUMP_TO_EVENT:
      return { title: "Jump to Event", description: "Jump to the chosen event within the campaign flow." }
    case ActionsTypes.MODIFY_CONTACT_SEGMENTS:
      return { title: "Modify contact's segments", description: "Add contact to or remove contact from segment(s)" }
    case ActionsTypes.MODIFY_CONTACT_TAGS:
      return { title: "Modify contact's tags", description: "Add tag to or remove tag from contact" }
    case ActionsTypes.PUSH_CONTACT_TO_INTEGRATION:
      return { title: "Push contact to integration", description: "Push a contact to the selected integration." }
    case ActionsTypes.REMOVE_DO_NOT_CONTACT:
      return { title: "Remove Do Not Contact", description: "Remove Do Not Contact flag from contact" }
    case ActionsTypes.SEND_APP_PUSH_MESSAGE:
      return { title: "Send apppush message", description: "Sends a text/apppush to the contact." }
    case ActionsTypes.SEND_WEBHOOK:
      return { title: "Send a webhook", description: "Send a webhook (only for experienced users)" }
    case ActionsTypes.SEND_EMAIL:
      return { title: "Send email", description: "Send the selected email to the contact." }
    case ActionsTypes.SEND_EMAIL_TO_USER:
      return { title: "Send email to user", description: "Send email to user, owner or other email addresses" }
    case ActionsTypes.SEND_MARKETING_MESSAGE:
      return { title: "Send marketing message", description: "Send a message through the configured channels within the marketing message selected." }
    case ActionsTypes.SEND_RCSBOT_MESSAGE:
      return { title: "Send rcsbot message", description: "Sends a text/rcsbot to the contact." }
    case ActionsTypes.SEND_RCS_MESSAGE:
      return { title: "Send rcs message", description: "Sends a text/rcs to the contact." }
    case ActionsTypes.SEND_TEXT_MESSAGE:
      return { title: "Send text message", description: "Sends a text/sms to the contact." }
    case ActionsTypes.SEND_WEBPUSH_MESSAGE:
      return { title: "Send webpush message", description: "Sends a text/webpush to the contact." }
    case ActionsTypes.SEND_WHATSAPPBOT_MESSAGE:
      return { title: "Send whatsappbot message", description: "Sends a text/whatsappbot to the contact." }
    case ActionsTypes.SEND_WHATSAPP_MESSAGE:
      return { title: "Send whatsapp message", description: "Sends a text/whatsapp to the contact." }
    case ActionsTypes.UPDATE_CONTACT:
      return { title: "Update contact", description: "Update the current contact's fields with the defined values from this action" }
    case ActionsTypes.UPDATE_CONTACT_PRIMARY_COMPANY:
      return { title: "Update contact's primary company", description: "Update the contact's primary company fields with the defined values from this action" }
    case ActionsTypes.UPDATE_CONTACT_OWNER:
      return { title: "Update contact owner", description: "This action will update contact owner as part of a campaign" }
    case ConditionsTypes.CONTACT_CAMPAIGNS:
      return {title: "Contact campaigns", description: "Condition based on a contact campaigns."}
    case ConditionsTypes.CONTACT_DEVICE:
      return {title: "Contact device", description: "Condition based on a contact device."}
    case ConditionsTypes.CONTACT_FIELD_VALUE:
      return {title: "Contact field value", description: "Condition based on a contact field value."}
    case ConditionsTypes.CONTACT_OWNER:
      return {title: "Contact owner", description: "Condition based on a contact owner."}
    case ConditionsTypes.CONTACT_POINTS:
      return {title: "Contact points", description: "Condition based on contact score"}
    case ConditionsTypes.CONTACT_SEGMENTS:
      return {title: "Contact segments", description: "Condition based on a contact segments."}
    case ConditionsTypes.CONTACT_STAGES:
      return {title: "Contact stages", description: "Condition that the contact belongs to at least one of the selected stages."}
    case ConditionsTypes.CONTACT_TAGS:
      return {title: "Contact tags", description: "Condition based on a contact tags."}
    case ConditionsTypes.FORM_FIELD_VALUE:
      return {title: "Form field value", description: "Trigger actions when a submitted form field value suits the defined condition."}
    case ConditionsTypes.HAS_ACTIVE_NOTIFICATION:
      return {title: "Has active notification", description: "Condition check If contact has active notification."}
    case ConditionsTypes.HAS_VALID_EMAIL_ADDRESS:
      return {title: "Has valid email address", description: "Attempt to validate contact's email address. This may not be 100% accurate."}
    case ConditionsTypes.MARKED_AS_DNC:
      return {title: "Marked as DNC", description: "Condition checks if the contact has the Do Not Contact flag."}
    case ConditionsTypes.VISITED_PAGE:
      return {title: "Visited page", description: "Condition based on all the pages the contact has visited in the past"}
    default:
      return { title: "Device visit", description: "Trigger device on a page/url hit." }
  }
}


export {
  contactDecisions,
  categories,
  actionsCategories,
  getPopUpHeaderText,
  contactConditions
};
export type { 
  CustomFormFieldProps,
  MultiSelectFieldProps,
  ExpandableTextAreaProps,
  SingleSelectProps
}

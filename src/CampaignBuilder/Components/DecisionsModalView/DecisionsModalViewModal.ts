import { DecisionsTypes } from "../../../Constants/enums";

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
    "Visits a page",
    "Device visit"
];

const categories = {
  deviceTypes: ["Smartphone", "Desktop", "Tablet", "Mac Book"],
  deviceBrands: ["Apple", "Samsung", "OnePlus", "F2 Mobile", "7 Mobile"],
  deviceOS: ["iOS", "Android", "Windows", "AmigaOS", "BlackBerry"],
  assets: ["en_apb.png", "en_SKY_VAULT_SMS.xlsx", "file1.docx", "report.pdf"],
  limitToPages:["test1","test2","test3","test4"]
};

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
      default:
        return { title: "Device visit", description: "Trigger device on a page/url hit." }
    }
  }


export {
    contactDecisions,
    categories,
    getPopUpHeaderText
}
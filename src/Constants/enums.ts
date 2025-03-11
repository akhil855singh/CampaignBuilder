enum ActionsTypes {
    ADD_DO_NOT_CONTACT = "Add Do Not Contact",
    ADD_TO_COMPANY_SCORE = "Add to company's score",
    ADD_TO_COMPANY_ACTION = "Add to company action",
    ADJUST_CONTACT_POINTS = "Adjust contact points",
    CHANGE_CAMPAIGNS = "Change campaigns",
    CHANGE_CONTACT_STAGE = "Change contact's stage",
    DELETE_CONTACT = "Delete contact",
    JUMP_TO_EVENT = "Jump to Event",
    MODIFY_CONTACT_SEGMENTS = "Modify contact's segments",
    MODIFY_CONTACT_TAGS = "Modify contact's tags",
    PUSH_CONTACT_TO_INTEGRATION = "Push contact to integration",
    REMOVE_DO_NOT_CONTACT = "Remove Do Not Contact",
    SEND_APP_PUSH_MESSAGE = "Send apppush message",
    SEND_WEBHOOK = "Send a webhook",
    SEND_EMAIL = "Send email",
    SEND_EMAIL_TO_USER = "Send email to user",
    SEND_MARKETING_MESSAGE = "Send marketing message",
    SEND_RCSBOT_MESSAGE = "Send rcsbot message",
    SEND_RCS_MESSAGE = "Send rcs message",
    SEND_TEXT_MESSAGE = "Send text message",
    SEND_WEBPUSH_MESSAGE = "Send webpush message",
    SEND_WHATSAPPBOT_MESSAGE = "Send whatsappbot message",
    SEND_WHATSAPP_MESSAGE = "Send whatsapp message",
    UPDATE_CONTACT = "Update contact",
    UPDATE_CONTACT_PRIMARY_COMPANY = "Update contact's primary company",
    UPDATE_CONTACT_OWNER = "Update contact owner"
}

enum DropdownType {
    DECISION = "Decisions",
    ACTION = "Actions",
    CONDITION = "Conditions"
}

// enum
enum ButtonActions {
    CANCEL = "cancel",
    ADD = "add",
};


export {
    ActionsTypes,
    DropdownType,
    ButtonActions
}
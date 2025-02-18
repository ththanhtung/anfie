export enum EActionTabs {
  LOGIN = "login",
  SIGNUP = "signup",
}

export enum EConversationTypes {
  PRIVATE = "private",
  GROUP = "group",
}

export enum EDropdownAction {
  CREATE_GROUP = "create-group",
  END_CONVERSATION = "end-conversation",
  LEAVE_GROUP = "leave-group",
  ADD_RECIPIENT = "add-recipient",
  REMOVE_RECIPIENT = "remove-recipient",
  MEMBERS = "members",
  GO_TO_GROUP_PAGE = "go-to-group-page",
  REPORT_CONVERSATION = "report-conversation",
}

export enum EPostDropdownAction {
  REPORT = "report",
  DELETE = "delete",
}

export enum EReportTicketType {
  POST = "post",
  CONVERSATION = "conversation",
}
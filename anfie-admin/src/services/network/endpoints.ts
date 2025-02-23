export const ENDPOINT_APIS = {
  auth: {
    login: "api/auth/login",
    signup: "api/auth/signup",
    admin: {
      login: "api/admin/login",
    },
  },
  conversation: {
    list: "api/conversations",
    admin: {
      list: "api/conversations/admin",
    },
  },
  conversationRequest: {
    list: "api/conversation-request",
  },
  messages: {
    list: "api/messages",
  },
  posts: {
    list: "api/posts",
    admin: {
      list: "api/posts/admin",
    },
  },
  confessions: {
    list: "api/confessions",
  },
  tags: {
    list: "api/tags",
  },
  messageRequests: {
    list: "api/message-requests",
  },
  notes: {
    list: "api/notes",
  },
  groups: {
    list: "api/groups",
  },
  preferGenders: {
    list: "api/prefer-genders",
  },
  locations: {
    list: "api/locations",
  },
  userProfiles: {
    list: "api/user-profiles",
    admin: {
      list: "api/user-profiles/admin",
    },
  },
  preferences: {
    list: "api/preferences",
  },
  friendRequests: {
    list: "api/friend-requests",
  },
  groupConversations: {
    list: "api/groups",
  },
  friends: {
    list: "api/friends",
  },
  users: {
    list: "api/user",
  },
  alleys: {
    list: "api/alleys",
    admin: {
      list: "api/alleys/admin",
    },
  },
  reportTicket: {
    list: "api/report-ticket",
    admin: {
      list: "api/report-ticket/admin",
    },
  },
};

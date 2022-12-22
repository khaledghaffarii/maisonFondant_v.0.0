import Message from "./Message";

export const MessageConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/message",
      component: Message
    },
  ]
};

import React from "react";

export const CalendarAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/calendar",
      component: React.lazy(() => import("./CalendarApp"))
    }
  ]
};

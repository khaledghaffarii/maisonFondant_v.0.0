/* eslint-disable no-unused-vars */
import ProviderForm from "./ProviderForm";
export const ProviderConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        },
        leftSidePanel: {
          display: false
        },
        rightSidePanel: {
          display: false
        }
      }
    }
  },
  routes: [
    {
      path: "/formProvider/:id",
      component: ProviderForm
    }
  ]
};

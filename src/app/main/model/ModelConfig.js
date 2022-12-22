import EditModel from "./EditModel";
import Model from "./Model";
import ModelDetails from "./ModelDetails";
import ModelNew from "./ModelNew";

export const ModelConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/model",
      component: Model,
    },
    {
      path: "/newModel",
      component: ModelNew,
    },
    {
      path: "/modelDetails/:id",
      component: ModelDetails,
    },
    {
      path: "/editModel/:id",
      component: EditModel,
    },
  ],
};

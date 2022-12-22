import EditReparationType from "./EditReparationType";
import NewReparationType from "./NewReparationType";
import ReparationType from "./ReparationType";
import ReparationTypeDetails from "./ReparationTypeDetails";

export const ReparationTypeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/ReparationType",
      component: ReparationType,
    },
    {
      path: "/newReparationType",
      component: NewReparationType,
    },
    {
      path: "/editReparationType/:id",
      component: EditReparationType,
    },
    {
      path: "/reparationTypeDetails/:id",
      component: ReparationTypeDetails,
    },
  ],
};

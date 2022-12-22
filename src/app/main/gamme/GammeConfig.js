import EditGamme from "./EditGamme";
import Gamme from "./Gamme";
import GammeDetails from "./GammeDetails";
import NewGamme from "./NewGamme";

export const GammeConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/gamme",
      component: Gamme,
    },
    {
      path: "/newGamme",
      component: NewGamme,
    },
    {
      path: "/editGamme/:id",
      component: EditGamme,
    },
    {
      path: "/gammeDetails/:id",
      component: GammeDetails,
    },
  ],
};

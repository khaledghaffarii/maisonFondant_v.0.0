import Brind from "./Brand";
import NewBrind from "./NewBrand";
import EditBrind from "./EditBrand";
import BrandDetails from "./BrandDetails";
export const BrandConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/brand",
      component: Brind,
    },
    {
      path: "/newBrand",
      component: NewBrind,
    },
    {
      path: "/editBrand/:id",
      component: EditBrind,
    },
    {
      path: "/brandDetails/:id",
      component: BrandDetails,
    },
  ],
};

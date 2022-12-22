import ProductReparation from "./ProductReparation";
import NewProductReparation from "./NewReparationProduct";
import EditProductReparation from "./EditProductReparation";
export const ProductReparationConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/productReparation",
      component: ProductReparation
    },
    {
      path: "/newProductReparation",
      component: NewProductReparation
    },
    {
      path: "/editProductReparation/:id",
      component: EditProductReparation
    }
  ]
};

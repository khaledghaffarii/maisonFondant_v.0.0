import Product from "./Product";
import NewProduct from "./NewProduct";
import EditProduct from "./EditProduct";
import ArchiveProducts from "./ArchiveProducts";
import DetailsProduct from "./DetailsProduct";
export const ProductConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/product",
      component: Product
    },
    {
      path: "/newProduct",
      component: NewProduct
    },
    {
      path: "/editProduct/:id",
      component: EditProduct
    },
    {
      path: "/archiveProducts",
      component: ArchiveProducts
    },
    {
      path: "/detailsProduct/:id",
      component: DetailsProduct
    }
  ]
};

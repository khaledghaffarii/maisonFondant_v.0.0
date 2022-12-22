import Category from "./Category";
import NewCategory from "./NewCategory";
import EditCategory from "./EditCategory";
import ArchiveCategory from "./ArchiveCategory";
import DetailsCategory from "./DetailsCategory";
export const CategoryConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/category",
      component: Category
    },
    {
      path: "/newCategory",
      component: NewCategory
    },
    {
      path: "/editCategory/:id",
      component: EditCategory
    },
    {
      path: "/archiveCategory",
      component: ArchiveCategory
    },
    {
      path: "/detailsCategory/:id",
      component: DetailsCategory
    }
  ]
};

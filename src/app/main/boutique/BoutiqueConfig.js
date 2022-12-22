import Boutique from "./Boutique";
import NewBoutique from "./NewBoutique";
import EditBoutique from "./EditBoutique";
import ArchiveBoutique from "./ArchiveBoutique";
import DetailsBoutique from "./DetailsBoutique";

export const BoutiqueConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/boutique",
      component: Boutique
    },
    {
      path: "/newBoutique",
      component: NewBoutique
    },
    {
      path: "/editBoutique/:id",
      component: EditBoutique
    },
    {
      path: "/archiveBoutique",
      component: ArchiveBoutique
    },
    {
      path: "/detailsBoutique/:id",
      component: DetailsBoutique
    }
  ]
};

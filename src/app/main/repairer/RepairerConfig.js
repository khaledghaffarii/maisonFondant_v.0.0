import Repairer from "./Repairer";
import NewRepairer from "./NewRepairer";
import EditRepairer from "./EditRepairer";
import ArchiveRepairer from "./ArchiveRepairer";
import DetailsRepairer from "./DetailsRepairer";
import EnableDesableRepairer from "./EnableDesableRepairer";
export const RepairerConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/repairer",
      component: Repairer
    },
    {
      path: "/newRepairer",
      component: NewRepairer
    },
    {
      path: "/editRepairer/:id",
      component: EditRepairer
    },
    {
      path: "/enableDesableRepairer/:id",
      component:EnableDesableRepairer
    },
    {
      path: "/archiveRepairer",
      component: ArchiveRepairer
    },
    {
      path: "/detailsRepairer/:id",
      component: DetailsRepairer
    }
  ]
};

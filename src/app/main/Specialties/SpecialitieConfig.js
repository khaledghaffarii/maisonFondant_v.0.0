import Specialitie from "./Specialitie";
import NewSpecialitie from "./NewSpecialitie";
import EditSpecialtie from "./EditSpecialitie";
import ArchiveSepcailities from "./ArchiveSpecialities";
import DetailsSpecialitie from "./DetailsSpecialitie";
export const SpecialitieConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/specialitie",
      component: Specialitie
    },
    {
      path: "/newSpecialitie",
      component: NewSpecialitie
    },
    {
      path: "/editSpecialitie/:id",
      component: EditSpecialtie
    },
    {
      path: "/archiveSpecialities",
      component: ArchiveSepcailities
    },
    {
      path: "/detailsSpecialitie/:id",
      component: DetailsSpecialitie
    }
  ]
};

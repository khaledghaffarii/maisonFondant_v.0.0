import Role from "./Role";
import NewRole from "./NewRole";
import EditRole from "./EditRole";
import ArchiveRole from "./ArchiveRole";
import DetailsRole from "./DetailsRole";
export const RoleConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/role",
      component: Role
    },
    {
      path: "/newrole",
      component: NewRole
    },
    {
      path: "/editrole/:id",
      component: EditRole
    },
    {
      path: "/archiveRole",
      component: ArchiveRole
    },
    {
      path: "/detailsRole/:id",
      component: DetailsRole
    }
  ]
};

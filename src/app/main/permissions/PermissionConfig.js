import Permission from "./Permission";
import NewPermission from "./NewPermission";
import EditPermission from "./EditPermission";
import ArchivePermisson from "./ArchivePermission";
import DetailsPermission from "./DetailsPermission";

export const PermissionConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/permission",
      component: Permission
    },
    {
      path: "/newpermission",
      component: NewPermission
    },
    {
      path: "/editpermission/:id",
      component: EditPermission
    },
    {
      path: "/archivePermission",
      component: ArchivePermisson
    },
    {
      path: "/detailsPermission/:id",
      component: DetailsPermission
    }
  ]
};

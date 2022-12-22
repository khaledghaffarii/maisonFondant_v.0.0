import Team from "./Team";
import NewTeam from "./NewTeam";
import EditTeam from "./EditTeam";
import ArchiveTeam from "./ArchiveTeam";
import DetailsTeam from "./DetailsTeam";
export const TeamConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/team",
      component: Team
    },
    {
      path: "/newTeam",
      component: NewTeam
    },
    {
      path: "/editTeam/:id",
      component: EditTeam
    },
    {
      path: "/archiveTeam",
      component: ArchiveTeam
    },
    {
      path: "/detailsTeam/:id",
      component: DetailsTeam
    }
  ]
};

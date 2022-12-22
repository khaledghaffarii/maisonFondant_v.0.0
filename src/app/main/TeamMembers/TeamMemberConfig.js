import TeamMember from "./TeamMember";
import NewTeamMember from "./NewTeamMember";
import EditTeamMember from "./EditTeamMember";
import ArchiveTeamMembers from "./ArchiveTeamMembers";
import DetailsTeamMember from "./DetailsTeamMember";
export const TeamMemberConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/teamMember",
      component: TeamMember
    },
    {
      path: "/newTeamMember",
      component: NewTeamMember
    },
    {
      path: "/editTeamMember/:id",
      component: EditTeamMember
    },
    {
      path: "/archiveTeamMembers",
      component: ArchiveTeamMembers
    },
    {
      path: "/detailsTeamMember/:id",
      component: DetailsTeamMember
    }
  ]
};

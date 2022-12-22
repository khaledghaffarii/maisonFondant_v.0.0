import Client from "./Client";
import NewClient from "./NewClient";
import EditClient from "./EditClient";
import ArchiveCleint from "./ArchiveClient";
import DetailsClient from "./DetailsClient";
import BlockedClient from "./BlockedClient";
export const ClientConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/client",
      component: Client
    },
    {
      path: "/newclient",
      component: NewClient
    },
    {
      path: "/editclient/:id",
      component: EditClient
    },
    {
      path: "/archiveClient",
      component: ArchiveCleint
    },
    {
      path: "/blockedClient",
      component: BlockedClient
    },
    {
      path: "/detailsClient/:id",
      component: DetailsClient
    }
  ]
};

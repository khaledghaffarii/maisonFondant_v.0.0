import ProviderAnswer from "./ProviderAnswer";
import EditProviderAnswer from "./EditProviderAnswer";
import ArchiveProviderAnswer from "./ArchiveProviderAnswer";
import DetailsProviderAnswer from "./DetailsProviderAnswer";
export const ProviderAnswerConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/providerAnswer",
      component: ProviderAnswer
    },

    {
      path: "/editProviderAnswer/:id",
      component: EditProviderAnswer
    },
    {
      path: "/archiveProviderAnswer",
      component: ArchiveProviderAnswer
    },
    {
      path: "/detailsProviderAnswer/:id",
      component: DetailsProviderAnswer
    }
  ]
};

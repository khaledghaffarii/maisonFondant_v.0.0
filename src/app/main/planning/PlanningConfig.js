import Planning from "./Planning";
import SuiviPlanning from "./SuiviPlanning";
import DetailsPlanning from "../dilevery/Plannings/planning";
import DetailsPlanningSuivi from "../dilevery/Plannings/PlanningSuivi";
export const PlanningConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/planning",
      component: Planning
    }
    ,
    {
      path: "/suiviPlanning",
      component: SuiviPlanning
    }
    ,
    {
      path: "/detailsPlanning/:id",
      component: DetailsPlanning
    } ,
    {
      path: "/PlanningSuivi/:id",
      component: DetailsPlanningSuivi
    }
  ]
};

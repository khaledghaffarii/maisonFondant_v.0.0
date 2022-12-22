import Statistique from "./Statistique";
import Widget2 from './widgets/Widget2';
import Widget1 from './widgets/Widget1';
export const StatistiqueConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path     : '/Widget1',
      component: Widget1
  }, 
  {
      path     : '/Widget2',
      component: Widget2
  }
  ]
};

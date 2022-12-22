import Device from "./Device";
import DeviceDetails from "./DeviceDetails";
import EditDevice from "./EditDevice";
import NewDevice from "./NewDevice";

export const DeviceConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "/device",
      component: Device,
    },
    {
      path: "/newDevice",
      component: NewDevice,
    },
    {
      path: "/editDevice/:id",
      component: EditDevice,
    },
    {
        path: "/deviceDetails/:id",
        component: DeviceDetails,
      },
  ],
};

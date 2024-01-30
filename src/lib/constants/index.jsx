import { IoFish } from "react-icons/io5";
import { HiCog, HiOutlineQuestionMarkCircle } from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "home",
    label: "Home",
    path: "/",
    icon: <IoFish />,
  },
  {
    key: "viewTrip",
    label: "View Trip",
    path: "/view-trip",
    icon: <IoFish />,
  },
  {
    key: "addTrip",
    label: "Add Trip",
    path: "/add-trip",
    icon: <IoFish />,
  },
  {
    key: "editTrip",
    label: "Edit Trip",
    path: "/edit-trip",
    icon: <IoFish />,
  },
  {
    key: "deleteTrip",
    label: "Delete Trip",
    path: "/delete-trip",
    icon: <IoFish />,
  },
  {
    key: "manageTrips",
    label: "Manage Trips",
    path: "/manage-trips",
    icon: <IoFish />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  // {
  //   key: "settings",
  //   label: "Settings",
  //   path: "/settings",
  //   icon: <HiCog />,
  // },
  {
    key: "faq",
    label: "FAQ",
    path: "/faq",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];

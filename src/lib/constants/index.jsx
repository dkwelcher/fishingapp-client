import { IoFish } from "react-icons/io5";
import { HiOutlineChatAlt } from "react-icons/hi";
import { GiBoatFishing } from "react-icons/gi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "home",
    label: "Home",
    path: "/dashboard",
    icon: <IoFish />,
  },
  {
    key: "manageTrips",
    label: "Manage Trips",
    path: "/dashboard/manage-trips",
    icon: <GiBoatFishing />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "feedback",
    label: "Feedback",
    path: "/dashboard/feedback",
    icon: <HiOutlineChatAlt />,
  },
];

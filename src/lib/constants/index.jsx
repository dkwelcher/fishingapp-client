import { IoFish } from "react-icons/io5";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "home",
    label: "Home",
    path: "/",
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
  {
    key: "faq",
    label: "FAQ",
    path: "/faq",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];

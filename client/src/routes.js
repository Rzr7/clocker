// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import MeetingRoom from "@material-ui/icons/MeetingRoom";
import BarChart from "@material-ui/icons/BarChart";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Charts from "views/Charts/Charts.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/app"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/app"
  },
  {
    path: "/report",
    name: "Report",
    icon: BarChart,
    component: Charts,
    layout: "/app"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: MeetingRoom,
    layout: ""
  }
];

export default dashboardRoutes;

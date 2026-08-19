// import {
//   VscAccount,
//   VscSettingsGear,
//   VscBook,
//   VscAdd,
//   VscSignOut,
//   VscMortarBoard,
//   VscHistory,
// } from "react-icons/vsc";

// const dashboardLinks = [
//   {
//     id: 1,
//     name: "My Profile",
//     path: "/dashboard/my-profile",
//     icon: VscAccount,
//     type: "all",
//   },
//   {
//     id: 2,
//     name: "Settings",
//     path: "/dashboard/settings",
//     icon: VscSettingsGear,
//     type: "all",
//   },

//   // Student

//   {
//     id: 3,
//     name: "Enrolled Courses",
//     path: "/dashboard/enrolled-courses",
//     icon: VscMortarBoard,
//     type: "Student",
//   },
//   {
//     id: 4,
//     name: "Purchase History",
//     path: "/dashboard/purchase-history",
//     icon: VscHistory,
//     type: "Student",
//   },

//   // Instructor

//   {
//     id: 5,
//     name: "My Courses",
//     path: "/dashboard/my-courses",
//     icon: VscBook,
//     type: "Instructor",
//   },
//   {
//     id: 6,
//     name: "Add Course",
//     path: "/dashboard/add-course",
//     icon: VscAdd,
//     type: "Instructor",
//   },

//   {
//     id: 7,
//     name: "Logout",
//     icon: VscSignOut,
//     type: "all",
//   },
// ];

// export default dashboardLinks;

import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Your Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscHistory",
  },
];

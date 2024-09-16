import { lazy } from "react";

import { RouteObject } from "react-router-dom";
import Loadable from "../component/Loadable";
import Profile from "../pages/authentication/Member/Profile";
import ApplyToSeller from "../pages/Products/ApplyToSeller/ApplyToSeller";

const MainPages = Loadable(lazy(() => import("../pages/Home/home")));
const HomeMember = Loadable(lazy(() => import("../pages/Home/Member/homemember")));
const ProfileEdit = Loadable(lazy(() => import("../pages/authentication/Member/edit/ProfileEdit")));


const MemberRoutes = (isLoggedIn: boolean): RouteObject[] => {
  return [
    {
      path: "/",
      element: isLoggedIn ? <HomeMember /> : <MainPages />,
    },
    {
      path: "/homemember",
      element: <HomeMember />,
    },
    {
      path: "/apply-to-seller",
      element: <ApplyToSeller />,
    },
    // {
    //   path: "/Login",
    //   element: <LoginPage />,
    // },
    {
      path: "/Profile",
      element: <Profile />,
    },
    {
      path: "/Profile/ProfileEdit/:id",
      element: <ProfileEdit />,
    },
  ];
};

export default MemberRoutes;
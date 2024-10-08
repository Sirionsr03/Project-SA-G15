import { lazy } from "react";

import { RouteObject } from "react-router-dom";
import Loadable from "../component/Loadable";
import LoginPage from "../pages/authentication/Login/Login";
import Profile from "../pages/authentication/Member/Profile";
import MyProducts from "../pages/Products/MyProducts/MyProducts";
// import ApplyToSeller from "../pages/Products/ApplyToSeller/ApplyToSeller";


const MainPages = Loadable(lazy(() => import("../../src/pages/Home/home")));

// const HomeLogin = Loadable(lazy(() => import("../../src/pages/HomeLogin/homelogin")));
const HomeMember = Loadable(lazy(() => import("../pages/Home/Member/homemember")));
const HomeSeller = Loadable(lazy(() => import("../pages/Home/Seller/homeseller")));
const CreateProducts = Loadable(lazy(() => import("../pages/Products/CreateProducts/CreateProducts")));
const ApplyToSeller = Loadable(lazy(() => import("../pages/Products/ApplyToSeller/ApplyToSeller")));
const ProfileEdit = Loadable(lazy(() => import("../../src/pages/authentication/Member/edit/ProfileEdit")));


const MemberRoutes = (isLoggedIn: boolean): RouteObject[] => {
  return [
    {
      path: "/",
      element: isLoggedIn ? <HomeMember /> : <MainPages />,
    },
    {
      path: "/HomeMember",
      element: <HomeMember />,
    },
  
    {
      path: "/Login",
      element: <LoginPage />,
    },
    {
      path: "/apply-to-seller",
      element: <ApplyToSeller />,
    },
    {
      path: "/HomeSeller",
      element: <HomeSeller />,
    },
    {
      path: "/createproducts",
      element: <CreateProducts />,
    },

    {
      path: "/MyProducts",
      element: <MyProducts />,
    },

    {
      path: "/Profile",
      element: <Profile />,
    },
    {
      path: "/Profile/ProfileEdit/:id",
      element: <ProfileEdit />,
    },
    {
      path: "*",
      element: <HomeMember />,
    },
  ];
};

export default MemberRoutes;
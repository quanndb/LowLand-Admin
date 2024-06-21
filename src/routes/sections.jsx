import { lazy, Suspense } from "react";
import { Outlet, Navigate, createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

export const IndexPage = lazy(() => import("src/pages/app"));
export const ProfilePage = lazy(() => import("src/pages/profile"));
export const BlogPage = lazy(() => import("src/pages/blog"));
export const UserPage = lazy(() => import("src/pages/user"));
export const LoginPage = lazy(() => import("src/pages/login"));
export const ProductsPage = lazy(() => import("src/pages/products"));
export const SizePage = lazy(() => import("src/pages/size"));

export const Page404 = lazy(() => import("src/pages/page-not-found"));

// ----------------------------------------------------------------------

export const routes = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <IndexPage /> },
          { path: "user", element: <UserPage /> },
          { path: "products", element: <ProductsPage /> },
          { path: "blog", element: <BlogPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "size", element: <SizePage /> },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "404",
    element: <Page404 />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

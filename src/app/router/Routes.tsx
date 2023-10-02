import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import CaseForm from "../../features/case/form/CaseForm";
import CaseDashboard from "../../features/case/dashboard/CaseDashboard";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "dashboard", element: <CaseDashboard /> },
      { path: "case/create", element: <CaseForm key="create" /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

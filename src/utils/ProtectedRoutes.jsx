import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const apiToken = localStorage.getItem("apiToken");

  return apiToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;

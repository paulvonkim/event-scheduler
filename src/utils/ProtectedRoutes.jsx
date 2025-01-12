import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const apiToken = JSON.parse(localStorage.getItem("token"));

  return apiToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;

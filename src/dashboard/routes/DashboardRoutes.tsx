import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "../pages";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<DashboardPage />} />
    </Routes>
  );
};

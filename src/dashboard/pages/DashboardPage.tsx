import { useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { Route, Routes } from "react-router-dom";
import { BusDetailView, BusesView } from "../views";

export const DashboardPage = () => {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="relative " />
        <div className="mx-6">
          <Routes>
            <Route path="/*" element={<BusesView />} />
            <Route path="/bus/:id" element={<BusDetailView />} />
          </Routes>
        </div>
      </main>
    </SidebarProvider>
  );
};

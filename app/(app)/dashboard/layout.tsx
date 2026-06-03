import DashboardNavbar from "@/components/DashboardNavbar";
import { BookPanelProvider } from "@/contexts/BookPanelContext";
import { Suspense } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BookPanelProvider>
      <Suspense fallback={null}>
        <DashboardNavbar />
      </Suspense>
      {children}
    </BookPanelProvider>
  );
};

export default DashboardLayout;

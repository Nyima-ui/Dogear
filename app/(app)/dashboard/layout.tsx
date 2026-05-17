import DashboardNavbar from "@/components/DashboardNavbar";
import { BookPanelProvider } from "@/contexts/BookPanelContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BookPanelProvider>
      <DashboardNavbar />
      {children}
    </BookPanelProvider>
  );
};

export default DashboardLayout;

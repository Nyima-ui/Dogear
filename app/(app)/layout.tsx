import SidebarNav from "@/components/SidebarNav";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-md:px-5 max-md:pt-3">
      <SidebarNav />
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;

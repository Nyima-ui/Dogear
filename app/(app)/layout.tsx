import SidebarNav from "@/components/SidebarNav";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-md:flex-col max-md:px-5 max-md:pt-3">
      <SidebarNav />
      <main className="grow px-6 py-8 max-md:py-4 max-md:px-0">{children}</main>
    </div>
  );
};

export default AppLayout;

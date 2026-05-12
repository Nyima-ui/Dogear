import Footer from "@/components/Footer";
import HomePageNavbar from "@/components/HomePageNavbar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HomePageNavbar />
      {children}
      <Footer />
    </>
  );
};

export default HomeLayout;

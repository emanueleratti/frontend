import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { DarkModeButton } from "../components/DarkModeButton/DarkModeButton";

export const PageLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <DarkModeButton />
    </>
  );
};

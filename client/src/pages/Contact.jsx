import Navbar from "../components/layout/Navbar";
import ContactHero from "../components/sections/ContactHero";
import Maintenance from "../components/sections/Maintenance";
import MainFooter from "../components/layout/Footer";
import PartnerBanner from "../components/layout/PartnerBanner";

export default function Contact() {
  return (
    <>
      <Navbar />
      <Maintenance />
      {/* <ContactHero /> */}
      <MainFooter />
      <PartnerBanner />
    </>
  );
}

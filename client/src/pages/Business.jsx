import Navbar from "../components/layout/Navbar";
import BusinessHero from "../components/sections/BusinessHero";
import MainFooter from "../components/layout/Footer";
import PartnerBanner from "../components/layout/PartnerBanner";

export default function Business() {
  return (
    <>
      <Navbar />
      <BusinessHero />
      <MainFooter />
      <PartnerBanner />
    </>
  );
}

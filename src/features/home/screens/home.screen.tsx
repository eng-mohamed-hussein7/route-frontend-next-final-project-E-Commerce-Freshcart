import DealsBanner from "../components/DealsBanner";
import FeaturedProducts from "../components/FeaturedProducts";
import HomeSlider from "../components/HomeSlider";
import Newsletter from "../components/Newsletter";
import OurCategories from "../components/OurCategories";
import PromoBanner from "../components/PromoBanner";

export default function HomeScreen() {
  return (
    <>
      <HomeSlider />
      <PromoBanner />
      <OurCategories />
      <DealsBanner/>
      <FeaturedProducts/>
      <Newsletter/>
    </>
  )
}

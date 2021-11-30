import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import Testimonial from "components/testimonials/TwoColumnWithImage.js";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustrationFullForm.js";
import RecentWork from "components/features/VerticalWithAlternateImageAndText.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Team from "components/cards/ProfileThreeColGrid";

export default function Home() {
  return (
    <AnimationRevealPage disabled={true}>
      <Hero />
      <RecentWork />
      <Testimonial />
      <Team />
      <ContactUsForm />
      <Footer />
    </AnimationRevealPage>
  );
}

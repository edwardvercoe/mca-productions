import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import Testimonial from "components/testimonials/TwoColumnWithImage.js";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustrationFullForm.js";
import RecentWork from "components/features/RecentWork.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Team from "components/cards/ProfileThreeColGrid";

import { fetchEntries } from "../contentful/recentWork";
import safeJsonStringify from "safe-json-stringify";

export default function Home({ posts }) {
  return (
    <AnimationRevealPage disabled={true}>
      <Hero />
      <RecentWork posts={posts} />
      <Testimonial />
      <Team />
      <ContactUsForm />
      <Footer />
    </AnimationRevealPage>
  );
}

export async function getStaticProps() {
  const rawData = await fetchEntries({ content_type: "homeHighlightWork" });
  const stringifiedData = safeJsonStringify(rawData);
  const posts = JSON.parse(stringifiedData);

  return {
    props: {
      posts: posts[0].fields,
    },
    revalidate: 5,
  };
}

import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Hero from "components/hero/Hero.js";
import Testimonial from "components/testimonials/Testimonials.js";
import ContactUsForm from "components/forms/ContactUs.js";
import RecentWork from "components/features/RecentWork.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Team from "components/cards/TeamProfile";

import { fetchRecentWork } from "../contentful/fetchData";
import safeJsonStringify from "safe-json-stringify";

export default function Home({ highlights, team, contact, testimonials, hero }) {
  return (
    <AnimationRevealPage disabled={true}>
      <Hero hero={hero} />
      <RecentWork highlights={highlights} />
      <Testimonial testimonials={testimonials} />
      <Team team={team} />
      <ContactUsForm contact={contact} />
      <Footer />
    </AnimationRevealPage>
  );
}

export async function getServerSideProps() {
  const highlightData = await fetchRecentWork({ content_type: "homeHighlightWork" });
  const stringifiedHighlight = safeJsonStringify(highlightData);
  const highlights = JSON.parse(stringifiedHighlight);

  const teamData = await fetchRecentWork({ content_type: "homeTeamBlock" });
  const stringifiedTeam = safeJsonStringify(teamData);
  const team = JSON.parse(stringifiedTeam);

  const contactData = await fetchRecentWork({ content_type: "contact" });
  const stringifiedContact = safeJsonStringify(contactData);
  const contact = JSON.parse(stringifiedContact);

  const testimonialsData = await fetchRecentWork({ content_type: "testimonialsBlock" });
  const stringifiedTestimonials = safeJsonStringify(testimonialsData);
  const testimonials = JSON.parse(stringifiedTestimonials);

  const heroData = await fetchRecentWork({ content_type: "heroBlock" });
  const stringifiedHero = safeJsonStringify(heroData);
  const hero = JSON.parse(stringifiedHero);

  return {
    props: {
      highlights: highlights[0].fields,
      team: team[0].fields,
      contact: contact[0].fields,
      testimonials: testimonials[0].fields,
      hero: hero[0].fields,
    },
  };
}

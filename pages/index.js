import Hero from "components/hero/Hero.js";
import Testimonial from "components/testimonials/Testimonials.js";
import ContactUsForm from "components/forms/ContactUs.js";
import RecentWork from "components/features/RecentWork.js";
import Team from "components/cards/TeamProfile";
import Footer from "components/footers/Footer";
import { fetchRecentWork } from "../contentful/fetchData";
import safeJsonStringify from "safe-json-stringify";

export default function Home({ highlights, team, contact, testimonials, hero, globalSettings }) {
  return (
    <>
      <Hero hero={hero} globalSettings={globalSettings} />
      <RecentWork highlights={highlights} />
      <Testimonial testimonials={testimonials} />
      <Team team={team} />
      <ContactUsForm contact={contact} />
      <Footer globalSettings={globalSettings} />
    </>
  );
}

export async function getStaticProps() {
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

  const globalData = await fetchRecentWork({ content_type: "globalHeaderfooter" });
  const stringifiedGlobal = safeJsonStringify(globalData);
  const globalSettings = JSON.parse(stringifiedGlobal);

  return {
    props: {
      highlights: highlights[0].fields,
      team: team[0].fields,
      contact: contact[0].fields,
      testimonials: testimonials[0].fields,
      hero: hero[0].fields,
      globalSettings: globalSettings[0].fields,
    },
    revalidate: 5, // In seconds
  };
}

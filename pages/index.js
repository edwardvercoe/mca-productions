import Hero from "components/hero/Hero.js";
import Navbar from "components/headers/Navbar";
import Testimonial from "components/testimonials/Testimonials.js";
import ContactUsForm from "components/forms/ContactUs.js";
import RecentWork from "components/features/RecentWork.js";
import Team from "components/cards/TeamProfile";
import Gallery from "components/features/Gallery";
import Services from "components/features/Services";
import Footer from "components/footers/Footer";
import { fetchRecentWork } from "../contentful/fetchData";
import safeJsonStringify from "safe-json-stringify";

export default function Home({ highlights, team, contact, testimonials, hero, globalSettings, services, gallery }) {
  return (
    <>
      <Navbar home={true} globalSettings={globalSettings} />
      <Hero hero={hero} />
      <Services services={services} />
      <RecentWork highlights={highlights} />
      <Gallery gallery={gallery} />
      <Testimonial testimonials={testimonials} />
      <Team team={team} />
      <ContactUsForm contact={contact} />
      <Footer globalSettings={globalSettings} />
    </>
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

  const globalData = await fetchRecentWork({ content_type: "globalHeaderfooter" });
  const stringifiedGlobal = safeJsonStringify(globalData);
  const globalSettings = JSON.parse(stringifiedGlobal);

  const servicesData = await fetchRecentWork({ content_type: "servicesBlock" });
  const stringifiedServices = safeJsonStringify(servicesData);
  const services = JSON.parse(stringifiedServices);

  const galleryData = await fetchRecentWork({ content_type: "galleryBlock" });
  const stringifiedGallery = safeJsonStringify(galleryData);
  const gallery = JSON.parse(stringifiedGallery);

  return {
    props: {
      highlights: highlights[0].fields,
      team: team[0].fields,
      contact: contact[0].fields,
      testimonials: testimonials[0].fields,
      hero: hero[0].fields,
      services: services[0].fields,
      gallery: gallery[0].fields,
      globalSettings: globalSettings[0].fields,
    },
  };
}

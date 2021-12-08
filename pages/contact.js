import Footer from "components/footers/Footer";
import ContactUsForm from "components/forms/ContactUs.js";
import Navbar from "components/headers/Navbar";

import { fetchRecentWork } from "../contentful/fetchData";
import safeJsonStringify from "safe-json-stringify";

export default function Contact({ globalSettings, contact }) {
  return (
    <>
      <Navbar globalSettings={globalSettings} />
      <ContactUsForm contact={contact} />
      <Footer globalSettings={globalSettings} />
    </>
  );
}

export async function getStaticProps() {
  const globalData = await fetchRecentWork({ content_type: "globalHeaderfooter" });
  const stringifiedGlobal = safeJsonStringify(globalData);
  const globalSettings = JSON.parse(stringifiedGlobal);

  const contactData = await fetchRecentWork({ content_type: "contact" });
  const stringifiedContact = safeJsonStringify(contactData);
  const contact = JSON.parse(stringifiedContact);

  return {
    props: {
      globalSettings: globalSettings[0].fields,
      contact: contact[0].fields,
    },
    revalidate: 5, // In seconds
  };
}

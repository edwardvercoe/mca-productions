import Footer from "components/footers/Footer";
import GalleryGrid from "components/blogs/GalleryGrid";
import Navbar from "components/headers/Navbar";

import { fetchRecentWork } from "../contentful/fetchData";
import safeJsonStringify from "safe-json-stringify";

export default function Contact({ globalSettings, gallery }) {
  return (
    <>
      <Navbar globalSettings={globalSettings} />

      <GalleryGrid gallery={gallery} />
      <Footer globalSettings={globalSettings} />
    </>
  );
}

export async function getServerSideProps() {
  const globalData = await fetchRecentWork({ content_type: "globalHeaderfooter" });
  const stringifiedGlobal = safeJsonStringify(globalData);
  const globalSettings = JSON.parse(stringifiedGlobal);

  const galleryData = await fetchRecentWork({ content_type: "galleryBlock" });
  const stringifiedGallery = safeJsonStringify(galleryData);
  const gallery = JSON.parse(stringifiedGallery);

  return {
    props: {
      globalSettings: globalSettings[0].fields,
      gallery: gallery[0].fields,
    },
  };
}

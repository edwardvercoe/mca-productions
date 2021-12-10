import safeJsonStringify from "safe-json-stringify";
import { createClient } from "contentful";
import Navbar from "components/headers/Navbar";
import Footer from "components/footers/Footer";
import { fetchRecentWork } from "../../contentful/fetchData";
import Image from "next/image";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle } from "components/misc/Headings";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: space,
  accessToken: accessToken,
});

const HeadingInfoContainer = tw.div`flex flex-col items-center mt-20`;

const ImageContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  ${tw`rounded`}
  margin: 60px 0;
  position: relative;

  img {
    width: 100%;
    ${tw`rounded`}
    -moz-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

export default function ClientDetails({ gallery, globalSettings }) {
  console.log(gallery);
  if (!gallery) return <div>Loading...</div>;
  const galleryImages = gallery.images;

  return (
    <>
      <Navbar globalSettings={globalSettings} />

      <HeadingInfoContainer>
        <HeadingTitle>{gallery.heading}</HeadingTitle>
      </HeadingInfoContainer>
      <div>
        {galleryImages.map((item, index) => {
          return (
            <ImageContainer>
              <Image src={"https:" + item.fields.file.url} height={item.fields.file.details.image.height} width={item.fields.file.details.image.width} layout="responsive" objectFit="cover" />
            </ImageContainer>
          );
        })}
      </div>
      <Footer globalSettings={globalSettings} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const globalData = await fetchRecentWork({ content_type: "globalHeaderfooter" });
  const stringifiedGlobal = safeJsonStringify(globalData);
  const globalSettings = JSON.parse(stringifiedGlobal);

  // get gallery items
  const { items } = await client.getEntries({
    content_type: "galleryItem",
    "fields.slug": params.slug,
  });

  return {
    props: { gallery: items[0].fields, globalSettings: globalSettings[0].fields },
  };
}

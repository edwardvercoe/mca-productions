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
import ReactPlayer from "react-player";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: space,
  accessToken: accessToken,
});
const PageContainer = styled.div`
  margin: 0 auto;
  max-width: 1440px;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
  @media (max-width: 767px) {
    display: block;
  }
`;

const HeadingInfoContainer = tw.div`flex flex-col items-center mt-40 mb-20`;

const ImageContainer = styled.div`
  flex: 50%;
  padding: 0 5px;

  @media (max-width: 767px) {
    flex: 1 0 0;
    flex-direction: column;
  }

  ${tw`rounded`}
  margin: 20px 0;
  position: relative;

  img {
    width: 100%;
    ${tw`rounded`}
    -moz-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
const VideoContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  ${tw`rounded`}

  @media (max-width: 767px) {
    display: block;
  }
`;
const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 5px;
`;
const PlayerWrapper = styled.div`
  position: relative;
  flex: 50%;
  margin: 0 0 30px 0;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
`;

export default function ClientDetails({ gallery, globalSettings }) {
  if (!gallery) return <div>Loading...</div>;
  const galleryImages = gallery.images;

  return (
    <>
      <Navbar globalSettings={globalSettings} />

      <PageContainer>
        <HeadingInfoContainer>
          <HeadingTitle>{gallery.heading}</HeadingTitle>
        </HeadingInfoContainer>
        <VideoContainer>
          {gallery.videos
            ? gallery.videos.map((item, index) => (
                <PlayerWrapper key={index}>
                  <StyledReactPlayer controls={false} playing={false} width="100%" height="100%" url={item} />
                </PlayerWrapper>
              ))
            : null}
        </VideoContainer>
        <GalleryContainer>
          {gallery.images
            ? galleryImages.map((item, index) => {
                return (
                  <ImageContainer key={index}>
                    <Image src={"https:" + item.fields.file.url} height={item.fields.file.details.image.height} width={item.fields.file.details.image.width} layout="responsive" objectFit="cover" />
                  </ImageContainer>
                );
              })
            : null}
        </GalleryContainer>
      </PageContainer>
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

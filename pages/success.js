import Footer from "components/footers/Footer";
import Navbar from "components/headers/Navbar";
import tw from "twin.macro";
import styled from "styled-components";

import { fetchRecentWork } from "../contentful/fetchData";
import safeJsonStringify from "safe-json-stringify";

const Heading = styled.h1`
  ${tw`text-3xl h-screen  sm:text-4xl lg:text-5xl xl:text-6xl font-black  leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

export default function Success({ globalSettings }) {
  return (
    <>
      <Navbar globalSettings={globalSettings} />
      <div>
        <Heading>Form successfully submitted!</Heading>
      </div>
      <Footer globalSettings={globalSettings} />
    </>
  );
}

export async function getServerSideProps() {
  const globalData = await fetchRecentWork({ content_type: "globalHeaderfooter" });
  const stringifiedGlobal = safeJsonStringify(globalData);
  const globalSettings = JSON.parse(stringifiedGlobal);

  return {
    props: {
      globalSettings: globalSettings[0].fields,
    },
  };
}

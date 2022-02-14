import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import ReactPlayer from "react-player";
import Typical from "react-typical";

const ReactPlayerConainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 76px);
  margin-top: 76px;

  iframe {
    /* Extend it beyond the viewport... */
    width: 300%;
    height: 100%;
    /* ...and bring it back again */
    margin-left: -100%;
  }
  &:after {
    content: " ";
    background-color: black;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const StyledTypical = styled(Typical)`
  background-color: rgba(255, 255, 255, 0.2);
  ${tw`font-black`}
`;

const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144 bg-black`}
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-0`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center `;

const Heading = styled.h1`
  margin-top: auto !important;
  margin-bottom: 100px;

  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1), 0px 18px 23px rgba(0, 0, 0, 0.1);
  ${tw`text-3xl  sm:text-4xl lg:text-5xl xl:text-6xl text-gray-100 leading-snug -mt-24 sm:mt-0 font-medium`}

  span {
    ${tw`inline-block mt-2`}
  }
`;

export default function Hero({ hero, globalSettings }) {
  if (!hero) return <div>loading...</div>;

  let textArray = [];
  for (const item of hero.titleList) {
    textArray.push(item, 2000);
  }

  return (
    <Container>
      <OpacityOverlay />
      <ReactPlayerConainer className="anim-slide-out-top">
        <ReactPlayer controls={false} playing={true} loop={true} volume={0} muted={true} width={"100%"} height={"100%"} url={hero.backgroundVideoUrl} />
      </ReactPlayerConainer>
      <HeroContainer>
        <Content>
          <Heading>
            {hero.titlePrefix}&nbsp;
            <br />
            <StyledTypical steps={textArray} loop={Infinity} wrapper="span" />
          </Heading>
        </Content>
      </HeroContainer>
    </Container>
  );
}

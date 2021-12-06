import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import ReactPlayer from "react-player";

import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";
import Typical from "react-typical";

const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`;
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center `;

const Heading = styled.h1`
  ${tw`text-3xl  sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

export default function Testimonials({ hero }) {
  if (!hero) return <div>loading...</div>;

  let textArray = [];
  for (const item of hero.titleList) {
    textArray.push(item, 2000);
  }

  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="#">Highlights</NavLink>
      <NavLink href="#">Testimonials</NavLink>
      <NavLink href="#">Team</NavLink>
      <NavLink href="#">Contact</NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <PrimaryLink href="/#">Hire Us</PrimaryLink>
    </NavLinks>,
  ];

  return (
    <Container>
      <OpacityOverlay />
      <StyledReactPlayer controls={false} playing={true} loop={true} volume={0} muted={true} width={"100%"} height={"100%"} url={hero.backgroundVideoUrl} />

      <HeroContainer>
        <StyledHeader links={navLinks} />
        <Content>
          <Heading>
            {hero.titlePrefix}&nbsp;
            <br />
            <Typical steps={textArray} loop={Infinity} wrapper="span" />
          </Heading>
          {/* <PrimaryAction>Find out more</PrimaryAction> */}
        </Content>
      </HeroContainer>
    </Container>
  );
}

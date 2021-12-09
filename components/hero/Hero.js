import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import ReactPlayer from "react-player";
import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";
import Typical from "react-typical";
import Link from "next/link";

const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144 bg-black`}
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

export default function Hero({ hero, globalSettings }) {
  if (!hero) return <div>loading...</div>;

  let textArray = [];
  for (const item of hero.titleList) {
    textArray.push(item, 2000);
  }

  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="#highlights">Highlights</NavLink>
      <NavLink href="#testimonials">Testimonials</NavLink>
      <NavLink href="#team">Team</NavLink>
      <Link key={"/contact"} href={"/contact"}>
        <NavLink>Contact</NavLink>
      </Link>
    </NavLinks>,
  ];

  return (
    <Container>
      <OpacityOverlay />
      <StyledReactPlayer className="anim-slide-out-top" controls={false} playing={true} loop={true} volume={0} muted={true} width={"100%"} height={"100%"} url={hero.backgroundVideoUrl} />

      <HeroContainer>
        <StyledHeader links={navLinks} globalSettings={globalSettings} />
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

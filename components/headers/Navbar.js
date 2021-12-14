import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "./light";

const StyledHeader = styled(Header)`
  ${tw`pt-4 max-w-none w-full`}
  margin-bottom: 1rem;
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`;
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 500;
  ${tw` bg-center bg-gray-900 `}
`;

const InnerContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center `;

const Heading = styled.h1`
  ${tw`text-3xl  sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const PrimaryAction = styled.span`
  background: #6145ff;
  padding: 10px 20px;
  ${tw`rounded`}
`;

export default function Navbar({ globalSettings }) {
  if (!globalSettings) return <div>loading...</div>;

  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/gallery">Gallery</NavLink>

      <NavLink href="/contact">
        <PrimaryAction>Contact</PrimaryAction>
      </NavLink>
      <NavLink href={"tel:" + globalSettings.mobileNumber}>
        <PrimaryAction>{globalSettings.mobileNumber}</PrimaryAction>
      </NavLink>
    </NavLinks>,
  ];

  return (
    <Container>
      <InnerContainer>
        <StyledHeader links={navLinks} globalSettings={globalSettings} />
      </InnerContainer>
    </Container>
  );
}

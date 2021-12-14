import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Container as ContainerBase } from "components/misc/Layouts.js";
import { ReactComponent as InstaIcon } from "../../images/instagram-icon.svg";
import { ReactComponent as PhoneIcon } from "../../images/phone-icon2.svg";

const Container = tw(ContainerBase)`bg-gray-900 text-gray-100 -mx-8 -mb-8`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const Row = tw.div`flex items-center justify-center flex-col px-8`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-2xl font-black tracking-wider`;

const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`;
const Link = tw.a`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 pb-1 transition duration-300 mt-2 mx-4`;
const ContactContainer = styled.div`
  display: flex;
  white-space: nowrap;
  margin-top: 20px;

  a {
    ${tw`transition duration-300 border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 `}
  }

  svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;
const SocialLinksContainer = tw.div`mt-10`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block text-gray-100 hover:text-gray-500 transition duration-300 mx-4`}
  svg {
    ${tw`w-10 h-10`}
  }
`;

const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`;
export default function Footer({ globalSettings }) {
  return (
    <Container>
      <Content>
        <Row>
          <LogoContainer>
            <LogoImg src={"https:" + globalSettings.websiteLogo.fields.file.url} />
            <LogoText>MCA Productions</LogoText>
          </LogoContainer>
          <LinksContainer>
            <Link href="/">Home</Link>

            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact</Link>
          </LinksContainer>
          <ContactContainer>
            <PhoneIcon />
            <a href={"tel:" + globalSettings.mobileNumber}>{globalSettings.mobileNumber}</a>
          </ContactContainer>
          <SocialLinksContainer>
            <SocialLink href={globalSettings.instagramUrl} target="_blank">
              <InstaIcon />
            </SocialLink>
          </SocialLinksContainer>
          <CopyrightText>{globalSettings.copyrightText}</CopyrightText>
        </Row>
      </Content>
    </Container>
  );
}

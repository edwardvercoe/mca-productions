import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import defaultCardImage from "images/shield-icon.svg";
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "images/svg-decorator-blob-3.svg";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24`}
`;
const Heading = styled(SectionHeading)`
  ${tw`w-full `}
`;

const Description = tw(SectionDescription)`w-full text-center`;

const VerticalSpacer = tw.div`mt-10 w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 max-w-sm`}
`;

const Card = styled.div`
  ${tw`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    border-color: #6415ff;
    ${tw`border text-center rounded-full p-5 flex-shrink-0`}
    img {
      ${tw`w-12 h-12`}
    }
  }

  .textContainer {
    ${tw`sm:ml-4 mt-4 sm:mt-2`}
  }

  .title {
    ${tw`mt-4 tracking-wide font-bold text-xl leading-none`}
  }

  .description {
    ${tw`mt-1 sm:mt-4 font-medium text-secondary-100 leading-loose`}
  }
`;

const DecoratorBlob = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;

export default function Hero({ services }) {
  const cards = services.services;

  return (
    <Container>
      <ThreeColumnContainer>
        {/* {subheading && <Subheading>{subheading}</Subheading>} */}
        <Heading>{services.title}</Heading>
        <Description>{documentToReactComponents(services.subtitle)}</Description>
        <VerticalSpacer />
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <img src={card.fields.icon ? "https:" + card.fields.icon.fields.file.url : defaultCardImage} alt="" />
              </span>
              <span className="textContainer">
                <span className="title">{card.fields.heading || "Fully Secure"}</span>
                <div className="description">{documentToReactComponents(card.fields.description) || ""}</div>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
}

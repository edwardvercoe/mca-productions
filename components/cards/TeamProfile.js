import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";
import { SectionDescription } from "components/misc/Typography";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as LinkedinIcon } from "images/linkedin-icon.svg";
import { ReactComponent as GithubIcon } from "images/github-icon.svg";

const HeadingContainer = tw.div``;
const Heading = tw(SectionHeading)``;
const Subheading = tw(SubheadingBase)`text-center mb-3`;
const Description = tw(SectionDescription)`mx-auto text-center`;

const Cards = tw.div`flex flex-wrap flex-row justify-center sm:max-w-2xl lg:max-w-5xl mx-auto`;
const Card = tw.div`mt-24 w-full sm:w-1/2 lg:w-1/2 flex flex-col items-center`;
const CardImage = styled.div`
  transition: all 0.25s ease;
  &:hover {
    transform: scale(1.03);
  }
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
      -moz-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      -webkit-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    `}
  ${tw`w-64 h-64 bg-contain bg-center rounded`}
`;
const CardContent = styled.div`
  ${tw`flex flex-col items-center mt-6`}
  .position {
    ${tw`uppercase font-bold tracking-widest text-xs text-primary-600`}
    text-align: center;
    max-width: 320px;
  }
  .name {
    ${tw`mt-1 text-xl font-medium text-gray-900 `}
  }
`;

const CardLinks = styled.div`
  ${tw`mt-6 flex`}
  .link {
    ${tw`mr-8 last:mr-0 text-gray-400 hocus:text-primary-500 transition duration-300`}
    .icon {
      ${tw`fill-current w-6 h-6`}
    }
  }
`;

export default function Team({ team }) {
  if (!team) return <div>loading...</div>;
  const cards = team.teamMembers;

  return (
    <Container id="team">
      <ContentWithPaddingXl>
        <HeadingContainer>
          <Subheading>Our Team</Subheading>
          <Heading>{team.title}</Heading>
          <Description>{team.subtitle}</Description>
        </HeadingContainer>
        <Cards>
          {cards.map((card, index) => (
            <Card key={index}>
              <CardImage imageSrc={"https:" + card.fields.image.fields.file.url} />
              <CardContent>
                <span className="position">{card.fields.workTitle}</span>
                <span className="name">{card.fields.name}</span>
              </CardContent>
            </Card>
          ))}
        </Cards>
      </ContentWithPaddingXl>
    </Container>
  );
}

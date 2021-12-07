import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import getVideoId from "get-video-id";

import dynamic from "next/dynamic";
const ModalVideo = dynamic(() => import("react-modal-video"), { ssr: false });
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Content = tw.div`mt-16`;

const Card = styled.div((props) => [tw`mt-24 md:flex justify-center items-center`, props.reversed ? tw`flex-row-reverse` : "flex-row"]);
const Image = styled.div((props) => [`background-image: url("${props.imageSrc}");`, tw`cursor-pointer	rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-contain bg-no-repeat bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8`]);
const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Subtitle = tw.div`font-bold tracking-wide text-secondary-100`;
const Title = tw.h4`text-3xl font-bold text-gray-900`;
const Description = tw.div`mt-2 text-sm leading-loose`;
const Link = tw.a`inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern2 = tw(SvgDotPatternIcon)`absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern3 = tw(SvgDotPatternIcon)`absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern4 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;

export default function RecentWork({ highlights }) {
  if (!highlights) return <div>loading...</div>;

  const cards = highlights.highlightWork;
  const [isOpen, setOpen] = useState(false);
  const [vidID, setVidID] = useState("");

  const openModal = (e) => {
    setOpen(true);
    setVidID(e);
  };

  return (
    <Container id="highlights">
      <ModalVideo channel="youtube" autoplay isOpen={isOpen} videoId={vidID} onClose={() => setOpen(false)} />

      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle>{highlights.highlightTitle}</HeadingTitle>
          <HeadingDescription>{highlights.subtitleText}</HeadingDescription>
        </HeadingInfoContainer>

        <Content>
          {cards.map((card, i) => {
            const { id } = getVideoId(card.fields.videoUrl);

            return (
              <Card key={i} reversed={i % 2 === 1}>
                <Image imageSrc={"https:" + card.fields.supportingImage.fields.file.url} onClick={() => openModal(id)} />

                <Details>
                  <Subtitle>{card.fields.workSubtitle}</Subtitle>
                  <Title>{card.fields.workTitle}</Title>
                  <Description>{documentToReactComponents(card.fields.workDescription)}</Description>
                  <Link onClick={() => openModal(id)}>Watch Video</Link>
                </Details>
              </Card>
            );
          })}
        </Content>
      </SingleColumn>
      <SvgDotPattern1 />
      <SvgDotPattern2 />
      <SvgDotPattern3 />
      <SvgDotPattern4 />
    </Container>
  );
}

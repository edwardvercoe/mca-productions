import React, { useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { SectionDescription } from "components/misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";

// import "slick-carousel/slick/slick.css";

const Container = tw.div`relative `;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24 `;
const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Controls = tw.div`flex items-center justify-center mt-10`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const Title = styled.h4`
  ${tw`text-3xl font-bold text-gray-900`}
  @media (max-width: 784px) {
    ${tw`text-2xl`}
  }
`;

const TestimonialSliderContainer = styled.div`
  ${tw`mt-24`}
`;

const TestimonialSlider = styled(Slider)`
  display: flex;
  flex-direction: column;
  &:hover {
    &:not(.slick-center) {
    }
  }

  .slick-list {
    overflow: visible;
    order: -1;
  }
  .slick-next,
  .slick-prev {
    top: 0;
    left: 0;
  }

  .slick-slider {
  }

  .slick-slide {
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;

    @media (max-width: 678px) {
      pointer-events: visible;
    }
  }
  .slick-active {
    opacity: 0.4;
    cursor: grab;
    &:hover {
      opacity: 1;
    }

    @media (max-width: 678px) {
      opacity: 0;
      pointer-events: visible;
    }
  }
  .slick-center {
    transform: scale(1.1);
    transition: all 0.3s ease;
    opacity: 1;
    pointer-events: visible;
    @media (max-width: 678px) {
      opacity: 1 !important;
      pointer-events: visible !important;
      transform: none;
    }

    h4 {
      transition: all 0.3s ease;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0);
        transition: all 0.3s ease;
      }
    }

    &:hover {
      opacity: 1 !important;
      cursor: pointer;
      transform: scale(1.13);
      h4 {
        position: relative;
        display: inline-block;
        color: #6415ff;
        &:after {
          background-color: #6415ff;
        }
      }
    }
  }
`;
const GalleryItem = styled.div`
  padding: 20px;
  @media (max-width: 767px) {
    padding: 0;
  }
  ${tw`flex! flex-col items-center md:items-stretch md:justify-center outline-none `}
`;
const ImageContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  ${tw`rounded`}
  margin: 20px 0;

  img {
    width: 100%;
    ${tw`rounded`}
    -moz-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
const TextContainer = styled.div`
  text-align: center;
  position: relative;
  display: inline-block;
  margin: 0 auto;
`;

const Description = tw(SectionDescription)`w-full text-center`;

const SliderControlButtonContainer = styled.div`
  position: relative;
  display: inline-block;
  height: 50px;
  width: 50px;
  background: pink;
  button {
    ${tw`text-secondary-500 hover:text-primary-500 focus:outline-none transition duration-300 transform hover:scale-125 transform `}
    svg {
      ${tw`w-8`}
    }
  }
`;

const DecoratorBlob1 = tw(SvgDotPatternIcon)`absolute top-1/2 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const DecoratorBlob2 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;

export default function Gallery({ gallery }) {
  const galleryItems = gallery.galleryItems;

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    autoplaySpeed: 4000,
    autoplay: true,
    arrows: false,
    draggable: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 678,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          draggable: true,
        },
      },
    ],
  };
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <Container>
      <Content>
        <HeadingInfoContainer>
          <HeadingTitle>{gallery.title}</HeadingTitle>
          <Description>{documentToReactComponents(gallery.subtitle)}</Description>
          <HeadingDescription></HeadingDescription>
        </HeadingInfoContainer>
        <TestimonialSliderContainer>
          <TestimonialSlider ref={setSliderRef} {...settings}>
            {galleryItems.map((item, index) => (
              <Link key={index} href={`/gallery/${item.fields.slug}`}>
                <GalleryItem>
                  <TextContainer>
                    <Title>{item.fields.heading}</Title>
                  </TextContainer>
                  <ImageContainer>
                    <img src={"https:" + item.fields.thumbnailImage.fields.file.url} alt={""} />
                  </ImageContainer>
                </GalleryItem>
              </Link>
            ))}
          </TestimonialSlider>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}>
              <ChevronLeftIcon />
            </PrevButton>
            <NextButton onClick={sliderRef?.slickNext}>
              <ChevronRightIcon />
            </NextButton>
          </Controls>
        </TestimonialSliderContainer>
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
}

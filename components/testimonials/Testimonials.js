import React, { useState } from "react";
import Slider from "react-slick";

import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import { ReactComponent as QuotesLeftIcon } from "../../images/quotes-l.svg";
import { ReactComponent as QuotesRightIcon } from "../../images/quotes-r.svg";

import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";

// import "slick-carousel/slick/slick.css";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = styled.p`
  ${tw`mt-4 font-medium text-gray-600 text-center max-w-sm`}
  a {
    ${tw`font-bold text-primary-500`}
    position: relative;
    &:hover {
      &:after {
        transform-origin: bottom left;
        transform: scaleX(1);
      }
    }
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #6415ff;
      transform-origin: bottom right;
      transform: scaleX(0);
      transition: transform 0.5s ease;
    }
  }
`;

const TestimonialSliderContainer = tw.div`mt-24`;
const TestimonialSlider = styled(Slider)``;
const Testimonial = tw.div`flex! flex-col items-center md:items-stretch md:flex-row md:justify-center outline-none`;
const ImageContainer = styled.div`
  ${tw`md:mx-3 lg:mx-6 w-2/3 md:w-4/12 rounded flex items-center max-w-xs md:max-w-none`}
  margin: 20px 0;

  img {
    ${tw`rounded`}
    -moz-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
const TextContainer = tw.div`md:mx-3 lg:mx-6 md:w-6/12 py-4 flex flex-col justify-between`;
const QuoteContainer = tw.div`relative p-6 md:p-8 lg:p-10 mt-4 md:mt-0`;
const Quote = styled.blockquote`
  @media (max-width: 767px) {
    font-size: 0.875rem;
  }
  ${tw`text-center md:text-left font-medium text-xl lg:text-xl xl:text-2xl`}
`;

const CustomerInfo = tw.div`px-5 lg:px-10 text-center md:text-left mt-4 md:mt-0`;
const CustomerName = tw.h5`font-bold text-lg lg:text-xl xl:text-2xl text-primary-500`;
const CustomerTitle = tw.p`font-medium text-sm`;

const QuotesLeft = tw(QuotesLeftIcon)`w-8 h-8 lg:w-10 lg:h-10 text-primary-500 absolute top-0 left-0`;
const QuotesRight = tw(QuotesRightIcon)`w-8 h-8 lg:w-10 lg:h-10 text-primary-500 absolute bottom-0 right-0`;

const SliderControlButtonContainer = styled.div`
  ${tw`absolute top-0 h-full flex items-end md:items-center z-20`}
  button {
    ${tw`text-secondary-500 hover:text-primary-500 focus:outline-none transition duration-300 transform hover:scale-125 transform -translate-y-2/3 md:translate-y-0`}
    svg {
      ${tw`w-8`}
    }
  }
`;

const Controls = tw.div`flex items-center justify-center mt-10`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const DecoratorBlob1 = tw(SvgDotPatternIcon)`absolute top-1/2 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const DecoratorBlob2 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;

export default function Testimonials({ testimonials }) {
  if (!testimonials) return <div>loading...</div>;
  const testimonialSingle = testimonials.testimonials;
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <Container id="testimonials">
      <Content>
        <HeadingInfoContainer>
          <HeadingTitle>{testimonials.heading}</HeadingTitle>
          {testimonials.headingSubline ? <HeadingDescription>{documentToReactComponents(testimonials.headingSubline)}</HeadingDescription> : null}
        </HeadingInfoContainer>
        <TestimonialSliderContainer>
          <TestimonialSlider ref={setSliderRef} autoplaySpeed={10000} infinite={true} autoplay={true}>
            {testimonialSingle.map((testimonial, index) => (
              <Testimonial key={index}>
                <ImageContainer>
                  <img src={testimonial.fields.image.fields.file.url} alt={"Customer photo"} />
                </ImageContainer>
                <TextContainer>
                  <QuoteContainer>
                    <QuotesLeft />
                    <Quote>{documentToReactComponents(testimonial.fields.quote)}</Quote>
                    <QuotesRight />
                  </QuoteContainer>
                  <CustomerInfo>
                    <CustomerName>{testimonial.fields.name}</CustomerName>
                    <CustomerTitle>{testimonial.fields.company}</CustomerTitle>
                  </CustomerInfo>
                </TextContainer>
              </Testimonial>
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

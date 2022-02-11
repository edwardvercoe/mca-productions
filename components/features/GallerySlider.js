import React, { useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import { ReactComponent as SvgDotPatternIcon } from "../../images/dot-pattern.svg";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { SectionDescription } from "components/misc/Typography.js";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
SwiperCore.use([Autoplay, Pagination]);

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

export default function Gallery({ gallery }) {
  const galleryItems = gallery.galleryItems;

  return (
    <Container>
      <Content>
        <HeadingInfoContainer>
          <HeadingTitle>{gallery.title}</HeadingTitle>
          <Description>{documentToReactComponents(gallery.subtitle)}</Description>
        </HeadingInfoContainer>
        <TestimonialSliderContainer>
          <Swiper
            grabCursor={true}
            pagination={{
              dynamicBullets: true,
            }}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper"
          >
            {galleryItems.map((item, index) => (
              <SwiperSlide key={index}>
                <StyledLink href={`/gallery/${item.fields.slug}`}>
                  <GalleryItem>
                    <TextContainer>
                      <SliderTitle>{item.fields.heading}</SliderTitle>
                    </TextContainer>
                    <ImageContainer>
                      <img src={"https:" + item.fields.thumbnailImage.fields.file.url} alt={""} />
                    </ImageContainer>
                  </GalleryItem>
                </StyledLink>
              </SwiperSlide>
            ))}
            {/* <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide> */}
          </Swiper>
        </TestimonialSliderContainer>
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
}

const Container = tw.div`relative `;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24 `;
const HeadingInfoContainer = tw.div`flex flex-col items-center`;

const SliderTitle = styled.h4`
  ${tw`text-3xl font-bold text-gray-900`}
  @media (max-width: 784px) {
    ${tw`text-2xl`}
  }
`;

const StyledLink = styled(Link)`
  cursor: pointer;
`;

const TextContainer = styled.div`
  text-align: center;
  position: relative;
  display: inline-block;
  margin: 0 auto;
`;

const TestimonialSliderContainer = styled.div`
  ${tw`mt-24`}

  .swiper-container {
    padding-bottom: 40px;
    z-index: unset;

    .swiper-pagination-bullet {
      height: 12px;
      width: 12px;
    }
  }
`;

const GalleryItem = styled.div`
  padding: 20px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  @media (max-width: 767px) {
    padding: 0;
  }
  ${tw`flex! flex-col items-center md:items-stretch md:justify-center outline-none `}

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
    transform: scale(1.13);
    @media (max-width: 767px) {
      transform: none;
    }
    h4 {
      position: relative;
      display: inline-block;
      color: #6415ff;
      &:after {
        background-color: #6415ff;
      }
    }
  }
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

const Description = tw(SectionDescription)`w-full text-center`;

const DecoratorBlob1 = tw(SvgDotPatternIcon)`absolute top-1/2 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const DecoratorBlob2 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;

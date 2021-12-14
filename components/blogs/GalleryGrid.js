import React from "react";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";
import { SectionDescription } from "components/misc/Typography";
import { ReactComponent as SvgDotPatternIcon } from "images/dot-pattern.svg";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

const HeadingContainer = tw.div`text-center`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)``;
const Description = tw(SectionDescription)`mx-auto`;

const Posts = tw.div`mt-12 flex flex-wrap -mr-3 relative`;
const Post = styled.div`
  cursor: pointer;
  overflow: hidden;
  &:hover {
    .post-image {
      transform: scale(1.03);
    }
  }
  ${tw`flex flex-col h-full bg-gray-200 rounded`}
`;

const PostImageContainer = styled.div`
  overflow: hidden;
`;

const PostImage = styled.div`
  transition: all 0.25s ease;
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-64 sm:h-80 bg-center bg-cover rounded-t`}
`;
const PostText = styled.div`
  z-index: 2;
  ${tw`flex-1 px-6 py-8`}
`;
const PostTitle = tw.h6`font-bold group-hocus:text-primary-500 transition duration-300 `;
const PostDescription = tw.p``;

const PostContainer = styled.div`
  ${tw`relative z-20 mt-10 sm:pt-3 pr-3 w-full sm:w-1/2 lg:w-1/3 max-w-sm mx-auto sm:max-w-none sm:mx-0`}

  ${(props) =>
    props.featured &&
    css`
      ${tw`w-full sm:w-full lg:w-2/3`}
      ${Post} {
        ${tw`sm:flex-row items-center sm:pr-3`}
      }
      ${PostImageContainer} {
        width: 50%;
        height: 100%;
      }
      ${PostImage} {
        ${tw`sm:h-80 sm:min-h-full w-full sm:w-1/2 rounded-t sm:rounded-t-none sm:rounded-l`}
        width: 100% !important;
      }
      ${PostText} {
        ${tw`pl-8 pr-5`}
      }
      ${PostTitle} {
        ${tw`text-2xl`}
      }
      ${PostDescription} {
        ${tw`mt-4 text-sm font-semibold text-gray-600 leading-relaxed`}
      }
    `}
`;

const DecoratorBlob1 = tw(SvgDotPatternIcon)`absolute bottom-0 left-0 w-32 h-32 mb-3 ml-3 transform -translate-x-1/2 translate-y-1/2 fill-current text-gray-500 opacity-50`;
const DecoratorBlob2 = tw(SvgDotPatternIcon)`absolute top-0 right-0 w-32 h-32 mt-16 mr-6 transform translate-x-1/2 -translate-y-1/2 fill-current text-gray-500 opacity-50`;

export default function GalleryGrid({ gallery }) {
  if (!gallery) return <div>loading...</div>;

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          <Heading>{gallery.title}</Heading>
          <Description>{documentToReactComponents(gallery.subtitle)}</Description>
        </HeadingContainer>
        <Posts>
          {gallery.galleryItems.map((post, index) => (
            <PostContainer key={index}>
              <Link href={`/gallery/${post.fields.slug}`}>
                <Post className="group">
                  <PostImageContainer>
                    <PostImage imageSrc={post.fields.thumbnailImage.fields.file.url} className="post-image" />
                  </PostImageContainer>
                  <PostText>
                    <PostTitle>{post.fields.heading}</PostTitle>
                    {/* {post.featured && <PostDescription>{post.description}</PostDescription>} */}
                  </PostText>
                </Post>
              </Link>
            </PostContainer>
          ))}
          <DecoratorBlob1 />
          <DecoratorBlob2 />
        </Posts>
      </ContentWithPaddingXl>
    </Container>
  );
}

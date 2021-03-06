import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ReactComponent as SvgDotPatternIcon } from "images/dot-pattern.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)((props) => [tw`md:w-7/12 mt-16 md:mt-0`, props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}"); clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);

`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left `;

const Subheading = tw(SubheadingBase)`text-center md:text-left text-primary-500`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.div`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`;
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`;

const DecoratorBlob1 = tw(SvgDotPatternIcon)`absolute top-0 left-0 w-32 h-32 mb-3 ml-3 transform -translate-x-1/2 translate-y-1/2 fill-current text-primary-500 opacity-25`;
const DecoratorBlob2 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 w-32 h-32 mt-16 mr-6 transform translate-x-1/2 -translate-y-1/2 fill-current text-primary-500 opacity-25`;

export default function ContactUs({ contact, subheading = "Contact Us", submitButtonText = "Send", formAction = "#", formMethod = "get", textOnLeft = true }) {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={"https:" + contact.image.fields.file.url} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{contact.title}</Heading>
            <Description>{documentToReactComponents(contact.description)}</Description>
            <Form action="https://formkeep.com/f/3cbb0aa9596b" accept-charset="UTF-8" enctype="multipart/form-data" method="POST">
              <input type="hidden" name="utf8" value="???" />
              <Input type="email" name="email" placeholder="Your Email Address" />
              <Input type="text" name="name" placeholder="Full Name" />
              <Input type="text" name="subject" placeholder="Subject" />
              <Textarea name="message" placeholder="Your Message Here" />
              <SubmitButton type="submit">{submitButtonText}</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
      {/* <DecoratorBlob1 /> */}
      <DecoratorBlob2 />
    </Container>
  );
}

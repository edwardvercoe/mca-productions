import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
// import EmailIllustrationSrc from "https://images.unsplash.com/photo-1550699026-4114bbf4fb49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80";

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
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`;
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`;

export default ({
  subheading = "Contact Us",
  heading = (
    <>
      Start your vision <span tw="text-primary-500">with us.</span>
      <wbr />
    </>
  ),
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  submitButtonText = "Send",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={"https://scontent.fsyd4-1.fna.fbcdn.net/v/t39.30808-6/245691808_10226104528379653_7927731764187144709_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=rxt3gup7h4gAX-5ny0l&_nc_ht=scontent.fsyd4-1.fna&oh=53f92869129f4a1fe7141d0b1096ae48&oe=61AAE77F"} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
            <Form action={formAction} method={formMethod}>
              <Input type="email" name="email" placeholder="Your Email Address" />
              <Input type="text" name="name" placeholder="Full Name" />
              <Input type="text" name="subject" placeholder="Subject" />
              <Textarea name="message" placeholder="Your Message Here" />
              <SubmitButton type="submit">{submitButtonText}</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};

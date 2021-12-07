import "tailwindcss/dist/base.css";
import "css/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../helpers/Layout";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import ScrollToTop from "react-scroll-up";
import styled from "styled-components";

import { ReactComponent as ArrowIcon } from "images/arrow-left-3-icon.svg";

const StyledArrow = styled(ArrowIcon)`
  width: 40px;
  height: 40px;
  border-radius: 0.25rem;
  background-color: #fcfcfc;
  transform: rotate(90deg);
  -moz-box-shadow: rgba(0, 0, 0, 0.35) 2px 0px 5px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.35) 2px 0px 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 2px 0px 5px;

  padding: 7px;
`;

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, globalSettings }) {
  return (
    <Layout>
      <AnimationRevealPage disabled={true}>
        <Component {...pageProps} />
        <ScrollToTop showUnder={800}>
          <StyledArrow />
        </ScrollToTop>
      </AnimationRevealPage>
    </Layout>
  );
}

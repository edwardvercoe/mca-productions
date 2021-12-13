import "tailwindcss/dist/base.css";
import "css/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../helpers/Layout";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import ScrollToTop from "react-scroll-up";
import styled from "styled-components";

import { ReactComponent as ArrowIcon } from "images/arrow-left-3-icon.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";

const StyledArrow = styled(ChevronLeftIcon)`
  color: white;
  transform: rotate(90deg) translateY(-4px);
`;
const ChevronContainer = styled.div`
  -moz-box-shadow: rgba(0, 0, 0, 0.35) 2px 0px 5px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.35) 2px 0px 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 2px 0px 5px;
  width: 50px;
  height: 50px;

  background-color: #6415ff;
  border-radius: 50%;
  padding: 10px;
  transition: 0.25s all ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, globalSettings }) {
  return (
    <Layout>
      <AnimationRevealPage disabled={true}>
        <Component {...pageProps} />
        <ScrollToTop showUnder={800}>
          <ChevronContainer>
            <StyledArrow />
          </ChevronContainer>
        </ScrollToTop>
      </AnimationRevealPage>
    </Layout>
  );
}

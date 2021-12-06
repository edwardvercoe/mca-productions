import "tailwindcss/dist/base.css";
import "css/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../helpers/Layout";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";

import Footer from "components/footers/Footer.js";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <AnimationRevealPage disabled={true}>
        <Component {...pageProps} />
        <Footer />
      </AnimationRevealPage>
    </Layout>
  );
}

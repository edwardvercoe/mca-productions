import NextHead from "next/head";

const Layout = (props) => (
  <>
    <NextHead>
      <title>MCA Productions</title>
    </NextHead>
    {props.children}
  </>
);

export default Layout;

import NextHead from "next/head";

const Layout = (props) => (
  <>
    <NextHead>
      <title>MCA Productions</title>
      <link rel="icon" sizes="192x192" href="/static/images/icons-192.png" />
      <link rel="apple-touch-icon" href="/static/images/icons-192.png" />
      <link rel="icon" href="/static/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
    </NextHead>
    {props.children}
  </>
);

export default Layout;

import Head from "next/head";
import { ArrowCircleLeftIcon, MenuIcon } from "@heroicons/react/solid";

import Header from "web/components/Header";
import Footer from "web/components/Footer";

const Page = (props) => {
  const { children, title, noBack, noFooter, ...otherProps } = props;

  return (
    <>
      <Head>
        <title>hek.dev - {title}</title>
      </Head>
      <Header>{title}</Header>
      <main {...otherProps}>
        <section>{children}</section>
      </main>
      {noFooter ? null : <Footer />}
    </>
  );
};

export default Page;

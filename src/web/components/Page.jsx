import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import Head from "next/head";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";

import Header from "web/components/Header";
import Footer from "web/components/Footer";

const BackButton = (props) => {
  const router = useRouter();
  const handleClick = useCallback(() => router.back(), [router]);

  return (
    <ArrowCircleLeftIcon
      onClick={handleClick}
      className="h-7 w-7 mr-2 mt-1"
      {...props}
    />
  );
};

const Page = (props) => {
  const { children, title, noBack, noFooter, ...otherProps } = props;

  return (
    <>
      <Head>
        <title>hek.dev - {title}</title>
      </Head>
      <Header>
        {noBack ? null : <BackButton />}
        {title}
      </Header>
      <main {...otherProps}>
        <section>{children}</section>
      </main>
      {noFooter ? null : <Footer />}
    </>
  );
};

export default Page;

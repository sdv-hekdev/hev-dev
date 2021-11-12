import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import Head from "next/head";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";

import Footer from "public/components/Footer";
import Header from "public/components/Header";

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
    <main {...otherProps} className="flex flex-col h-full">
      <Head>{/* <title>hek-dev - {title}</title> */}</Head>
      <Header>
        <title>hek-dev - {title}</title>

        {noBack ? null : <BackButton />}
        {title}
      </Header>
      <section>{children}</section>
      {noFooter ? null : <Footer />}
    </main>
  );
};

export default Page;

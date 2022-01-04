import { useCallback } from "react";
import { useRouter } from "next/router";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";

import NavBar from "./NavBar";

const BackButton = (props) => {
  const router = useRouter();
  const handleClick = useCallback(() => router.back(), [router]);

  return (
    <ArrowCircleLeftIcon
      onClick={handleClick}
      className="text-white h-7 w-7 mr-2 mt-1"
      {...props}
    />
  );
};

const Header = () => {
  return (
    <header className="relative">
      <NavBar />
    </header>
  );
};

export default Header;

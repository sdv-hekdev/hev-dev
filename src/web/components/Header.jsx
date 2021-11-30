import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { ArrowCircleLeftIcon, MenuIcon } from "@heroicons/react/outline";

// import Input from "./Input";

const navigation = [
  { name: "item 1", href: "#" },
  { name: "item 2", href: "#" },
  { name: "item 3", href: "#" },
  { name: "item 4", href: "#" },
];

const BackButton = (props) => {
  const router = useRouter();
  const handleClick = useCallback(() => router.back(), [router]);

  return (
    <ArrowCircleLeftIcon
      onClick={handleClick}
      className="text-white  h-7 w-7 mr-2 mt-1"
      {...props}
    />
  );
};

const BurgerMenu = (props) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleNavBar = useCallback(() => setToggleSidebar(!toggleSidebar));

  return (
    <MenuIcon
      onClick={handleNavBar}
      className="text-white inset-x-0 left-0 h-7 w-7 mr-2 ml-5 mt-1"
      {...props}
    >
      {toggleSidebar ? <SideBar /> : null}
    </MenuIcon>
  );
};

const Header = (props) => {
  const { noBack, noFooter, ...otherProps } = props;

  return (
    <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <a href="/">
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                alt=""
              />
            </a>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <a
              href="/sign"
              className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            >
              Sign in/up
            </a>
            <a
              href="/cart"
              className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Cart
            </a>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;

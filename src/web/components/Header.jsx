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
    <header className="bg-green-600" {...otherProps}>
      <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between w-full py-6 border-b border-green-500 lg:border-none">
          <div className="flex justify-between">
            <a href="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                alt=""
              />
            </a>
            <div className="hidden ml-10 space-x-8 lg:flex">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex-1 text-base font-medium text-white hover:text-green-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <a
              href="/sign"
              className="inline-block bg-green-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            >
              Sign in
            </a>
            <a
              href="/sign"
              className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-green-600 hover:bg-green-50"
            >
              Sign up
            </a>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-green-50"
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

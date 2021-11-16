import { useRouter } from "next/dist/client/router";
import { useCallback, useState } from "react";
import { ArrowCircleLeftIcon, MenuIcon } from "@heroicons/react/outline";

const NavBarTitle = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
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
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleClick = useCallback(() => setOpenSidebar(true));
  return (
    <MenuIcon
      onClick={handleClick}
      className="text-white  inset-x-0 left-0 h-7 w-7 mr-2 ml-5 mt-1"
      {...props}
    />
  );
};

const Header = (props) => {
  const { noBack, noFooter, ...otherProps } = props;

  return (
    <header className="absolute inset-x-0 top-0 bg-indigo-600" {...otherProps}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            {noBack ? null : <BackButton />}
            <BurgerMenu />

            <div className="hidden ml-10 space-x-8 lg:block">
              {NavBarTitle.map((link) => (
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
              href="#"
              className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            >
              Sign in
            </a>
            <a
              href="#"
              className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Sign up
            </a>
          </div>
        </div>
        <div className="w-max py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {NavBarTitle.map((link) => (
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

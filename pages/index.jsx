import { MenuIcon } from "@heroicons/react/outline";
import { useState } from "react";

import Page from "../src/web/components/Page";
import SideBar from "../src/web/components/Sidebar";
import TrendingItems from "../src/web/components/Trending";
import LandingPage from "./landing-page";

const HomePage = () => {
  const [sideBar, setSideBar] = useState(false);
  const handleSideBar = () => {
    setSideBar(!sideBar);
  };

  return <LandingPage />;
};

export default HomePage;

import { useState } from "react";

import Page from "../src/web/components/Page";
import SideBar from "../src/web/components/Sidebar";
import TrendingItems from "../src/web/components/Trending";

const HomePage = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const handleSideBar = () => {};

  return (
    <Page>
      <div className="flex">
        <SideBar />
        <TrendingItems />
      </div>
    </Page>
  );
};

export default HomePage;

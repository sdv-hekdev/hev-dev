import { MenuIcon } from "@heroicons/react/outline";
import { useState } from "react";

import Page from "../src/web/components/Page";
import SideBar from "../src/web/components/Sidebar";
import TrendingItems from "../src/web/components/Trending";

const HomePage = () => {
  const [sideBar, setSideBar] = useState(false);
  const handleSideBar = () => {
    setSideBar(!sideBar);
  };

  return (
    <Page>
      <div className="flex">
        <div>
          <MenuIcon className="w-8" onClick={handleSideBar} />
          {sideBar === true ? (
            <div>
              <SideBar className="flex" />
            </div>
          ) : null}
        </div>
        <TrendingItems />
      </div>
    </Page>
  );
};

export default HomePage;

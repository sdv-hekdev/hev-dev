import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/outline";

import cn from "../cn";

const navigation = [
  { name: "item 1", icon: HomeIcon, href: "#", current: true },
  { name: "item 2", icon: UsersIcon, href: "#", count: 3, current: false },
  { name: "item 3", icon: FolderIcon, href: "#", count: 4, current: false },
  { name: "item 4", icon: CalendarIcon, href: "#", current: false },
  { name: "item 5", icon: InboxIcon, href: "#", count: 12, current: false },
  { name: "item 6", icon: ChartBarIcon, href: "#", current: false },
];

const SideBar = () => {
  return (
    <div className=" flex flex-col min-h-0 bg-indigo-700">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4"></div>
        <nav className="mt-5 flex-1 px-2 space-y-1" aria-label="Sidebar">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                item.current
                  ? "bg-indigo-800 text-white"
                  : "text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
            >
              <item.icon
                className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                aria-hidden="true"
              />
              <span className="flex-1">{item.name}</span>
              {item.count ? (
                <span
                  className={cn(
                    item.current ? "bg-indigo-600" : "bg-indigo-800",
                    "ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full"
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
        <a href="#" className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src=""
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Tom Cook</p>
              <p className="text-xs font-medium text-indigo-200 group-hover:text-white">
                View profile
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
export default SideBar;

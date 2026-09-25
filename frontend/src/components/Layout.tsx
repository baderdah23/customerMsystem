import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

type Props = { searchValue: string; setSearchValue: (value: string) => void };

const Layout = (porps: Props) => {
  return (
    <div className="flex h-screen bg-[#1a1d23] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          searchValue={porps.searchValue}
          setSearchValue={porps.setSearchValue}
        />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
        {/* Dark mode toggle button */}
        <button className="fixed bottom-5 right-5 w-12 h-12 bg-[#7c3aed] rounded-full flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 text-green-400 absolute -top-0.5 -right-0.5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Layout;

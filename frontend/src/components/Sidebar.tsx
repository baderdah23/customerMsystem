import { Link, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { IoPersonAdd } from "react-icons/io5";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/dashboard", label: "Home", icon: <HiHome className="w-5 h-5" /> },
    {
      path: "/dashboard/add-customer",
      label: "Add Customers",
      icon: <IoPersonAdd className="w-5 h-5" />,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="w-[190px] min-w-[190px] bg-[#21252b] flex flex-col h-full border-r border-[#2c313a]">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
          </svg>
          <span className="text-white font-semibold text-base">Sidebar</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#2563eb] text-white"
                  : "text-gray-300 hover:bg-[#2a2e35]"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-[#2c313a] flex  gap-5 items-center">
        <div className="flex items-center gap-2">
          <div className=" flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-white font-semibold text-base">
              {user?.username}
            </span>
          </div>
          <button onClick={handleLogout}>
            <LogOut className="h-4 w-4 text-red-400" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

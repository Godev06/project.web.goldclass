import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ClipboardList,
  Home,
} from "lucide-react";

import { Logo } from "../components/icons/logo.tsx";

export type UserRole = "Admin" | "User";

// Định nghĩa cấu trúc cho một mục Menu
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Định nghĩa cấu trúc cho danh sách Menu tổng thể
interface MenuConfig {
  Admin: MenuItem[];
  User: MenuItem[];
}

// Định nghĩa các thuộc tính đầu vào (Props) của Component
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userRole?: UserRole;
}

// Danh sách Menu cố định
const MENU_ITEMS: MenuConfig = {
  Admin: [
    {
      id: "admin-dash",
      label: "Hệ thống",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "admin-users",
      label: "Quản lý người dùng",
      icon: <Users size={20} />,
    },
    {
      id: "admin-settings",
      label: "Cấu hình hệ thống",
      icon: <Settings size={20} />,
    },
  ],
  User: [
    {
      id: "user-home",
      label: "Trang chủ",
      icon: <Home size={20} />,
    },
    {
      id: "user-classes",
      label: "Lớp học của tôi",
      icon: <BookOpen size={20} />,
    },
    {
      id: "user-tasks",
      label: "Nhiệm vụ & Bài tập",
      icon: <ClipboardList size={20} />,
    },
    {
      id: "user-settings",
      label: "Cài đặt cá nhân",
      icon: <Settings size={20} />,
    },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  userRole = "User",
}) => {
  const currentMenu: MenuItem[] = MENU_ITEMS[userRole] || MENU_ITEMS.User;
  const [activeId, setActiveId] = useState<string>(currentMenu[0].id);

  return (
    <aside
      className={`
        relative h-screen bg-white border-r border-slate-200 flex flex-col 
        transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${isOpen ? "w-70" : "w-30"}
      `}
    >
      {/* 1. Header Section */}
      <div className="h-20 flex items-center px-5 shrink-0">
        <div
          className={`flex items-center gap-2 w-full transition-opacity duration-300 ${!isOpen && "justify-center"}`}
        >
          <Logo />
          <span
            className={`
              text-2xl font-black text-slate-800 tracking-tight transition-all duration-300
              ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute pointer-events-none"}
            `}
          >
            GoldClass
          </span>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            absolute -right-3 top-7 p-1.5 rounded-full border border-slate-200 bg-white text-slate-400 
            hover:text-indigo-600 hover:border-indigo-300 hover:shadow-md
            transition-all duration-300 z-10
            ${!isOpen ? "right-1/2 translate-x-1/2 top-17" : ""}
          `}
        >
          {isOpen ? (
            <ChevronRight size={14} className="rotate-180" />
          ) : (
            <Menu size={14} />
          )}
        </button>
      </div>

      {/* 2. Navigation List */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto no-scrollbar scroll-smooth">
        {currentMenu.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`
                w-full flex items-center rounded-xl transition-all duration-300 group relative
                ${isOpen ? "px-4 py-3" : "p-3 justify-center"}
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              {/* Active Indicator */}
              <div
                className={`
                  absolute left-0 w-1 bg-indigo-600 rounded-r-full transition-all duration-300
                  ${isActive ? "h-6 opacity-100" : "h-0 opacity-0"}
                `}
              />

              <div
                className={`
                  shrink-0 transition-transform duration-300 
                  ${isActive ? "scale-110" : "group-hover:scale-110"}
                `}
              >
                {item.icon}
              </div>

              <span
                className={`
                  ml-3 font-semibold text-sm transition-all duration-300 whitespace-nowrap overflow-hidden
                  ${isOpen ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 -translate-x-4 absolute"}
                `}
              >
                {item.label}
              </span>

              {isOpen && (
                <div
                  className={`
                    ml-auto transition-all duration-500 delay-75
                    ${isActive ? "opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}
                  `}
                >
                  <ChevronRight size={14} />
                </div>
              )}

              {!isOpen && (
                <div className="fixed left-20 ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. Footer */}
      <div className="p-3 border-t border-slate-100 space-y-2">
        <button
          className={`
            w-full flex items-center rounded-xl transition-all duration-300 
            text-slate-400 hover:text-red-500 hover:bg-red-50
            ${isOpen ? "px-4 py-3" : "p-3 justify-center"}
          `}
        >
          <LogOut size={20} className="shrink-0" />
          <span
            className={`
              ml-3 font-bold text-sm transition-all duration-300 whitespace-nowrap overflow-hidden
              ${isOpen ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 -translate-x-4 absolute"}
            `}
          >
            Đăng xuất
          </span>
        </button>

        {isOpen && (
          <div className="flex items-center gap-3 px-2 py-2 bg-slate-50 rounded-xl mt-2 animate-in fade-in duration-500">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0">
              JD
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-slate-800 truncate">
                John Doe
              </span>
              <span className="text-[10px] text-slate-500 truncate uppercase tracking-tighter">
                {userRole} Account
              </span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </aside>
  );
};

export default Sidebar;

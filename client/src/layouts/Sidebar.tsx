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
      id: "user-dash",
      label: "Bảng điều khiển",
      icon: <LayoutDashboard size={20} />,
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
  const [activeId, setActiveId] = useState<string>(MENU_ITEMS[userRole][0].id);
  const currentMenu: MenuItem[] = MENU_ITEMS[userRole] || MENU_ITEMS.User;

  return (
    <div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <aside
        className={`
        relative h-screen bg-white border-r border-slate-200 flex flex-col 
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isOpen ? "w-64" : "w-20"}
      `}
      >
        {/* 1. Header & Toggle Button */}
        <div className="h-20 flex items-center justify-between px-5">
          <div
            className={`flex items-center gap-3 transition-opacity duration-300 ${!isOpen && "opacity-0 invisible"}`}
          >
            <Logo size="sm" />
            <span className="text-lg font-black text-slate-800 tracking-tight whitespace-nowrap">
              GoldClass
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
            p-2 rounded-xl border border-slate-100 bg-white text-slate-400 
            hover:text-indigo-600 hover:border-indigo-100 hover:shadow-sm
            transition-all duration-300 active:scale-90
            ${!isOpen && "absolute left-1/2 -translate-x-1/2"}
          `}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* 2. Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto no-scrollbar">
          {currentMenu.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                title={!isOpen ? item.label : ""}
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
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 w-1 h-5 bg-indigo-600 rounded-r-full" />
                )}

                <span
                  className={`
                transition-transform duration-300 
                ${isActive ? "scale-110" : "group-hover:scale-110"}
              `}
                >
                  {item.icon}
                </span>

                <span
                  className={`
                ml-3 font-bold text-sm transition-all duration-300 whitespace-nowrap
                ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute invisible"}
              `}
                >
                  {item.label}
                </span>

                {isOpen && (
                  <ChevronRight
                    size={14}
                    className={`
                    ml-auto transition-all duration-300
                    ${isActive ? "opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}
                  `}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* 3. Footer / Logout */}
        <div className="p-3 border-t border-slate-100">
          <button
            className={`
          w-full flex items-center rounded-xl transition-all duration-300 
          text-slate-400 hover:text-red-500 hover:bg-red-50
          ${isOpen ? "px-4 py-3" : "p-3 justify-center"}
        `}
          >
            <LogOut
              size={20}
              className="transition-transform group-hover:translate-x-1"
            />
            <span
              className={`
            ml-3 font-bold text-sm transition-all duration-300 whitespace-nowrap
            ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute invisible"}
          `}
            >
              Đăng xuất
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

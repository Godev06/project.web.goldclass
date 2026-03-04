import React from "react";

import SearchBar from "../components/ui/SearchBarUI.tsx";
import NotificationUI from "../components/ui/NotificationButton.tsx";
import ClassActionButtonUI from "../components/ui/ClassActionButton.tsx";

const Header: React.FC = () => {
  return (
    <div className="w-screen h-25 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30 gap-4">
      <SearchBar />
      <NotificationUI />
      <ClassActionButtonUI classMemberRole="Teacher" />
    </div>
  );
};

export default Header;

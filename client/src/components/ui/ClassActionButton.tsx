import React from "react";
import { Plus } from "lucide-react";

export type classMemberRole = "Teacher" | "Student";

const ClassActionButtonUI: React.FC<{
  classMemberRole?: classMemberRole;
}> = ({ classMemberRole }) => {
  return (
    <button className="h-14 flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all active:scale-95">
      <Plus size={18} />
      {classMemberRole === "Teacher" && (
        <span className="hidden sm:inline w-15">Tạo lớp học mới</span>
      )}
      {classMemberRole === "Student" && (
        <span className="hidden sm:inline w-20">Tham gia lớp học</span>
      )}
    </button>
  );
};

export default ClassActionButtonUI;

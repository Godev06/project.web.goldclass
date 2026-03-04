import React, { useState, useRef, useEffect } from "react";
import { Bell, Trash2, Info, AlertCircle, CheckCircle2, X } from "lucide-react";

// --- Types ---
interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
}

// --- Mock Data ---
const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Cập nhật hệ thống",
    description: "Phiên bản mới 2.5 đã sẵn sàng để cài đặt.",
    time: "2 phút trước",
    type: "info",
    isRead: false,
  },
  {
    id: "2",
    title: "Thanh toán thành công",
    description: "Hóa đơn #12345 đã được thanh toán.",
    time: "1 giờ trước",
    type: "success",
    isRead: false,
  },
  {
    id: "3",
    title: "Cảnh báo bảo mật",
    description: "Phát hiện lần đăng nhập lạ từ thiết bị mới.",
    time: "3 giờ trước",
    type: "warning",
    isRead: true,
  },
  {
    id: "4",
    title: "Lỗi đồng bộ",
    description: "Không thể kết nối với máy chủ dữ liệu.",
    time: "5 giờ trước",
    type: "error",
    isRead: true,
  },
];

const NotificationUI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(
    INITIAL_NOTIFICATIONS,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case "error":
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Nút Chuông - Kích thước h-14 w-14 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200 border shadow-sm outline-none ${
          isOpen
            ? "bg-blue-100 text-blue-600 border-blue-200"
            : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
        }`}
      >
        <Bell className="w-6 h-6" />

        {unreadCount > 0 && (
          <span className="absolute top-3 right-3 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] text-white items-center justify-center font-bold">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Dropdown - Căn chỉnh absolute so với nút bấm */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Thông báo</h3>
              <p className="text-xs text-slate-500">
                Bạn có {unreadCount} chưa đọc
              </p>
            </div>
            <button
              onClick={markAllAsRead}
              className="text-xs font-semibold text-blue-600 hover:underline px-2 py-1"
            >
              Đọc tất cả
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-slate-50">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`group relative p-4 flex gap-3 transition-colors hover:bg-slate-50 cursor-pointer ${
                      !notification.isRead ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <div className="mt-1 flex-shrink-0">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4
                          className={`text-sm font-semibold truncate ${notification.isRead ? "text-slate-700" : "text-slate-900"}`}
                        >
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5 ml-2"></span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {notification.description}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-2 block">
                        {notification.time}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-slate-400 text-sm italic">
                Trống
              </div>
            )}
          </div>

          <button className="w-full py-3 bg-slate-50 text-[11px] font-bold text-slate-500 hover:text-blue-600 border-t border-slate-100 uppercase tracking-widest">
            Xem tất cả
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationUI;

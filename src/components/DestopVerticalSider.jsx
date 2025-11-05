import {
  LayoutDashboard,
  Sliders,
  AlertTriangle,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showAllLabels, setShowAllLabels] = useState(false); // Shared hover state

  const navItems = [
    { text: "Dashboard", icon: LayoutDashboard, path: "/DealerDashboard" },
    { text: "Device Management", icon: Sliders, path: "/DeviceManagementcompForDealer" },
    { text: "Alerts", icon: AlertTriangle, path: "/AlertForDealer" },
    { text: "Manage Clients", icon: Users, path: "/ManageCustomerForDealer" },
  ];

  return (
    <div className="relative">
      <div
        className="h-full w-21 bg-[#1ea47a] shadow-lg flex flex-col items-center"
        onMouseEnter={() => setShowAllLabels(true)}
        onMouseLeave={() => setShowAllLabels(false)}
      >
        <nav className="flex flex-col gap-4 mt-10">
          {navItems.map(({ text, icon, path }) => (
            <SidebarIcon
              key={text}
              onClick={() => navigate(path)}
              icon={icon}
              text={text}
              active={location.pathname === path}
              showLabel={showAllLabels} // Pass shared hover state
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

const SidebarIcon = ({ icon: Icon, text, onClick, active, showLabel }) => {
  return (
    <div
      className={`relative flex items-center justify-center p-4 rounded-md cursor-pointer transition ${
        active ? "bg-white" : "hover:bg-green-200"
      }`}
      onClick={onClick}
    >
      <Icon size={active ? 24 : 22} color={active ? "#1ea47a" : "white"} />
      {showLabel && (
        <div className="absolute left-14 bottom-[-20px] bg-green-50 text-sm px-5 py-2 rounded-tr-lg rounded-b-md shadow-lg whitespace-nowrap z-10">
          {text}
        </div>
      )}
    </div>
  );
};

export default Sidebar;

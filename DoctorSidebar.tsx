"use client";
import { MdCellTower } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaCalendarAlt,
  FaUserMd,
  FaClipboardList,
  FaCog,
  FaBoxes
} from "react-icons/fa";

const links = [
  {
    label: "Calendar",
    href: "/dashboard/doctor/calendar",
    icon: <FaCalendarAlt />,
  },
  {
    label: "Patients",
    href: "/dashboard/doctor/patients",
    icon: <FaUserMd />,
  },
  {
    label: "Inventory",
    href: "/dashboard/doctor/inventory",
    icon: <FaBoxes />,
  },
  {
    label: "Prescriptions",
    href: "/dashboard/doctor/prescriptions",
    icon: <FaClipboardList />,
  },
  {
    label: "Communication",
    href: "/dashboard/doctor/communication",
    icon: <MdCellTower/>
  },
  {
    label: "Settings",
    href: "/dashboard/doctor/settings",
    icon: <FaCog />,
  },
];

export default function DoctorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-64 bg-gradient-to-b from-blue-600 via-sky-600 to-cyan-600 shadow-2xl relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
      
      <div className="px-6 py-8 relative z-10">
        {/* Logo and Brand */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">Schedula</h2>
          </div>
          <p className="text-blue-100 text-sm font-medium">Doctor Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {links.map(({ label, href, icon }) => {
            const isActive = pathname === href;

            return (
              <Link key={href} href={href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer 
                  transition-all duration-300 group relative overflow-hidden
                  ${isActive 
                    ? "bg-white/20 backdrop-blur-sm text-white shadow-lg transform scale-105" 
                    : "text-blue-100 hover:bg-white/10 hover:text-white hover:transform hover:scale-102"}`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                  )}
                  
                  <span className={`text-lg transition-transform duration-300 ${
                    isActive ? "transform scale-110" : "group-hover:transform group-hover:scale-110"
                  }`}>
                    {icon}
                  </span>
                  <span className="font-medium">{label}</span>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full flex items-center justify-center">
              <FaUserMd className="text-white text-sm" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Dr. Smith</p>
              <p className="text-blue-100 text-xs">Cardiologist</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 space-y-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs font-medium">Today's Appointments</p>
                <p className="text-white text-lg font-bold">12</p>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="text-white text-sm" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs font-medium">Active Patients</p>
                <p className="text-white text-lg font-bold">48</p>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <FaUserMd className="text-white text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
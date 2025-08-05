"use client";

import { doctors } from "@/data/doctors";
import BottomNav from "@/components/BottomNav";

export default function HomePage() {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <p className="text-sm text-gray-500">📍Panipat,Haryana</p>
          <h1 className="text-xl font-semibold">Hello, Priyanshi 👋</h1>
        </div>

        <input
          type="text"
          placeholder="Search Doctors"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none mb-4"
        />

        <div className="space-y-4">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-4 rounded-2xl shadow-md border flex gap-4 items-start"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1 space-y-1">
                <p className="text-lg font-semibold">{doc.name}</p>
                <p className="text-sky-500 text-sm">{doc.specialization}</p>
                <span
                  className={`text-xs font-medium inline-block px-2 py-0.5 rounded-md ${
                    doc.available
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {doc.availabilityText}
                </span>
                <p className="text-xs text-gray-500">{doc.experience}</p>
                <p className="text-sm font-medium mt-1">{doc.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Nav */}
      <BottomNav />
    </div>
  );
}

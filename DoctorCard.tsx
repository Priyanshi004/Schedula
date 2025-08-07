"use client";

import Image from "next/image";
import { useState } from "react";

type Doctor = {
  id: number;
  name: string;
  specialization: string;
  available: boolean;
  availabilityText: string;
  time: string;
  experience: string;
  photo: string;
};

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const [open, setOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleBooking = () => {
    if (!patientName || !appointmentTime) return;
    setBooked(true);
  };

  const closeModal = () => {
    setBooked(false);
    setOpen(false);
    setPatientName("");
    setAppointmentTime("");
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-4 flex gap-4 mb-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <Image
            src={doctor.photo}
            alt={doctor.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.specialization}</p>
          <p className="text-xs text-gray-500">{doctor.experience}</p>
          <p
            className={`text-xs font-medium ${
              doctor.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {doctor.availabilityText}
          </p>
          <p className="text-xs text-gray-400">{doctor.time}</p>

          <button
            onClick={() => setOpen(true)}
            className="mt-2 px-4 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              onClick={closeModal}
            >
              ×
            </button>

            {booked ? (
              <div className="text-center">
                <h2 className="text-xl font-bold text-green-600 mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-sm mb-2">
                  You have successfully booked an appointment with{" "}
                  <strong>{doctor.name}</strong>.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(appointmentTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Patient:</strong> {patientName}
                </p>
                <button
                  onClick={closeModal}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-2">Book Appointment</h2>
                <p className="text-sm mb-4">
                  Book appointment with <strong>{doctor.name}</strong>
                </p>
                <input
                  type="text"
                  placeholder="Your name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md mb-3 text-sm"
                />
                <input
                  type="datetime-local"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md mb-3 text-sm"
                />
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm"
                  onClick={handleBooking}
                >
                  Confirm Booking
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

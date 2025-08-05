"use client";

import { useState } from "react";

export const BookingForm = ({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    patientName: "",
    gender: "Male",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-xl shadow"
    >
      <input
        name="patientName"
        placeholder="Patient Name"
        className="w-full border p-2 rounded-md"
        value={formData.patientName}
        onChange={handleChange}
        required
      />

      <select
        name="gender"
        className="w-full border p-2 rounded-md"
        value={formData.gender}
        onChange={handleChange}
      >
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <input
        type="date"
        name="date"
        className="w-full border p-2 rounded-md"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <input
        type="time"
        name="time"
        className="w-full border p-2 rounded-md"
        value={formData.time}
        onChange={handleChange}
        required
      />

      <textarea
        name="reason"
        placeholder="Reason for Visit"
        className="w-full border p-2 rounded-md"
        rows={3}
        value={formData.reason}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600"
      >
        Confirm Appointment
      </button>
    </form>
  );
};

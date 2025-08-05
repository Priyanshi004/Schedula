// utils/booking.ts
export const saveAppointment = (appointment: any) => {
  const existing = JSON.parse(localStorage.getItem("appointments") || "[]");
  existing.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(existing));
};

export const getAppointments = () => {
  return JSON.parse(localStorage.getItem("appointments") || "[]");
};

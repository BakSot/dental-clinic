import type { Appointment, Patient } from "../hooks/types";

const BASE_URL = "http://localhost:5161"; // your backend URL

export const getAllPatients = async (): Promise<Patient[]> => {
  const res = await fetch(`${BASE_URL}/patients`);
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
};

export const getPatient = async (id: number): Promise<Patient> => {
  const res = await fetch(`${BASE_URL}/patients/${id}`);
  if (!res.ok) throw new Error("Failed to fetch patient");
  return res.json();
};

export const createPatient = async (
  patient: Omit<Patient, "id" | "appointments">
): Promise<Patient> => {
  const res = await fetch(`${BASE_URL}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  if (!res.ok) throw new Error("Failed to create patient");
  return res.json();
};

export const createAppointment = async (
  appointment: Omit<Appointment, "id">
): Promise<Appointment> => {
  const res = await fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointment),
  });
  if (!res.ok) throw new Error("Failed to create appointment");
  return res.json();
};

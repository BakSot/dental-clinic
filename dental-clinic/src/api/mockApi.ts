import type { Appointment, Patient } from "./patients";

let patients: Patient[] = [];
let appointments: Appointment[] = [];
let patientIdCounter = 1;
let appointmentIdCounter = 1;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const mockApi = {
  getAllPatients: async (): Promise<Patient[]> => {
    await delay(300);
    return patients.map((p) => ({
      ...p,
      appointments: appointments.filter((a) => a.patientId === p.id),
    }));
  },

  getPatient: async (id: number): Promise<Patient> => {
    await delay(300);
    const patient = patients.find((p) => p.id === id);
    if (!patient) throw new Error("Patient not found");
    return {
      ...patient,
      appointments: appointments.filter((a) => a.patientId === id),
    };
  },

  createPatient: async (
    patientData: Omit<Patient, "id" | "appointments">
  ): Promise<Patient> => {
    await delay(300);
    const newPatient: Patient = {
      id: patientIdCounter++,
      ...patientData,
      appointments: [],
    };
    patients.push(newPatient);
    return newPatient;
  },

  createAppointment: async (
    appointmentData: Omit<Appointment, "id">
  ): Promise<Appointment> => {
    await delay(300);
    const newAppointment: Appointment = {
      id: appointmentIdCounter++,
      ...appointmentData,
    };
    appointments.push(newAppointment);
    return newAppointment;
  },
};

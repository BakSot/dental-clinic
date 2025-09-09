export type DentistAvailability = { dateTime: string; duration: number };

export type AppointmentOptions = {
  dentists: string[];
  treatments: { name: string; duration: number }[]; // 👈 camelCase
  appointments: Record<string, DentistAvailability[]>;
};

export type NewAppointment = Omit<Appointment, "id" | "patientId">;

export type Appointment = {
  id: number;
  patientId: number;
  dateTime: string | null;
  dentist: string;
  treatment: string;
  duration: number;
};

export type Patient = {
  id: number;
  fullName: string;
  address: string;
  photoUrl?: string;
  appointments: Appointment[];
};

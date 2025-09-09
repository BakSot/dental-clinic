import type { Dayjs } from "dayjs";

export type AppointmentFormProps = {
  open: boolean;
  onClose: () => void;
  patientId: number;
  onSuccess?: () => void;
};

export type FormValues = {
  dateTime: Dayjs | null;
  dentist: string;
  treatment: string;
  duration: number;
};

export type PatientFormData = {
  fullName: string;
  address: string;
  photoUrl?: string;
};

export type PatientProps = {
  open: boolean;
  onClose: () => void;
};

export type AppointmentProps = {
  appointments: {
    id: number;
    dateTime: string | null;
    duration?: number;
    treatment: string;
    dentist: string;
  }[];
};

export type PatientFormValues = {
  fullName: string;
  address: string;
  photoUrl?: string;
};

export type AppointmentFormValues = {
  dateTime: Dayjs | null;
  dentist: string;
  treatment: string;
};

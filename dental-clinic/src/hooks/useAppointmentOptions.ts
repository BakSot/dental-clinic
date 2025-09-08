import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type DentistAvailability = { dateTime: string; duration: number };

export type AppointmentOptions = {
  dentists: string[];
  treatments: { name: string; duration: number }[];   // 👈 camelCase
  appointments: Record<string, DentistAvailability[]>;
};

export const useAppointmentOptions = (enabled: boolean) => {
  return useQuery<AppointmentOptions>({
    queryKey: ["appointmentOptions"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5161/appointments/options");
      return data as AppointmentOptions; // 👈 enforce correct typing
    },
    enabled,
  });
};
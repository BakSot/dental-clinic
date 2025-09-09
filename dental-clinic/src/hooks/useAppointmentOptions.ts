import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AppointmentOptions } from "./types";

export const useAppointmentOptions = (enabled: boolean) => {
  return useQuery<AppointmentOptions>({
    queryKey: ["appointmentOptions"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:5161/appointments/options"
      );
      return data as AppointmentOptions; // 👈 enforce correct typing
    },
    enabled,
  });
};

import { useMemo } from "react";
import { Dayjs } from "dayjs";
import type { DentistAvailability } from "../hooks/types";

export const useAvailableDentists = (
  dentists: string[] = [],
  appointments: Record<string, DentistAvailability[]> = {},
  selectedDateTime: Dayjs | null
) => {
  return useMemo(() => {
    if (!selectedDateTime) return dentists;

    return dentists.filter((d) => {
      const booked = appointments[d] ?? [];
      if (!booked.length) return true;

      const selected = selectedDateTime.toDate().getTime();
      return !booked.some((a) => {
        const start = new Date(a.dateTime).getTime();
        const end = start + a.duration * 60 * 1000;
        return selected >= start && selected < end;
      });
    });
  }, [dentists, appointments, selectedDateTime]);
};
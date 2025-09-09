import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../api/patients";
import type { NewAppointment } from "./types";


export const useCreateAppointment = (patientId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewAppointment) =>
      createAppointment({ ...data, patientId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient", patientId] });
    },
  });
};

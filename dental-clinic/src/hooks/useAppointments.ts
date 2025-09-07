import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAppointment, type Appointment } from '../api/patients';

type NewAppointment = Omit<Appointment, 'id' | 'patientId'>;

export const useCreateAppointment = (patientId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewAppointment) => createAppointment({ ...data, patientId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', patientId] });
    },
  });
};

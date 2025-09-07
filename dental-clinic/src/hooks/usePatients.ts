import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createPatient, getAllPatients, getPatient, type Patient } from '../api/patients';

export const usePatients = () =>
  useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: getAllPatients,
  });

export const usePatient = (id: number) =>
  useQuery<Patient>({
    queryKey: ['patient', id],
    queryFn: () => getPatient(id),
  });

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPatient,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patients'] }),
  });
};

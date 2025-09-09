import { useParams } from "react-router";
import { usePatient } from "../hooks/usePatients";

export const usePatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = Number(id);

  const { data: patient, isLoading, isError, error } = usePatient(patientId);

  return { patientId, patient, isLoading, isError, error };
};

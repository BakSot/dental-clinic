import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useCreatePatient } from "../../hooks/usePatients";
import { useNavigate } from "react-router-dom";
import { PatientFormButton } from "../styled";
import type { PatientFormData, PatientProps } from "../types";
import { useState } from "react";
import FullNameField from "../fields/FullNameField";
import AddressField from "../fields/AddressField";
import PhotoUploadField from "../fields/PhotoUploadField";

export default function PatientForm({ open, onClose }: PatientProps) {
  const { control, handleSubmit, reset } = useForm<PatientFormData>();
  const createPatientMutation = useCreatePatient();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (data: PatientFormData) => {
    try {
      const patient = await createPatientMutation.mutateAsync({
        ...data,
        photoUrl: file ? URL.createObjectURL(file) : "",
      });
      reset();
      onClose();
      navigate(`/patients/${patient.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Patient</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} id="patient-form">
          <FullNameField control={control} />
          <AddressField control={control} />
          <PhotoUploadField onFileChange={setFile} />
        </form>
      </DialogContent>
      <DialogActions>
        <PatientFormButton variant="contained" onClick={onClose}>Cancel</PatientFormButton>
        <PatientFormButton type="submit" form="patient-form" variant="contained">Create</PatientFormButton>
      </DialogActions>
    </Dialog>
  );
}

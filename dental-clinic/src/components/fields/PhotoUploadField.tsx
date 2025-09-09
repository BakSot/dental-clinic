import { useState } from "react";
import { PatientFormButton } from "../styled";

type Props = {
  onFileChange: (file: File | null) => void;
};

const PhotoUploadField = ({ onFileChange }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onFileChange(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <>
      <PatientFormButton variant="contained" component="label">
        Upload Photo
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </PatientFormButton>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: 100, marginTop: 10, display: "block" }}
        />
      )}
    </>
  );
};

export default PhotoUploadField;

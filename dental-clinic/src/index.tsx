import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UIProvider } from "./context/UIContext.tsx";

const queryClient = new QueryClient();
import { mockApi } from "./api/mockApi";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; 

// mockApi.createPatient({ fullName: "Alice Smith", address: "123 Main St" });
// mockApi.createPatient({ fullName: "Bob Johnson", address: "456 Elm St" });
// mockApi.createAppointment({
//   patientId: 1,
//   dateTime: "2025-09-10T10:00",
//   dentist: "Dr. John",
//   treatment: "Cleaning",
//   duration: 30
// });
// mockApi.createAppointment({
//   patientId: 2,
//   dateTime: "2025-09-12T14:00",
//   dentist: "Dr. Jane",
//   treatment: "Filling",
//   duration:30
// });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UIProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </UIProvider>
    </QueryClientProvider>
  </StrictMode>
);

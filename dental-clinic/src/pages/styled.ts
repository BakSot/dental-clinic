import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Fab,
  LinearProgress,
  styled,
  type CardMediaProps,
} from "@mui/material";

export const PatientsPageBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1300,
  backgroundColor: "rgba(255,255,255,0.7)",
});

export const PatientPageLinearProgress = styled(LinearProgress)({
  width: "50%",
  backgroundColor: "#006338",
});

export const CreateNewPatientButton = styled(Button)({
  mb: 2,
  backgroundColor: "#006338",
});

export const PatientPageContainer = styled(Container)({
  textAlign: "center",
  mt: 6,
});

export const PatientAvatar = styled(Avatar)({
  mr: 2,
  width: 40,
  height: 40,
});

export const PatientsDetailsCard = styled(Card)<CardMediaProps>({
  display: "flex",
  mb: 4,
});

export const PatientImage = styled(CardMedia)<CardMediaProps>(({ theme }) => ({
  width: 150,
  borderRadius: theme.shape.borderRadius,
}));

export const PatientDetailsPageFab = styled(Fab)({
  position: "fixed",
  bottom: 24,
  right: 24,
  backgroundColor: "#006338",
  color: "#848484",
});

export const HomePageBoxWrappper = styled(Box)({
  width: "100%",
  height: "60vh",
  backgroundImage:
    "url('https://www.halinvestments.nl/wp-content/uploads/2019/07/infomedics-header.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
});

export const HomePageContainer = styled(Container)({
  textAlign: "center",
  color: "white",
});

export const HomePageBox = styled(Box)({
  mt: 4,
});

export const HomePageButton = styled(Button)({
  mr: 2,
  backgroundColor: "#006338",
});

export const StyledCircularProgress = styled(CircularProgress)({
  color: "#006338",
});

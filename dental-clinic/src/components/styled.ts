import { AppBar, Box, Button, styled, type ButtonProps } from "@mui/material";

export const PatientFormButton = styled(Button)<ButtonProps>({
  mt: 2,
  backgroundColor: "#006338",
});

export const AppNavBar = styled(AppBar)({
  color: "#848484",
  backgroundColor: "white",
});

export const NavBarBox = styled(Box)({
  flexGrow: 1,
});
export const HeaderBox = styled(Box)({
  bgcolor: "primary.main",
  color: "white",
  py: 4,
  textAlign: "center",
});

export const FooterBox = styled(Box)({
  bgcolor: "grey.800",
  color: "white",
  py: 2,
  textAlign: "center",
  mt: "auto",
});

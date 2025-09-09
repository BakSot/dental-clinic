import { Typography } from "@mui/material";
import { HeaderBox } from "../styled";

const Header = () => {
  return (
    <HeaderBox>
      <Typography variant="h3">Dental Clinic</Typography>
      <Typography variant="subtitle1">Your smile, our priority</Typography>
    </HeaderBox>
  );
};

export default Header;

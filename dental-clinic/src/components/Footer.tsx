import { Typography } from "@mui/material";
import { FooterBox } from "./styled";

const Footer = () => {
  return (
    <FooterBox>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Dental Clinic. All rights reserved.
      </Typography>
    </FooterBox>
  );
};

export default Footer;

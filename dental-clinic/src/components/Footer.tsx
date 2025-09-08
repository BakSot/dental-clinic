import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "grey.800",
        color: "white",
        py: 2,
        textAlign: "center",
        mt: "auto", // pushes footer to bottom
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Dental Clinic. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

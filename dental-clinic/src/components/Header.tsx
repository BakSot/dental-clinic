import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="h3">Dental Clinic</Typography>
      <Typography variant="subtitle1">Your smile, our priority</Typography>
    </Box>
  );
};

export default Header;

import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/patients">
            Patients
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

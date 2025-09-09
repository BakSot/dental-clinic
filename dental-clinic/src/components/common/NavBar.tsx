import { Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppNavBar, NavBarBox } from "../styled";

const NavBar = () => {
  return (
    <AppNavBar position="static">
      <Toolbar>
        <NavBarBox>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/patients">
            Patients
          </Button>
        </NavBarBox>
      </Toolbar>
    </AppNavBar>
  );
};

export default NavBar;

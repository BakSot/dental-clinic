import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  HomePageBox,
  HomePageBoxWrappper,
  HomePageButton,
  HomePageContainer,
} from "./styled";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <HomePageBoxWrappper>
        <HomePageContainer>
          <Typography variant="h3" gutterBottom>
            Welcome to the Dental Clinic
          </Typography>
          <Typography variant="h6" gutterBottom>
            Manage patients and appointments with ease
          </Typography>
          <HomePageBox>
            <HomePageButton
              variant="contained"
              onClick={() => navigate("/patients")}
            >
              View Patients
            </HomePageButton>
          </HomePageBox>
        </HomePageContainer>
      </HomePageBoxWrappper>
    </Box>
  );
};

export default HomePage;

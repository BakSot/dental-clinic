import { Container, Typography } from "@mui/material";
import { StyledCircularProgress } from "../../pages/styled";

export const PageLoader = () => (
  <Container>
    <StyledCircularProgress />
  </Container>
);

export const PageError = ({ message }: { message: string }) => (
  <Container>
    <Typography color="error">Error: {message}</Typography>
  </Container>
);

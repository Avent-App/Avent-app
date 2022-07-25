import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputAdornment from "@mui/material/InputAdornment";
import { Container } from "@mui/system";

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    // <Container maxWidth="xl">
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://tardigital.com.br/wp-content/uploads/2022/05/persons.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "250px",
              marginLeft: "100px",
              width: "450px",
              height: "338px",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ fontFamily: "Inter", fontWeight: "700", fontSize: "32px", marginBottom: "2rem" }}>
              Login to your account
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <label style={{ fontFamily: "Inter", color: "#828282", fontWeight: 600 }}>Email</label>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                placeholder="mail@abc.com"
                name="email"
                autoComplete="email"
                autoFocus
                style={{ marginTop: "8px" }}
                // startAdornment={
                //   <InputAdornment position="start">
                //     <MailOutlineIcon />
                //   </InputAdornment>
                // }
              />
              <label style={{ fontFamily: "Inter", color: "#828282", fontWeight: 600 }}>Password</label>
              <TextField
                margin="normal"
                fullWidth
                name="password"
                placeholder="**************"
                type="password"
                id="password"
                autoComplete="current-password"
                style={{ marginTop: "8px" }}
              />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" sx={{ fontFamily: "Inter", color: "#828282" }} />
              <Link href="#" variant="body2" sx={{ color: "#D90429", textDecoration: "none", marginLeft: "10rem", fontWeight: 600, fontFamily: "Inter" }}>
                Forgot password?
              </Link>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  padding: "13px 10px 12px",
                  fontFamily: "Inter",
                  fontWeight: "800",
                  fontStyle: "normal",
                  fontSize: "16px",
                  background: "#D90429",
                  borderRadius: "6px",
                  marginTop: "32px",
                  textTransform: "none",
                }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item sx={{ marginTop: "50px", marginLeft: "5.7rem" }}>
                  <Link href="/register" variant="body2" sx={{ textDecoration: "none" }}>
                    <span style={{ color: "#828282", fontFamily: "Inter", fontSize: "16px" }}>Not registered yet?</span>{" "}
                    <span style={{ color: "#D90429", fontFamily: "Inter", fontWeight: 600, fontSize: "16px" }}>Create an account</span>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    // </Container>
  );
}

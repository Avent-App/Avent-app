import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginbanner from "../assets/login.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors((e) => ({ ...e, form: null }));
    console.log(event.currentTarget);
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    const signinInfo = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        "http://localhost:3001/auth/login",
        signinInfo
      );
      if (res?.data) {
        //   setUser(res.data.user);
        //   setIsLoggedIn(true);
        //   apiClient.setToken(res.data.token);
        //   localStorage.setItem("token", res.data.token);
        navigate("/feed");
      } else {
        console.log("--->", res.data);
        setErrors((e) => ({
          ...e,
          signinInfo: "Invalid username/password combination",
        }));
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
    }
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Navbar />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginbanner})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "120%",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "8rem",
              width: "450px",
              height: "430px",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "32px",
                marginBottom: "2rem",
              }}
            >
              Login to your account
              {errors.form && (
                <span
                  style={{
                    color: "red",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                  }}
                >
                  {errors.form}
                </span>
              )}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <label
                style={{
                  fontFamily: "Inter",
                  color: "#828282",
                  fontWeight: 600,
                }}
              >
                Email
              </label>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                placeholder="mail@abc.com"
                name="email"
                autoComplete="email"
                autoFocus
                style={{ marginTop: "8px" }}
                helperText={errors.email}
                error={errors.email != null}
                onChange={handleOnInputChange}
              />
              <label
                style={{
                  fontFamily: "Inter",
                  color: "#828282",
                  fontWeight: 600,
                }}
              >
                Password
              </label>
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

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{ fontFamily: "Inter", color: "#828282" }}
              />
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: "#D90429",
                  textDecoration: "none",
                  marginLeft: "10rem",
                  fontWeight: 600,
                  fontFamily: "Inter",
                }}
              >
                Forgot password?
              </Link>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{
                  padding: "13px 10px 12px",
                  fontFamily: "Inter",
                  fontWeight: "800",
                  fontStyle: "normal",
                  fontSize: "16px",
                  background: "#EF233C",
                  borderRadius: "6px",
                  marginTop: "32px",
                  textTransform: "none",
                }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item sx={{ marginTop: "50px", marginLeft: "5.7rem" }}>
                  <Link
                    href="/register"
                    variant="body2"
                    sx={{ textDecoration: "none" }}
                  >
                    <span
                      style={{
                        color: "#828282",
                        fontFamily: "Inter",
                        fontSize: "16px",
                      }}
                    >
                      Not registered yet?
                    </span>{" "}
                    <span
                      style={{
                        color: "#D90429",
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: "16px",
                      }}
                    >
                      Create an account
                    </span>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

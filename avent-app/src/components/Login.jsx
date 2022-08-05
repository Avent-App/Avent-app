import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container, FormControlLabel, Checkbox } from "@mui/material";
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.jpg";
import apiClient from "../services/apiClient";

/**
 *
 * @param {*} param0 props drilled down from app.js
 * @returns a login form set with errors in case user has entered invalid credentials
 */
export default function Login({ user, setUser, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  /**
   * t
   * @param {*} event targets the change inputted by user in textfield to check email validation using regex
   */
  const handleOnInputChange = (event) => {
    //** Regex for validating emails */
    if (event.target.name === "email") {
      if (!validEmail.test(event.target.value)) {
        setErrors((e) => ({ ...e, email: "Your email is invalid" }));
        // setEmailErr(true);
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  /**
   * this function is responsible for submitting the login data and checking it with the database. errors are set in case user has entered invalid credentials
   * @param {*} event to get user's inputs from email and passowd textfields
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors((e) => ({ ...e, form: null }));
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    const signinInfo = {
      email: email,
      password: password,
    };

    try {
      const res = await apiClient.loginUser(signinInfo);
      console.log(res.data);
      if (res?.data?.user) {
        setUser(res.data.user);
        apiClient.setToken(res.data.token);
        setIsLoggedIn(true);
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
            backgroundImage: `url(${login})`,
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                  <Link href="/register" variant="body2" sx={{ textDecoration: "none" }}>
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

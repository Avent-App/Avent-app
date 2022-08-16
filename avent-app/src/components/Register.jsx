import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Container, Alert, Zoom } from "@mui/material";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.jpg";
import { validEmail } from "../Regex";
import apiClient from "../services/apiClient";
import styled from "@emotion/styled";

import { OutlinedInput, IconButton, FormHelperText } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Stack } from "@mui/system";

/**@param {*} param0 props drilled down from app.js  @returns registration form */

export default function Register({ setUser, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [account, setAccount] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [form, setForm] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    showPassword: false,
    confirmPassword: "",
  });

  /**@param {*} event to target the user input value and set errors for password, confirm password, and email textFields*/

  const handleOnInputChange = (event) => {
    //** Regex for validating emails */
    if (event.target.name === "email") {
      if (!validEmail.test(event.target.value)) {
        setErrors((e) => ({ ...e, email: "Your email is invalid" }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  /**@param {*} event to target the event value by user @returns an alert if user has not inputted the whole form*/

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors((e) => ({ ...e, form: null }));
    const data = new FormData(event.currentTarget);

    //Printing out the data retreived from the signup sheet
    const email = data.get("email");
    const password = form.password;
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const company = data.get("company");
    const signupInfo = {
      email: email,
      account_type: account,
      password: password,
      first_name: firstName,
      last_name: lastName,
      location: location,
      company: company,
    };

    console.log("SIGNup--------->", signupInfo);

    /** checks user has filled out whole form, if not returns an alert*/
    if (
      signupInfo.first_name === "" ||
      signupInfo.last_name === "" ||
      signupInfo.password === "" ||
      signupInfo.email === "" ||
      signupInfo.location === "" ||
      signupInfo.company === ""
    ) {
      return setErrorAlert(true)(
        <Zoom
          in={errorAlert}
          timeout={{ enter: 500, exit: 500 }}
          addEndListener={() => {
            setTimeout(() => {
              setErrorAlert(false);
            }, 4000);
          }}
          sx={{ my: 1 }}
        >
          <Alert severity="error">Please fill out the entire form</Alert>
        </Zoom>
      );
    }
    try {
      const res = await apiClient.signupUser(signupInfo);
      if (res?.data?.user) {
        setSuccessAlert(true);
        setUser(res.data.user);
        setIsLoggedIn(true);
        apiClient.setToken(res.data.token);
        setTimeout(() => navigate("/feed"), 1700);
      } else {
        setErrors((e) => ({
          ...e,
          form: "Something went wrong with registration",
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
          sm={7}
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
              marginLeft: "8rem",
              width: "450px",
              height: "940px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: "32px",
                marginBottom: "1.5rem",
              }}
            >
              Create a new account
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

            {/* {errorAlert ? (
              <Zoom
                in={errorAlert}
                timeout={{ enter: 500, exit: 500 }}
                addEndListener={() => {
                  setTimeout(() => {
                    setErrorAlert(false);
                  }, 4000);
                }}
                sx={{ my: 1 }}
              >
                <Alert severity="error">Please fill out the entire form</Alert>
              </Zoom>
            ) : null} */}
            {successAlert ? (
              <Zoom
                in={successAlert}
                timeout={{ enter: 500, exit: 500 }}
                addEndListener={() => {
                  setTimeout(() => {
                    setSuccessAlert(false);
                  }, 4000);
                }}
                sx={{ my: 1 }}
              >
                <Alert severity="success">You have successfully created an account!</Alert>
              </Zoom>
            ) : (
              errorAlert && (
                <Zoom
                  in={errorAlert}
                  timeout={{ enter: 500, exit: 500 }}
                  addEndListener={() => {
                    setTimeout(() => {
                      setErrorAlert(false);
                    }, 4000);
                  }}
                  sx={{ my: 1 }}
                >
                  <Alert severity="error">Please fill out the entire form</Alert>
                </Zoom>
              )
            )}

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <label
                  style={{
                    fontFamily: "Inter",
                    color: "#828282",
                    fontWeight: 600,
                  }}
                >
                  First Name
                </label>
                <label
                  style={{
                    fontFamily: "Inter",
                    color: "#828282",
                    fontWeight: 600,
                    marginRight: "8.3rem",
                  }}
                >
                  Last Name
                </label>
              </Box>
              <Box className="namesInput" sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="firstName"
                  placeholder="Jane"
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  style={{ marginTop: "8px" }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="lastName"
                  placeholder="Doe"
                  name="lastName"
                  autoComplete="lastName"
                  autoFocus
                  style={{ marginTop: "8px" }}
                />
                {/* <IconButton color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton> */}
              </Box>
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

              {/* component for passwords*/}
              <PWGenerate form={form} setForm={setForm} setErrors={setErrors} errors={errors} handleSubmit={handleSubmit} />

              <label
                style={{
                  fontFamily: "Inter",
                  color: "#828282",
                  fontWeight: 600,
                }}
              >
                Company
              </label>
              <TextField
                margin="normal"
                fullWidth
                id="company"
                placeholder="Company Name"
                name="company"
                autoComplete="company"
                autoFocus
                style={{ marginTop: "8px" }}
                onChange={handleOnInputChange}
              />

              <ControlledOpenSelect account={account} location={location} setLocation={setLocation} setAccount={setAccount} />

              <label
                style={{
                  fontFamily: "Inter",
                  color: "#828282",
                  fontWeight: 600,
                }}
              >
                Upload Image
              </label>

              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>

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
                  background: "#D90429",
                  borderRadius: "6px",
                  marginTop: "1rem",
                  textTransform: "none",
                }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item sx={{ marginTop: "1rem", marginLeft: "7.5rem" }}>
                  <Link href="/login" variant="body2" sx={{ textDecoration: "none" }}>
                    <span
                      style={{
                        color: "#828282",
                        fontFamily: "Inter",
                        fontSize: "16px",
                      }}
                    >
                      Already have an account?
                    </span>{" "}
                    <span
                      style={{
                        color: "#D90429",
                        fontFamily: "Inter",
                        fontWeight: 700,
                        fontSize: "16px",
                      }}
                    >
                      Log In
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

/**
 *@param {*} param0 props passed from register component @returns dropdown textfields for "location" and "type of account" textfield*/

function ControlledOpenSelect({ location, account, setLocation, setAccount }) {
  const [accountOpen, setAccountOpen] = React.useState(false);
  const [locationOpen, setLocationOpen] = React.useState(false);

  const handleAccountChange = (event) => {
    setAccount(event.target.value);
  };

  const handleAccountClose = () => {
    setAccountOpen(false);
  };

  const handleAccountOpen = () => {
    setAccountOpen(true);
  };

  const handleLocChange = (event) => {
    setLocation(event.target.value);
  };

  const handleLocClose = () => {
    setLocationOpen(false);
  };

  const handleLocOpen = () => {
    setLocationOpen(true);
  };

  return (
    <div>
      <Typography
        sx={{
          fontFamily: "Inter",
          color: "#828282",
          fontWeight: 600,
          textTransform: "none",
          fontSize: "16px",
        }}
        onClick={handleAccountOpen}
      >
        Type of account
      </Typography>
      <FormControl fullWidth placeholder="type of account">
        <Select
          placeholder="type of account"
          labelId="demo-controlled-open-select-label"
          id="accountType"
          open={accountOpen}
          onClose={handleAccountClose}
          onOpen={handleAccountOpen}
          value={account}
          onChange={handleAccountChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Intern"}>Intern</MenuItem>
          <MenuItem value={"Business"}>Business</MenuItem>
        </Select>
      </FormControl>
      <Typography
        sx={{
          fontFamily: "Inter",
          color: "#828282",
          fontWeight: 600,
          textTransform: "none",
          fontSize: "16px",
        }}
        onClick={handleLocOpen}
      >
        Location
      </Typography>
      <FormControl fullWidth placeholder="type of account">
        <Select
          placeholder="type of account"
          labelId="demo-controlled-open-select-label"
          id="location"
          open={locationOpen}
          onClose={handleLocClose}
          onOpen={handleLocOpen}
          value={location}
          onChange={handleLocChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"San Francisco, CA"}>San Francisco, CA</MenuItem>
          <MenuItem value={"New York, NY"}>New York, NY</MenuItem>
          <MenuItem value={"Austin, TX"}>Austin, TX</MenuItem>
          <MenuItem value={"Seattle, WA"}>Seattle, WA</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

/** @param {*} param0 state vars to set passwords input values  @returns password and confirm password textfields*/

function PWGenerate({ form, setForm, handleSubmit }) {
  const [errorspw, setErrorspw] = React.useState({});
  const [state, setState] = React.useState({
    passwordLength: false,
    containsNumbers: false,
    isUpperCase: false,
    containsSymbols: false,
    showPassword: false,
    confirmPassword: "",
  });

  const handleClickShowPassword = () => {
    setForm({
      ...form,
      showPassword: !form.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // handle password on change
  const handleChange = (input) => (e) => {
    let targetValue = e.target.value.replace(/\s/g, "");
    setState({
      [input]: targetValue,
      passwordLength: targetValue.length > 7 ? true : false,
      containsNumbers: targetValue.match(/\d+/g) ? true : false,
      isUpperCase: targetValue.match(/[A-Z]/) ? true : false,
      containsSymbols: targetValue.match(/[^A-Z a-z0-9]/) ? true : false,
    });
    if (e.target.name === "password") {
      if (form.confirmPassword && form.confirmPassword !== e.target.value) {
        setErrorspw((e) => ({ ...e, confirmPassword: "Passwords do not match" }));
      } else {
        setErrorspw((e) => ({ ...e, confirmPassword: null }));
      }
    }
    if (e.target.name === "confirmPassword") {
      if (form.password && form.password !== e.target.value) {
        setErrorspw((e) => ({ ...e, confirmPassword: "Passwords do not match" }));
      } else {
        setErrorspw((e) => ({ ...e, confirmPassword: null }));
      }
    }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  let { password, passwordLength, containsNumbers, isUpperCase, containsSymbols, showPassword, confirmPassword } = state;

  return (
    <div className="content">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <OutlinedInput
          sx={{ width: "28.5rem", ml: -0.4 }}
          name="password"
          placeholder="********"
          id="password"
          autoComplete="current-password"
          value={form.password}
          variant="outlined"
          fullWidth
          type={form.showPassword ? "text" : "password"}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                {form.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          error={errorspw.password != null}
        />
        {!!errorspw.password && (
          <FormHelperText error id="errorspw-error">
            {errorspw.password}
          </FormHelperText>
        )}

        {password ? (
          <Box style={{ marginBottom: ".5rem" }}>
            <div>{passwordLength ? <GreenDiv>Contains 8 characters</GreenDiv> : <RedDiv>Contains 8 characters</RedDiv>}</div>

            <div>{containsNumbers ? <GreenDiv>Contains numbers</GreenDiv> : <RedDiv>Contains numbers</RedDiv>}</div>

            <div>{isUpperCase ? <GreenDiv>Contains UpperCase</GreenDiv> : <RedDiv>Contains UpperCase</RedDiv>}</div>

            <div>{containsSymbols ? <GreenDiv>Contains Symbols</GreenDiv> : <RedDiv>Contains Symbols</RedDiv>}</div>
          </Box>
        ) : null}

        <label
          style={{
            fontFamily: "Inter",
            color: "#828282",
            fontWeight: 600,
            marginBottom: "10rem",
          }}
        >
          Confirm Password
        </label>

        <TextField
          margin="normal"
          fullWidth
          name="confirmPassword"
          placeholder="********"
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
          style={{ marginTop: "8px" }}
          value={confirmPassword}
          helperText={errorspw.confirmPassword}
          error={errorspw.confirmPassword != null}
          onChange={handleChange("confirmPassword")}
        />
      </Box>
    </div>
  );
}

//emotions styled components for settings errors on password criteria
const GreenDiv = styled.div`
  color: green;
`;

const RedDiv = styled.div`
  color: #d90429;
`;

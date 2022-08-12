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
import { validEmail, validPassword } from "../Regex";
import apiClient from "../services/apiClient";

import PWGenerate from "./TESTPW/PWGenerate";
import styled from "@emotion/styled";

import { OutlinedInput, IconButton, FormHelperText } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/**
 *
 * @param {*} param0 props drilled down from app.js
 * @returns registration form
 */
export default function Register({ setUser, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [account, setAccount] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [pwErrors, setPwErrors] = React.useState({ value: "", error: "" });
  const [form, setForm] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    showPassword: false,
    confirmPassword: "",
    passwordLength: false,
    containsNumbers: false,
    isUpperCase: false,
    containsSymbols: false,
  });

  const handleOnInputPW = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
    setPwErrors({
      value: event.target.value,
      error: event.target.value ? <PWGenerate /> : null,
    });
    let targetValue = event.target.value.replace(/\s/g, "");
    setForm({
      [prop]: targetValue,
      //check for chars numbers > 7
      passwordLength: targetValue.length > 7 ? true : false,
      //check for numbers
      containsNumbers: targetValue.match(/\d+/g) ? true : false,
      // check for upper case
      isUpperCase: targetValue.match(/[A-Z]/) ? true : false,
      // check for symbols
      containsSymbols: targetValue.match(/[^A-Z a-z0-9]/) ? true : false,
    });
  };

  const handleClickShowPassword = () => {
    setForm({
      ...form,
      showPassword: !form.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /**
   *
   * @param {*} event to target the user input value and set errors for password, confirm password, and email textFields
   */
  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.confirmPassword && form.confirmPassword !== event.target.value) {
        setErrors((e) => ({ ...e, confirmPassword: "Passwords do not match" }));
      } else {
        setErrors((e) => ({ ...e, confirmPassword: null }));
      }
    }
    if (event.target.name === "confirmPassword") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({ ...e, confirmPassword: "Passwords do not match" }));
      } else {
        setErrors((e) => ({ ...e, confirmPassword: null }));
      }
    }

    //** Regex for validating emails */
    if (event.target.name === "email") {
      if (!validEmail.test(event.target.value)) {
        setErrors((e) => ({ ...e, email: "Your email is invalid" }));
        // } else if (signupInfo.email === "") {
        //   setErrors((e) => ({ ...e, email: "Please enter an email" }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    //** Regex for validating passwords */
    if (event.target.name === "password") {
      if (!validPassword.test(event.target.value)) {
        setErrors((e) => ({
          ...e,
          password: (
            <ul>
              <l>Must Contain:</l>
              <li>8 characters</li>
              <li>An Upper Case Letter</li>
              <li>A Special Character (!@#$&*)</li>
              <li>2 numerals (0-9)</li>
            </ul>
          ),
        }));
      } else {
        setErrors((e) => ({ ...e, password: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  /**
   *
   * @param {*} event to target the event value by user
   * @returns an alert if user has not inputted the whole form
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors((e) => ({ ...e, form: null }));
    setErrorAlert(true);
    const data = new FormData(event.currentTarget);
    //Printing out the data retreived from the signup sheet
    const email = data.get("email");
    const password = data.get("password");
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

    /**
     * checks user has filled out whole form, if not returns an alert
     */
    if (
      signupInfo.first_name === "" ||
      signupInfo.last_name === "" ||
      signupInfo.password === "" ||
      signupInfo.email === "" ||
      // signupInfo.confirmPassword === "" ||
      signupInfo.location === "" ||
      // signupInfo.account_type === "" ||
      signupInfo.company === ""
    ) {
      return (
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
        setUser(res.data.user);
        setIsLoggedIn(true);
        apiClient.setToken(res.data.token);
        navigate("/feed");
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
  let { password, passwordLength, containsNumbers, isUpperCase, containsSymbols } = form;
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
            {errorAlert ? (
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
            ) : null}

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

              {/* ==================================================== */}

              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <label
                  style={{
                    fontFamily: "Inter",
                    color: "#828282",
                    fontWeight: 600,
                  }}
                >
                  Password
                </label>
                <OutlinedInput
                  sx={{ width: "28.5rem", ml: -0.9 }}
                  name="password"
                  placeholder="********"
                  id="password"
                  autoComplete="current-password"
                  style={{ marginTop: "8px" }}
                  variant="outlined"
                  fullWidth
                  type={form.showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleOnInputPW("password")}
                  helpertext={errors.password}
                  // error={errors.password != null}

                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {form.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={!!pwErrors.error}
                />
                {!!pwErrors.error && (
                  <FormHelperText error id="pwErrors-error">
                    {pwErrors.error}
                  </FormHelperText>
                )}
              </FormControl>

              {/* ==================================================== */}
              <br></br>
              <label
                style={{
                  fontFamily: "Inter",
                  color: "#828282",
                  fontWeight: 600,
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
                value={form.confirmPassword}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword != null}
                onChange={handleOnInputChange}
              />
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
 *
 * @param {*} param0 props passed from register component
 * @returns dropdown textfields for "location" and "type of account" textields
 */
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

//emotions styled components for settings errors on password criteria
const GreenDiv = styled.div`
  color: green;
`;

const RedDiv = styled.div`
  color: red;
`;

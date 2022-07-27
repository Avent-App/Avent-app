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
import { Container } from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";
import login from "../assets/login.jpg";

export default function Register() {
  const [account, setAccount] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [form, setForm] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    account_type: "",
    location: "",
  });

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
    if (
      form.first_name === "" ||
      form.last_name === "" ||
      form.email === "" ||
      form.password === "" ||
      form.passwordConfirm ||
      form.account_type === "" ||
      form.location === ""
    ) {
      return alert("Please fill out the entire form.");
    }
    const data = new FormData(event.currentTarget);
    //Printing out the data retreived from the signup sheet
    const email = data.get("email");
    const password = data.get("password");
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const signupInfo = {
      email: email,
      account_type: account,
      password: password,
      first_name: firstName,
      last_name: lastName,
      location: location,
    };
    console.log(signupInfo);
    try {
      const res = await axios.post("http://localhost:3001/auth/register", signupInfo);
      // if (res?.data?.user) {
      //   setUser(res.data.user);
      //   setIsLoggedIn(true);
      //   apiClient.setToken(res.data.token);
      //   localStorage.setItem("token", res.data.token);
      //   navigate("/activity");
      // }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }));
    }
  };

  return (
    <Container maxWidth="xl">
      <Navbar />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={7}
          md={7}
          sx={{
            backgroundImage: "url(https://tardigital.com.br/wp-content/uploads/2022/05/persons.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "120%",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} elevation={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              // marginTop: "17rem",
              marginLeft: "8rem",
              width: "450px",
              height: "800px",
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
                marginBottom: "2rem",
              }}
            >
              Create a new account
              {errors.form && (
                <span style={{ color: "red", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                  {errors.form}
                </span>
              )}
            </Typography>
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
                helperText={errors.password}
                error={errors.password != null}
                onChange={handleOnInputChange}
              />
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
                placeholder="**************"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                style={{ marginTop: "8px" }}
                value={form.confirmPassword}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword != null}
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
                  marginTop: "32px",
                  textTransform: "none",
                }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item sx={{ marginTop: "50px", marginLeft: "7.5rem" }}>
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

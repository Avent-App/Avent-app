import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#fffff",
    },
    secondary: {
      main: "#EF233C",
    },
    darkerRed: {
      main: "#D90429",
    },
  },
  typography: {
    fontFamily: "Inter",
    button: {
      textTransform: "none",
      boxShadow: 0,
      fontWeight: "bold",
    },
  },
});

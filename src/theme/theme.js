import { createMuiTheme } from '@material-ui/core';

const white = "#FFFFFF";

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    primary: {
      contrastText: white,
      dark: "##2d2d2d",
      main: "#036647",
      light: "#7ca53d"
    }
  }
});

export default theme;
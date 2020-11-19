import { createMuiTheme } from "@material-ui/core/styles"
import colors from "./colors"

const defaultTheme = createMuiTheme()
const { breakpoints } = defaultTheme

export default createMuiTheme({
  shadows: ["none"],
  typography: {
    fontFamily: "Poppins",
    h1: {
      textTransform: "uppercase",
      fontWeight: 700,
      fontSize: "32px",
      [breakpoints.up("sm")]: {
        fontSize: "40px"
      },
      [breakpoints.up("md")]: {
        fontSize: "50px"
      },
      [breakpoints.up("lg")]: {
        fontSize: "60px"
      }
    },
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    caption: {},
    button: {}
  },
  palette: {
    primary: {
      main: colors.primary,
      contrastText: "white"
    },
    secondary: {
      main: colors.secondary
    }
  },
  // https://material-ui.com/customization/themes/
  overrides: {
    MuiTypography: {
      gutterBottom: {
        marginBottom: "0.81rem"
      }
    }
  }
})

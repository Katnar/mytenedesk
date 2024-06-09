import { CssBaseline, GlobalStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import diamonds1 from "../assets/images/background_diamonds_big.png";
import Background from "./BackgroundWrapper";
let theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Calibri",
  },
  palette: {
    background: {
      default: "#051D40",
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#E7FAFF",
          color: "#000000",
        },
      },
    },
  },
});
theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    sky: theme.palette.augmentColor({
      color: {
        main: "#E7FAFF",
      },
      name: "sky",
    }),
  },
});
declare module "@mui/material/styles" {
  interface Palette {
    sky: Palette["primary"];
  }

  interface PaletteOptions {
    sky?: PaletteOptions["primary"];
  }
}

type Props = {
  children?: React.ReactNode;
};
const ThemeWrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={(theme) => ({
            body: {
              backgroundImage: `url(${diamonds1}), url(${diamonds1})`,
              backgroundSize: "250px 250px, 250px 250px",
              backgroundPosition:
                "left -125px top calc(100vh - 350px), top 0px right 0px",
              backgroundRepeat: "no-repeat, no-repeat",
              minHeight: "100vh",
            },
          })}
        />
        {children}
      </ThemeProvider>
    </>
  );
};
export default ThemeWrapper;

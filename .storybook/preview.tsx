import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
import * as NextImage from "next/image";

const theme = createTheme({
  palette: {
    primary: {
      light: "#226cd6",
      main: "#1976d2",
      dark: "#1565c0",
    },
    secondary: {
      light: "#ba68c8",
      main: "#9c27b0",
      dark: "#7b1fa2",
    },
    error: {
      light: "#ef5350",
      main: "#d32f2f",
      dark: "#c62828",
    },
    warning: {
      light: "#ff9800",
      main: "#ed6c02",
      dark: "#e65100",
    },
    info: {
      light: "#03a9f4",
      main: "#0288d1",
      dark: "#01579b",
    },
    success: {
      light: "#4caf50",
      main: "#2e7d32",
      dark: "#1b5e20",
    },
    background: {
      default: "#fff",
    },
  },
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    inlineStories: false,
    iframeHeight: "700px",
  },
};
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
const withThemeProvider = (Story, context) => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story {...context} />
      </ThemeProvider>
    </StylesProvider>
  );
};
export const decorators = [withThemeProvider];

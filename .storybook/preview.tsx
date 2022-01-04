import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";
import theme from "../src/styles/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    inlineStories: false,
    iframeHeight: "700px",
  },
};

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

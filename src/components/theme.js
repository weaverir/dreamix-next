// components/theme.js
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brand: {
      100: "#E3E3E3",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#676767",
      600: "#4E4E4E",
      700: "#383838",
      800: "#242424",
      900: "#121212",
    },
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "brand.100",
        color: "brand.900",
      },
    },
  },
});

export default customTheme;

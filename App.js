import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import React, { useState } from "react";

import Root from "./navigation/Root";
import { darkTheme, ligthTheme } from "./styled";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";

export default function App() {
  const isDark = true; //useColorScheme() === "dark";

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : ligthTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

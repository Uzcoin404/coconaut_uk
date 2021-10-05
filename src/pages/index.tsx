import * as React from "react";
import Hero from "../components/Hero";
import Nutrition from "../components/Nutrition/Nutrition";
import ShopTeaser from "../components/ShopTeaser";
import { ThemeProvider } from "styled-components";

import "../styles/reset.css";
import "../styles/global.css";

const mainTheme = {
  background: "#fff",
  foreground: "#000",
  accent: "#39B54A",
};

const Index = () => {
  return (
    <main>
      <ThemeProvider theme={mainTheme}>
        <Hero />
        <Nutrition />
        <ShopTeaser />
      </ThemeProvider>
    </main>
  );
};

export default Index;

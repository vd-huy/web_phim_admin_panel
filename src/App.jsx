import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
      <div className="App ">
        <main className="flex w-full">
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Outlet />
          </ThemeProvider>
        </main>
      </div>
  );
}

export default App;

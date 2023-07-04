import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme.js";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider, Navig } from "react-router-dom";
import HomePage from "./scenes/homePage/index.jsx";
import LoginPage from "scenes/loginPage/index.jsx";

const router = createBrowserRouter([
  { path: "/home", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
]);
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <CssBaseline />
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;

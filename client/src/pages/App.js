import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./homePage";
import Login from "./auth";
import Profile from "./profilePage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.token);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={isAuth ? <Homepage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

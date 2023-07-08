import { Route, Routes } from "react-router-dom";
import Homepage from "./homePage";
import Login from "./login";
import Profile from "./profilePage";
import Register from "./register";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Navbar from "components/navbar";
import { Box } from "@mui/material";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box>
        <Navbar />
      </Box>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

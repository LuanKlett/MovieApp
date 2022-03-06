import React from "react";

import Buscador from "./components/Buscador/Buscador.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import { Route } from "react-router-dom";
import Movie from "./components/Movie/Movie.jsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#998100',
    },
    secondary: {
      main: '#0367A6',
    },
}});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
          <NavBar />
          <Route exact path="/" component={Buscador} />
          <Route path="/movie/:id" component={Movie} />
      </React.Fragment>
      </ThemeProvider>
  );
}

export default App;

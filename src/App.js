import React from "react";

import Favorites from "./components/Favorites/Favorites";
import Buscador from "./components/Buscador/Buscador";
import NavBar from "./components/NavBar/NavBar";
import { Route } from "react-router-dom";
import Movie from "./components/Movie/Movie";
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
          <Route path="/favs" component={Favorites} />
          <Route path="/movie/:id" component={Movie} />
      </React.Fragment>
      </ThemeProvider>
  );
}

export default App;

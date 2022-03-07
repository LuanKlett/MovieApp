import React from "react";
import { connect } from "react-redux";
import MovieCard from "../MovieCard/MovieCard.jsx";
import MovieCardLoading from "../MovieCard/MovieCardLoading.jsx";
import {
  addMovieFavorite,
  getMovies,
  removeMovieFavorite,
} from "../../actions/index.js";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import { TransitionGroup } from "react-transition-group";

function Buscador({
  removeMovieFavorite,
  addMovieFavorite,
  favs,
  movies,
  loading,
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ mx: 5 }}
    >
      {!loading ? (
        movies.length ? (
          <Box sx={{ mt: 1 }}>
            <TransitionGroup>
              <Grid container>
                {movies.map((movie, i) => (
                  <Fade timeout={i * 300} key={movie.id} in={true}>
                    <Grid item xs={12} sm={4} md={2} lg={1.5} sx={{ p: 0.5 }}>
                      <MovieCard movie={movie} />
                    </Grid>
                  </Fade>
                ))}
              </Grid>
            </TransitionGroup>
          </Box>
        ) : (
          <Box sx={{ mt: 1 }}>No se encontraron resultados</Box>
        )
      ) : (
        <Box sx={{ mt: 1 }}>
          <TransitionGroup>
            <Grid container>
              {(function () {
                let arr = [];
                for (let i = 0; i < 12; i++) {
                  arr.push(<MovieCardLoading />);
                }
                return arr;
              })().map((c, i) => (
                <Fade timeout={i * 300} key={"l" + i} in={true}>
                  <Grid item xs={12} sm={4} md={2} lg={1.5} sx={{ p: 0.5 }}>
                  {c}
                  </Grid>
                </Fade>
              ))}
            </Grid>
          </TransitionGroup>
        </Box>
      )}
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded,
    favs: state.moviesFavourites,
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    getMovies: (title) => dispatch(getMovies(title)),
    removeMovieFavorite: (movie) => dispatch(removeMovieFavorite(movie)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);

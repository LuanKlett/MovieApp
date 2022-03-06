import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addMovieFavorite,
  getMovies,
  removeMovieFavorite,
  setLoading
} from "../../actions/index.js";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import Zoom from '@mui/material/Zoom';
import CircularProgress from '@mui/material/CircularProgress';
import { TransitionGroup } from "react-transition-group";

const CardContentNoPadding = styled(CardContent)(`
  &:last-child {
    padding-bottom: 8px;
  }
`);

function Buscador({
  getMovies,
  removeMovieFavorite,
  addMovieFavorite,
  favs,
  movies,
  loading
}) {
  const [title, setTitle] = useState();
  const history = useHistory();

  function handleChange(event) {
    setTitle(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getMovies(title);
  }

  function handleClickFav(movie) {
    favs.filter((m) => m.id === movie.id).length
      ? removeMovieFavorite(movie.id)
      : addMovieFavorite(movie);
  }

  function renderMovie(movie) {
    return (
      <Grid item xs={12} sm={4} md={2} lg={1.5} sx={{ p: 0.5 }}>
        <Card sx={{ border: 1, color: "primary.main" }}>
          <CardMedia
            component="img"
            height="200"
            image={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            alt={movie.title}
            onClick={() => history.push(`/movie/${movie.id}`)}
            sx={{ cursor: "pointer" }}
          />
          <CardContentNoPadding sx={{ pt: 1, px: 1.5 }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="div"
              sx={{ height: 50, cursor: "pointer", color: "white" }}
              onClick={() => history.push(`/movie/${movie.id}`)}
            >
              {movie.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {movie.release_date?.slice(0, 4)}
              </Typography>
              <IconButton
                aria-label="fav"
                onClick={() => handleClickFav(movie)}
                sx={{ p: 0 }}
              >
                {favs.filter((m) => m.id === movie.id).length ? (
                  <Zoom in={true}><FavoriteIcon sx={{ color: "Crimson" }} /></Zoom>
                ) : (
                  <Fade in={true} timeout={700}><FavoriteBorderIcon /></Fade>
                )}
              </IconButton>
            </Box>
          </CardContentNoPadding>
        </Card>
      </Grid>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ mx: 5 }}
    >
      <Box display="flex" alignItems="center" sx={{ mt: 1.5 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Box display="flex" alignItems="center">
            <TextField
              variant="outlined"
              size="small"
              value={title}
              onChange={(e) => handleChange(e)}
            />
            <Button type="submit" variant="outlined" disabled={!title}>
              Search
            </Button>
          </Box>
        </form>
      </Box>
      {!loading ? movies.length ?
      <Box sx={{ mt: 1 }}>
        <TransitionGroup>
          <Grid container>
            {movies.map((movie, i) => (
              <Fade timeout={i * 300} key={movie.id} in={true}>{renderMovie(movie)}</Fade>
            ))}
          </Grid>
        </TransitionGroup>
      </Box> : "No se encontraron resultados" : <Box><CircularProgress /></Box>}
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded,
    favs: state.moviesFavourites,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    getMovies: (title) => dispatch(getMovies(title)),
    removeMovieFavorite: (movie) => dispatch(removeMovieFavorite(movie))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);

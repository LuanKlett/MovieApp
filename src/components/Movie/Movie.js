import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getMovieDetail,
  addMovieFavorite,
  removeMovieFavorite,
} from "../../actions/index";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import CardMedia from "@mui/material/CardMedia";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Movie({
  getMovieDetail,
  addMovieFavorite,
  removeMovieFavorite,
  detail,
  favs,
}) {
  const params = useParams();

  useEffect(() => {
    getMovieDetail(params.id);
  }, [getMovieDetail, params.id]);

  function handleClickFav(movie) {
    favs.filter((m) => m.imdbID === movie.imdbID).length
      ? removeMovieFavorite(movie.imdbID)
      : addMovieFavorite(movie);
  }

  return (
    <Box sx={{ m: 1, display: "flex", justifyContent: "center", p: 2, pt: 0 }}>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", maxWidth: 1200 }}
      >
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", justifyContent: "center", p: 1 }}
        >
          <CardMedia component="img" alt={detail.Title} image={detail.Poster} />
        </Grid>
        <Grid item xs={12} sm={8} sx={{ p: 1 }}>
          <Paper elevation={5} sx={{ p: 2, position: "relative" }}>
            <Typography variant="h3">{detail.Title}</Typography>
            <Rating
              value={parseFloat(detail.imdbRating) / 2}
              precision={0.1}
              readOnly
            />
            <Typography variant="h6">{detail.Year}</Typography>
            <Typography variant="body2">Genre: {detail.Genre}</Typography>
            <Typography variant="body2">Director: {detail.Director}</Typography>
            <Typography variant="body2">Actors: {detail.Actors}</Typography>
            <br />
            <Typography variant="body2">{detail.Plot}</Typography>
            <IconButton
              aria-label="fav"
              onClick={() => handleClickFav(detail)}
              sx={{ p: 0, mt: 2 }}
            >
              {favs.filter((m) => m.imdbID === detail.imdbID).length ? (
                <Zoom in={true}>
                  <FavoriteIcon sx={{ color: "Crimson" }} fontSize="large" />
                </Zoom>
              ) : (
                <Fade in={true} timeout={700}>
                  <FavoriteBorderIcon fontSize="large" />
                </Fade>
              )}
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    detail: state.movieDetail,
    favs: state.moviesFavourites,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMovieDetail: (id) => dispatch(getMovieDetail(id)),
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    removeMovieFavorite: (movie) => dispatch(removeMovieFavorite(movie)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);

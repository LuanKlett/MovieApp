import React from 'react';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  addMovieFavorite,
  removeMovieFavorite
} from "../../actions/index.js";
import Box from "@mui/material/Box";
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

const CardContentNoPadding = styled(CardContent)(`
  &:last-child {
    padding-bottom: 8px;
  }
`);

function MovieCard({movie, favs, removeMovieFavorite, addMovieFavorite}){
  const history = useHistory();

  function handleClickFav(movie) {
    favs.filter((m) => m.id === movie.id).length
      ? removeMovieFavorite(movie.id)
      : addMovieFavorite(movie);
  }

  return (
      <Card sx={{ border: 1, color: "primary.main" }}>
        <CardMedia
          component="img"
          height="200"
          image={movie.poster_path ? `http://image.tmdb.org/t/p/w185/${movie.poster_path}` : '/img/noPoster.png'}
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
  );
}

function mapStateToProps(state) {
  return {
    favs: state.moviesFavourites
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
    removeMovieFavorite: (movie) => dispatch(removeMovieFavorite(movie))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
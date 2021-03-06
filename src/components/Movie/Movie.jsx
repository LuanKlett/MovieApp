import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getMovieDetail,
  addMovieFavorite,
  removeMovieFavorite,
} from "../../actions/index";
import Collapse from "./Collapse";
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
import Skeleton from "@mui/material/Skeleton"

function Movie({
  getMovieDetail,
  addMovieFavorite,
  removeMovieFavorite,
  detail,
  favs,
  loading,
}) {
  const params = useParams();

  useEffect(() => {
    getMovieDetail(params.id);
  }, [getMovieDetail, params.id]);

  function handleClickFav(movie) {
    favs.filter((m) => m.id === movie.id).length
      ? removeMovieFavorite(movie.id)
      : addMovieFavorite(movie);
  }

  return detail && !loading ? (
    <Box sx={{ m: 1, display: "flex", justifyContent: "center", p: 2, pt: 0 }}>
      <Grid container sx={{ maxWidth: 1200 }}>
        <Grid item xs={12} md={4} sx={{ p: 1 }}>
          <CardMedia
            component="img"
            alt={detail.title}
            image={
              detail.poster_path
                ? `http://image.tmdb.org/t/p/w780/${detail.poster_path}`
                : "/img/noPoster.png"
            }
            sx={{ objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={12} sm={8} sx={{ p: 1 }}>
          <Paper elevation={5} sx={{ p: 2, position: "relative" }}>
            <Typography variant="h3" maxWidth="80%">
              {detail.title}
            </Typography>
            <Rating
              value={parseFloat(detail.vote_average) / 2}
              precision={0.1}
              readOnly
            />
            <Typography variant="h6">
              {detail.release_date.slice(0, 4)}
            </Typography>
            <Typography variant="body1" sx={{mt: 1}}>
              Genres:<br/>
              <Typography variant="body2">{detail.genres.map((m, i) =>
                i !== detail.genres.length - 1 ? (
                  <span key={"g" + m.id}>{m.name}, </span>
                ) : (
                  <span>{m.name}</span>
                )
              )}
              </Typography>
            </Typography>
            <Typography variant="body1" sx={{mt: .5}}>
              Director:<br/>
              <Typography variant="body2">{detail.crew.find((c) => c.job === "Director").name}</Typography>
            </Typography>
            <Typography variant="body1" sx={{mt: .5}}>
              Actors:<br/> <Typography variant="body2">{<Collapse arr={detail.cast} letter="a" />}</Typography>
            </Typography>
            <br />
            <Typography variant="body2">{detail.overview}</Typography>
            <IconButton
              aria-label="fav"
              onClick={() => handleClickFav(detail)}
              sx={{ p: 0, mt: 2, position: "absolute", top: 0, right: 15 }}
            >
              {favs.filter((m) => m.id === detail.id).length ? (
                <Zoom in={true}>
                  <FavoriteIcon sx={{ color: "Crimson" }} fontSize="large" />
                </Zoom>
              ) : (
                <Fade in={true} timeout={700}>
                  <FavoriteBorderIcon fontSize="large" />
                </Fade>
              )}
            </IconButton>
            {detail.trailer && (
              <center>
                <Box sx={{ mt: 2 }}>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${detail.trailer.key}`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen="true"
                  ></iframe>
                </Box>
              </center>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Box sx={{ m: 1, display: "flex", justifyContent: "center", p: 2, pt: 0 }}>
      <Grid container sx={{ maxWidth: 1200 }}>
        <Grid item xs={12} md={4} sx={{ p: 1 }}>
          <Skeleton animation="wave" variant="rectangular" sx={{height: "55%"}}/>
        </Grid>
        <Grid item xs={12} sm={8} sx={{ p: 1 }}>
          <Paper elevation={5} sx={{ p: 2, position: "relative" }}>
            <Typography variant="h3" maxWidth="80%">
              <Skeleton animation="wave" />
            </Typography>
            <Rating readOnly />
            <Typography variant="h6">
              <Skeleton animation="wave" sx={{width: "10%"}}/>
            </Typography>
            <Typography variant="body1" sx={{mt: 1}}>
              Genres:<br/>
              <Typography variant="body2"><Skeleton animation="wave" sx={{width: "50%"}}/>
              </Typography>
            </Typography>
            <Typography variant="body1" sx={{mt: .5}}>
              Director:<br/>
              <Typography variant="body2"><Skeleton animation="wave" sx={{width: "12%"}}/></Typography>
            </Typography>
            <Typography variant="body1" sx={{mt: .5}}>
              Actors:<br/> <Typography variant="body2"><Skeleton animation="wave" /></Typography>
            </Typography>
            <br />
            <Typography variant="body2">
              <Skeleton animation="wave" sx={{width: "97%"}}/>
              <Skeleton animation="wave" sx={{width: "95%"}}/>
              <Skeleton animation="wave" sx={{width: "99%"}}/>
              <Skeleton animation="wave" sx={{width: "95%"}}/>
              <Skeleton animation="wave" sx={{width: "100%"}}/>
              <Skeleton animation="wave" sx={{width: "96%"}}/>
            </Typography>
            <IconButton
              disabled
              aria-label="fav"
              sx={{ p: 0, mt: 2, position: "absolute", top: 0, right: 15 }}
            >
              <FavoriteBorderIcon fontSize="large" />
            </IconButton>
            <center>
              <Box sx={{ mt: 2 }}>
                <Skeleton animation="wave" variant="rectangular" sx={{width: 560, height: 315}}/>
              </Box>
            </center>
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
    loading: state.loading,
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

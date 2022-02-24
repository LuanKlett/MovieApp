import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { removeMovieFavorite } from "../../actions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";

function ConnectedList({ fav, removeMovieFavorite, handleClose }) {
  const history = useHistory();
  function handleClick(movie) {
    handleClose();
    history.push(`/movie/${movie.imdbID}`)
  }
  return fav.length ? (
    <List sx={{ width: 350, maxHeight: 300 }}>
      {
        /* Aqui deberias poner tu lista de peliculas! */
        fav.map((movie) => (
          <ListItem
            key={movie.imdbID}
            secondaryAction={
              <IconButton
                edge="end" 
                aria-label="delete"
                onClick={() => removeMovieFavorite(movie.imdbID)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton sx={{p: 0, m: 0}} onClick={() => handleClick(movie)}>
            <ListItemAvatar>
              <Avatar variant="square" sx={{ height: 60 }} src={movie.Poster} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle2">{movie.Title}</Typography>
              }
              secondary={<Typography variant="body2">{movie.Year}</Typography>}
            />
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
  ) : (
    <Typography sx={{ mx: 1 }}>There is no favorites</Typography>
  );
}

function mapStateToProps(state) {
  return {
    fav: state.moviesFavourites,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeMovieFavorite: (movie) => dispatch(removeMovieFavorite(movie)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedList);

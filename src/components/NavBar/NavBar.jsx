import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getMovies } from "../../actions/index.js";
import Logo from "../../logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Favorites from "../Favorites/Favorites.jsx";
import Menu from "@mui/material/Menu";

function NavBar({ getMovies }) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleChange(event) {
    setTitle(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getMovies(title);
    setTitle("")
    history.push("/search")
  }

  const [title, setTitle] = useState();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ backgroundColor: "primary.main", display: "flex", justifyContent: "center" }}>
          <Box display="flex" sx={{position: "absolute", left: 12}}>
          <img
            src={Logo}
            width="30"
            height="30"
            alt=""
            style={{ transform: "rotate(-5deg)" }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ml: 1, textShadow: "1px 1px 5px black" }}
          >
            Movies
          </Typography>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="center">
            <form onSubmit={(e) => handleSubmit(e)}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <TextField
                  value={title}
                  onChange={(e) => handleChange(e)}
                  variant="standard"
                  size="small"
                  autoComplete='off'
                  InputProps={{ style: { fontSize: 15, width: 200 } }}
                />
                <Button sx={{ color: "white", textShadow: "1px 1px 5px black", fontSize: 10}} type="submit" size="small" disabled={!title}>
                  Search
                </Button>
              </Box>
            </form>
          </Box>

          <Box sx={{position: "absolute", right: 12}}>
          <Button
            sx={{ color: "white", textShadow: "1px 1px 5px black" }}
            size="small"
            onClick={() => history.push("/")}
          >
            Home
          </Button>
          <Button
            sx={{ color: "white", textShadow: "1px 1px 5px black" }}
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            size="small"
          >
            Favorites
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Favorites handleClose={handleClose} />
          </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    getMovies: (title) => dispatch(getMovies(title))
  };
}

export default connect(null, mapDispatchToProps)(NavBar);

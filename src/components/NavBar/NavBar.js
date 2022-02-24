import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Favorites from '../Favorites/Favorites'
import Menu from "@mui/material/Menu";

export default function NavBar() {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{backgroundColor: "primary.main"}}>
          <img
            src={Logo}
            width="30"
            height="30"
            alt=""
            style={{ transform: "rotate(-5deg)" }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1, textShadow: "1px 1px 5px black"}}>
            Movies
          </Typography>
          <Button sx={{ color: "white", textShadow: "1px 1px 5px black" }} size="small" onClick={() => history.push("/")}>Home</Button>
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
            <Favorites handleClose={handleClose}/>
          </Menu>
        </Toolbar>
      </AppBar>
          </Box>
  );
}

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPopularMovies } from "../../actions/index";
import Box from "@mui/material/Box";
import MovieCard from "../MovieCard/MovieCard.jsx";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 700 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 700, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Home({ getPopularMovies, popularMovies }) {
  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ mx: 5, mt: 1}}
    >
      <Box sx={{width: "100%"}}>
        <Typography variant="h4">Popular Movies</Typography>
        <Carousel
          responsive={responsive}
          infinite
          >
          {popularMovies.map((movie, i) => (
            <Fade timeout={i * 300} key={movie.id} in={true}>
              <Box sx={{ p: 0.5 }}>
                <MovieCard movie={movie} />
              </Box>
            </Fade>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    popularMovies: state.popularMovies,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPopularMovies: () => dispatch(getPopularMovies()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

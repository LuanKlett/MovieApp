export function addMovieFavorite(payload) {
  return { type: "ADD_MOVIE_FAVORITE", payload };
}

export function getMovies(titulo) {
  return function (dispatch) {
    dispatch({ type: "SET_LOADING" });
    return fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=32c20d590617f94bdbbfaad9baf89d61&query=" +
        titulo
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_MOVIES", payload: json });
      });
  };
}

export function removeMovieFavorite(payload) {
  return { type: "REMOVE_MOVIE_FAVORITE", payload };
}

export function getMovieDetail(id) {
  return function (dispatch) {
    dispatch({ type: "SET_LOADING" });
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=32c20d590617f94bdbbfaad9baf89d61`
    )
      .then((response) => response.json())
      .then((json) => {
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=32c20d590617f94bdbbfaad9baf89d61`
        )
          .then((response) => response.json())
          .then((credits) => {
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/videos?api_key=32c20d590617f94bdbbfaad9baf89d61`
            )
              .then((response) => response.json())
              .then((video) => {
                dispatch({
                  type: "GET_MOVIE_DETAIL",
                  payload: {
                    ...json,
                    cast: credits.cast,
                    crew: credits.crew,
                    trailer: video.results.find((v) => v.type === "Trailer"),
                  },
                });
              });
          });
      });
  };
}

export function getPopularMovies() {
  return function (dispatch) {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=32c20d590617f94bdbbfaad9baf89d61&sort_by=popularity.desc`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_POPULAR_MOVIES", payload: json.results });
      });
  };
}

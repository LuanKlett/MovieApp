const initialState = {
  moviesFavourites: [],
  moviesLoaded: [],
  movieDetail: undefined,
  loading: false,
  popularMovies: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_MOVIE_FAVORITE":
      return {
        ...state,
        moviesFavourites: state.moviesFavourites.concat(action.payload),
      };

    case "GET_MOVIES":
      return {
        ...state,
        moviesLoaded: action.payload.results,
        loading: false,
      };
    case "REMOVE_MOVIE_FAVORITE":
      return {
        ...state,
        moviesFavourites: state.moviesFavourites.filter(
          (movie) => movie.id !== action.payload
        ),
      };

    case "GET_MOVIE_DETAIL":
      return {
        ...state,
        movieDetail: action.payload,
        loading: false,
      };

    case "GET_POPULAR_MOVIES":
      return {
        ...state,
        popularMovies: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}

export default rootReducer;

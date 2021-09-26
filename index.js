(function () {
  let userInput = document.querySelector("#user-input");
  let searchResults = document.querySelector("#search-results");
 
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const appendData = (movieDetails) => {
    let curMovieInfo = document.createElement("div");
    curMovieInfo.setAttribute("class", "movie-info");
    searchResults.appendChild(curMovieInfo);

    let curAnchor = document.createElement("a");
    curAnchor.setAttribute(
      "href",
      `https://imdb.com/title/${movieDetails.data.imdb_id}`
    );
    curAnchor.setAttribute("target", "_blank");
    curAnchor.setAttribute("class", "imdb-link");
    curMovieInfo.appendChild(curAnchor);

    let curTitle = document.createElement("div");
    curTitle.setAttribute("class", "movie-title");
    curTitle.textContent = movieDetails.data.original_title;

    curAnchor.appendChild(curTitle);
    let curImage = document.createElement("img");
    if (movieDetails.data.poster_path) {
      curImage.setAttribute("class", "movie-poster");
      curImage.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w500${movieDetails.data.poster_path}`
      );
    } else {
      curImage.setAttribute("src", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst4.depositphotos.com%2F14953852%2F24787%2Fv%2F600%2Fdepositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg&f=1&nofb=1");
      curImage.setAttribute("class", "movie-poster");
      curImage.setAttribute("class", "no-image")
    }

    curAnchor.appendChild(curImage);
  };

  userInput.addEventListener("input", async () => {
    let queries = await searchMovies(userInput);
    queries.forEach(async (query) => {
      searchResults.textContent = null;
      let movieDetails = await addMovie(query.id);
      appendData(movieDetails);
    });
    toTitleCase(userInput)
  });
})();

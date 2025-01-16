const API_KEY = "CS546";
const BASE_URL = "http://www.omdbapi.com/";

$(document).ready(function () {
  const $searchForm = $("#searchMovieForm");
  const $searchResults = $("#searchResults");
  const $movieDetails = $("#movieDetails");
  const $rootLink = $("#rootLink");
  const $errorMessages = $("#errorMessages");

  $searchForm.on("submit", function (event) {
    event.preventDefault();

    let searchTerm = $("#movie_search_term").val().trim();
    if (!searchTerm) {
      displayErrors(["Please enter a valid movie name!"]);
      return;
    }

    $searchResults.empty().hide();
    $movieDetails.empty().hide();
    $rootLink.hide();
    $errorMessages.empty().hide();

    fetchMovies(searchTerm);
  });

  $searchResults.on("click", "a", function (event) {
    event.preventDefault();

    let movieId = $(this).data("id");
    if (!movieId) {
      displayErrors(["Invalid movie ID."]);
      return;
    }

    $movieDetails.empty().hide();
    $searchResults.empty().hide();

    fetchMovieDetails(movieId);
  });

  const fetchMovies = (searchTerm) => {
    let url1 = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
      searchTerm
    )}&page=1`;
    let url2 = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
      searchTerm
    )}&page=2`;
    let movies = [];

    $.ajax({
      url: url1,
      method: "GET",
      success: function (data) {
        if (data.Response === "True") {
          movies = movies.concat(data.Search || []);
        } else {
          displayErrors(["No results found for page 1."]);
        }
      },
      error: function () {
        displayErrors([
          "An error occurred while fetching page 1 of movie data.",
        ]);
      },
      complete: function () {
        $.ajax({
          url: url2,
          method: "GET",
          success: function (data) {
            if (data.Response === "True") {
              movies = movies.concat(data.Search || []);
            }
          },
          error: function () {
            displayErrors([
              "An error occurred while fetching page 2 of movie data.",
            ]);
          },
          complete: function () {
            if (movies.length > 0) {
              $searchResults.empty();
              displaySearchResults(movies.slice(0, 20));
            } else {
              displayErrors(["No movies found."]);
            }
          },
        });
      },
    });
  };

  const fetchMovieDetails = (movieId) => {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${movieId}`;

    $.ajax({
      url,
      method: "GET",
      success: function (data) {
        if (data.Response === "True") {
          displayMovieDetails(data);
        } else {
          displayErrors(["Could not fetch movie details."]);
        }
      },
      error: function () {
        displayErrors(["An error occurred while fetching movie details."]);
      },
    });
  };

  const displaySearchResults = (movies) => {
    movies.forEach((movie) => {
      let $listItem = $(
        `<li>
          <a href="javascript:void(0)" data-id="${movie.imdbID}">
            ${movie.Title} (${movie.Year})
          </a>
        </li>`
      );
      $searchResults.append($listItem);
    });

    $searchResults.show();
    $rootLink.show();
  };

  const displayMovieDetails = (movie) => {
    let $article = $(
      `<article>
        <h1>${movie.Title || "N/A"}</h1>
        <img alt="${movie.Title} Poster" src="${
        movie.Poster !== "N/A" ? movie.Poster : "/public/no_image.png"
      }">
        <h2>Plot</h2>
        <p>${movie.Plot || "N/A"}</p>
        <section>
          <h3>Info</h3>
          <dl>
            <dt>Year Released:</dt>
            <dd>${movie.Year || "N/A"}</dd>
            <dt>Rated:</dt>
            <dd>${movie.Rated || "N/A"}</dd>
            <dt>Runtime:</dt>
            <dd>${movie.Runtime || "N/A"}</dd>
            <dt>Genre(s):</dt>
            <dd>${movie.Genre || "N/A"}</dd>
            <dt>Box Office Earnings:</dt>
            <dd>${movie.BoxOffice || "N/A"}</dd>
            <dt>DVD Release Date:</dt>
            <dd>${movie.DVD || "N/A"}</dd>
          </dl>
        </section>
        <section>
          <h4>Cast and Crew</h4>
          <p><strong>Director:</strong> ${movie.Director || "N/A"}</p>
          <p><strong>Writer:</strong> ${movie.Writer || "N/A"}</p>
          <p><strong>Cast:</strong> ${movie.Actors || "N/A"}</p>
        </section>
        <section>
          <h4>Ratings</h4>
          <table class="my_coolratings_table">
            <tr>
              <th>Source</th>
              <th>Rating</th>
            </tr>
            ${
              (movie.Ratings || [])
                .map(
                  (rating) =>
                    `<tr>
                      <td>${rating.Source}</td>
                      <td>${rating.Value}</td>
                    </tr>`
                )
                .join("") || '<tr><td colspan="2">N/A</td></tr>'
            }
          </table>
        </section>
      </article>`
    );

    $movieDetails.append($article).show();
  };

  const displayErrors = (errors) => {
    $errorMessages.empty();
    errors.forEach((error) => {
      let $errorItem = $(`<li>${error}</li>`);
      $errorMessages.append($errorItem);
    });
    $errorMessages.show();
  };
});

import { getData } from "./script.js";
import { Spinner } from "./spin.js";
import { Pagination } from "./pagination.js";

const originalMovies = [
  "The Fellowship of the Ring",
  "The Two Towers ",
  "The Return of the King",
];
const hobbitMovies = [
  "An Unexpected Journey",
  "The Desolation of Smaug",
  "The Battle of the Five Armies",
];

class MovieModel {
  constructor() {
    this.movieData = [];
  }
  addMovie = (
    id,
    _academyNominations,
    _academyWins,
    _revenue,
    _budget,
    _name,
    _rtScore,
    _runtime
  ) => {
    let movie = {
      _id: id,
      academyNominations: _academyNominations,
      academyWins: _academyWins,
      revenue: _revenue,
      budget: _budget,
      name: _name == "The Unexpected Journey" ? "An Unexpected Journey" : _name,
      rtScore: _rtScore,
      runtime: _runtime,
    };
    this.movieData.push(movie);

    this.movieData.sort((a, b) => {
      if (originalMovies.includes(a.name) && originalMovies.includes(b.name)) {
        return a.runtime - b.runtime;
      } else if (hobbitMovies.includes(a) && hobbitMovies.includes(b)) {
        return b.runtime - a.runtime;
      }
    });
  };
}

class MovieView {
  constructor() {
    this.container = document.getElementById("movie-container");
    this.recordPerPage = 8;
    this.opts = {
      lines: 8, // The number of lines to draw
      length: 43, // The length of each line
      width: 17, // The line thickness
      radius: 45, // The radius of the inner circle
      scale: 1, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      speed: 1, // Rounds per second
      rotate: 0, // The rotation offset
      animation: "spinner-line-fade-quick", // The CSS animation name for the lines
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: "#ffd448", // CSS color or array of colors
      fadeColor: "transparent", // CSS color or array of colors
      top: "50%", // Top position relative to parent
      left: "50%", // Left position relative to parent
      shadow: "0 0 1px transparent", // Box-shadow for the lines
      zIndex: 2000000000, // The z-index (defaults to 2e9)
      className: "spinner", // The CSS class to assign to the spinner
      position: "absolute", // Element positioning
    };
  }
  seriesButtonAction = (event) => {
    let btnData = event.target.data;
    this.pagination.buttons.forEach((button) => {
      if (button.data.name.includes("Series")) {
        button.fadeOutLeft();
        //button.style.display = "none";
        setTimeout(() => {
          button.classList.toggle("invisible");
        }, 500);
      }
    });
    //this.toggleVisibility(event.target);
    if (btnData.name.includes("Lord")) {
      this.pagination.buttons.forEach((button) => {
        if (originalMovies.includes(button.data.name)) {
          setTimeout(() => {
            button.classList.toggle("invisible");
            button.fadeInRight();
          }, 600);
        }
      });
    } else if (btnData.name.includes("Hobbit")) {
      this.pagination.buttons.forEach((button) => {
        if (hobbitMovies.includes(button.data.name)) {
          setTimeout(() => {
            button.classList.toggle("invisible");
            button.fadeInRight();
          }, 600);
        }
      });
    }

    const backButton = document.getElementById("btn-back");
    backButton.href = "#";
    const toggleEverything = () => {
      this.pagination.buttons.forEach((button) => {
        if (button.data.name.includes("Series")) {
          setTimeout(() => {
            button.fadeInLeft();
            button.classList.toggle("invisible");
          }, 600);
        } else {
          if (!button.classList.contains("invisible")) {
            button.fadeOutRight();
            setTimeout(() => {
              button.classList.toggle("invisible");
            }, 500);
          }
        }
      });
      backButton.removeEventListener("click", toggleEverything);
      setTimeout(() => {
        backButton.href = "index.html";
      }, 100);
    };
    backButton.addEventListener("click", toggleEverything);
  };

  movieButtonAction = (event) => {
    let movie = event.target.data;
    const infoBox = document.getElementById("movie-info");
    infoBox.style.background = "#eee";
    const btnBackHTML = `<a href="#" id="btn-back-infobox" style="position: fixed;">
									<i class="fas fa-angle-left"></i>
								</a>`;

    infoBox.innerHTML += btnBackHTML;
    infoBox.innerHTML +=
      "<a href='#' id='close-button-movies'><i class='fas fa-times'></i></a>";
    infoBox.innerHTML += `<h1 id="movie-title">${movie.name}</h1><br>`;
    switch (movie.name) {
      case "The Fellowship of the Ring":
        infoBox.innerHTML += `<img src="../img/movies/the-fellowship-of-the-ring.jpg" alt="Members of The Fellowship of the Ring" class="infobox-movie-img" id="infobox-img" />`;
        break;
      case "The Two Towers ":
        infoBox.innerHTML += `<img src="../img/movies/the-two-towers.jpg" class="infobox-movie-img" id="infobox-img" />`;
        break;
      case "The Return of the King":
        infoBox.innerHTML += `<img src="../img/movies/the-return-of-the-king.jpg" class="infobox-movie-img" id="infobox-img" />`;
        break;
      case "An Unexpected Journey":
        infoBox.innerHTML += `<img src="../img/movies/an-unexpected-journey.jpeg" class="infobox-movie-img" />`;
        break;
      case "The Desolation of Smaug":
        infoBox.innerHTML += `<img src="../img/movies/the-desolation-of-smaug.jpg" class="infobox-movie-img" />`;
        break;
      case "The Battle of the Five Armies":
        infoBox.innerHTML += `<img src="../img/movies/the-battle-of-the-five-armies.jpg" class="infobox-movie-img" />`;
        break;
      default:
        break;
    }

    infoBox.innerHTML += `<div id="movie-info-text">
		<i class="fas fa-star-half-alt"></i>Academy Award Nominations: ${movie.academyNominations}<br>
		<i class="fas fa-star"></i>Academy Award Wins: ${movie.academyWins}<br>
		<i class="fas fa-hand-holding-usd"></i>Budget: ${movie.budget} million USD<br>
		<i class="fas fa-dollar-sign"></i>Box Office Revenue: ${movie.revenue} million USD<br>
		<img id="rt-score-logo" src="../img/movies/rt-logo.png" />Rotten Tomatoes Score: ${movie.rtScore}<br>
		</div>`;

    const movieInfo = document.getElementById("movie-info-text");
    const infoBoxImage = document.getElementById("infobox-img");
    const btnBack = document.getElementById("btn-back-infobox");
    const btnClose = document.getElementById("close-button-movies");
    console.log("btnClose :>> ", btnClose);

    btnBack.style.visibility = "hidden";

    const transitionGradient = document.getElementById("transition-gradient");

    btnClose.addEventListener("click", () => {
      infoBox.style.visibility = "hidden";
      infoBox.innerHTML = "";
      infoBox.classList.toggle("animate__animated");
      infoBox.classList.toggle("animate__fadeIn");
      transitionGradient.style.opacity = 0;
    });
    console.log("btnClose addEventListener sonrası");

    infoBox.style.visibility = "visible";
    infoBox.classList.toggle("animate__animated");
    infoBox.classList.toggle("animate__fadeIn");
  };

  createMovies = (movieData) => {
    this.pagination = new Pagination(
      movieData,
      this.recordPerPage,
      this.container
    );
    console.log("movieData :>> ", movieData);
    movieData.forEach((movie) => {
      if (!movie.name.includes("Series")) {
        this.pagination.createButton(movie, this.movieButtonAction, [
          "movie-btn",
          "invisible",
        ]);
        console.log("yaratıldı: ", movie);
      } else {
        this.pagination.createButton(
          movie,
          this.seriesButtonAction,
          "movie-btn"
        );
        console.log("SERİES- yaratıldı: ", movie);
      }
    });
    this.pagination.changePage(1);
  };
}

class MovieController {
  constructor(_model, _view) {
    this.model = _model;
    this.view = _view;
  }

  showMovies = async () => {
    const spinner = new Spinner(this.view.opts).spin(this.view.container);
    let movieData = await getData("movie");
    console.log("movieData :>> ", movieData);

    spinner.stop();
    movieData = movieData.docs;
    movieData.forEach((movie) => {
      let _id = movie._id;
      let _academyNominations = movie.academyAwardNominations;
      let _academyWins = movie.academyAwardWins;
      let _revenue = movie.boxOfficeRevenueInMillions;
      let _budget = movie.budgetInMillions;
      let _name = movie.name;
      let _rtScore = movie.rottenTomatesScore;
      let _runtime = movie.runtimeInMinutes;

      this.model.addMovie(
        _id,
        _academyNominations,
        _academyWins,
        _revenue,
        _budget,
        _name,
        _rtScore,
        _runtime
      );
    });
    this.view.createMovies(this.model.movieData);
  };
}

const controller = new MovieController(new MovieModel(), new MovieView());
controller.showMovies();

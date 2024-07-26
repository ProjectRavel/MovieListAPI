const movieList = document.querySelector("#movieList");
const modalBody = document.querySelector("#modalBody");
const apiLoadingSpinner = document.getElementById("apiLoadingSpinner");
const modalLoadingSpinner = document.getElementById("modalLoadingSpinner");
const searchButton = document.getElementById("button-addon2");
const searchLabel = document.getElementById("searchLabel");
const form = document.getElementById("formSearch");
const refreshButton = document.getElementById("refreshButton");

window.addEventListener("DOMContentLoaded", async () => {
  await fetchMovies("avengers");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  movieList.innerHTML = "";
  apiLoadingSpinner.style.display = "block";
  searchMovie(searchLabel.value);
});

refreshButton.addEventListener("click", () => {
  searchLabel.value = "";
  fetchMovies("avengers");
});

async function fetchMovies(keyword) {
  apiLoadingSpinner.style.display = "block";
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${keyword}&apikey=53db7541`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      const data = await response.json();
      if (data.Response === "True") {
        const movies = data.Search;
        const moviesCard = movieDataList(movies);
        movieList.innerHTML = moviesCard;
        apiLoadingSpinner.style.display = "none";
        modalEventListener();
      } else {
        apiLoadingSpinner.style.display = "none";
        movieList.innerHTML = `<h1 class="container text-center">Movies Not Found...</h1>`;
      }
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    apiLoadingSpinner.style.display = "none";
  }
}

async function searchMovie(keyword) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${keyword}&apikey=53db7541`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      const data = await response.json();
      if (data.Response === "True") {
        const updateUI = movieDataList(data.Search);
        apiLoadingSpinner.style.display = "none";
        movieList.innerHTML = updateUI;
        modalEventListener();
      } else {
        apiLoadingSpinner.style.display = "none";
        movieList.innerHTML = `<h1 class="container text-center">Movies Not Found...</h1>`;
      }
    }
  } catch (error) {
    alert("Fetch Failed!");
  }
}

function movieDataList(movieData) {
  return movieData
    .map((movie) => {
      return `<div class="col">
                <div class="card shadow">
                  <img src="${
                    movie.Poster.startsWith("http")
                      ? movie.Poster
                      : "https://via.placeholder.com/300"
                  }" class="card-img-top" alt="">
                  <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <h6 class="card-subtitle mb-2">${movie.Year}</h6>
                    <a href="#" class="btn btn-success modal-detail-button" data-bs-toggle="modal" data-bs-target="#exampleModalMovie" data-imdbid="${
                      movie.imdbID
                    }">Lihat lebih banyak</a>
                  </div>
                </div>
              </div>`;
    })
    .join("");
} 

function modalEventListener() {
  const modalDetailBtn = document.querySelectorAll(".modal-detail-button");
  modalDetailBtn.forEach((btn) => {
    btn.addEventListener("click", async function (e) {
      const movieId = e.target.dataset.imdbid;
      modalBody.innerHTML = "loading...";
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=${movieId}&apikey=53db7541`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          const data = await response.json();
          const infomodal = modalData(data);
          modalBody.innerHTML = infomodal;
          modalLoadingSpinner.style.display = "none";
        }
      } catch (error) {
        console.error("Failed Get Data: ", error);
      }
    });
  });
}

function modalData(movieInfo) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${movieInfo.Poster}" class="img-fluid">
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item border-0"><h3>${movieInfo.Title}
                   (${movieInfo.Year})</h3></li>
                  <li class="list-group-item border-0 border-bottom">
                  <strong>Genre: </strong>${movieInfo.Genre}</li>
                  <li class="list-group-item border-0 border-bottom"
                  <strong>Director: </strong>${movieInfo.Director}</li>
                  <li class="list-group-item border-0 border-bottom">
                  <strong>Actors: </strong>${movieInfo.Actors}</li>
                  <li class="list-group-item border-0 border-bottom">
                  <strong>Plot: </strong><p>${movieInfo.Plot}</p></li>
                </ul>
              </div>
            </div>
          </div>`;
}

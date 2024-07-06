const movieList = document.querySelector("#movieList");
const modalBody = document.querySelector("#modalBody");
const apiLoadingSpinner = document.getElementById("apiLoadingSpinner");
const modalLoadingSpinner = document.getElementById("modalLoadingSpinner");
const searchButton = document.getElementById('button-addon2')
const searchLabel = document.getElementById('searchLabel')
const form = document.getElementById("formSearch")
// Ensure the movieList container has relative positioning

window.addEventListener("DOMContentLoaded", ()=>{
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=dca61bcc&s=avengers" ,
    beforeSend: () => {
      apiLoadingSpinner.style.display = "block"; // Show the spinner
    },
    success: (results) => {
      const movies = results.Search;
      const movieCard = movies
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
                            <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#exampleModalMovie" data-imdbid="${
                              movie.imdbID
                            }">See Details</a>
                        </div>
                    </div>
                </div> `;
        })
        .join("");
      movieList.innerHTML = movieCard;
  
      apiLoadingSpinner.style.display = "none"; // Hide the spinner after content is loaded
  
      // When detail button on click
      $(".modal-detail-button").on("click", function () {
        modalLoadingSpinner.style.display = "block"; // Show the spinner for modal content
        modalBody.innerHTML = ""; // Clear the modal body content
  
        $.ajax({
          url: "http://www.omdbapi.com/?apikey=dca61bcc&i=" + $(this).data("imdbid"),
          success: (results) => {
            const movieDetail = `
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${results.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item border-0"><h3>${results.Title} (${results.Year})</h3></li>
                    <li class="list-group-item border-0 border-bottom"><strong>Genre: </strong>${results.Genre}</li>
                    <li class="list-group-item border-0 border-bottom"><strong>Director: </strong>${results.Director}</li>
                    <li class="list-group-item border-0 border-bottom"><strong>Actors: </strong>${results.Actors}</li>
                    <li class="list-group-item border-0 border-bottom"><strong>Plot: </strong><p>${results.Plot}</p></li>
                  </ul>
                </div>
              </div>
            </div>`;
            modalBody.innerHTML = movieDetail;
            modalLoadingSpinner.style.display = "none"; // Hide the spinner after modal content is loaded
          },
          error: (e) => {
            console.log("eror")
          }
        });
      });
    },
    error: (e) => {
      console.log("eror")
    }
  });
  
})

form.addEventListener('submit', (e)=>{
  e.preventDefault()
  console.log("test")
  movieList.innerHTML = ""
  apiLoadingSpinner.style.display = "block";
  searhMovie()
})

function searhMovie(){
  $.ajax({
    url: "http://www.omdbapi.com/?apikey=dca61bcc&s=" + searchLabel.value ,
    beforeSend: () => {
      apiLoadingSpinner.style.display = "block"; 
    },
    success: (results) => {
      const movies = results.Search;
      const movieCard = movieDataList(movies)
      movieList.innerHTML = movieCard;
  
      apiLoadingSpinner.style.display = "none"; 
  
      // When detail button on click
      $(".modal-detail-button").on("click", function () {
        modalLoadingSpinner.style.display = "block"; 
        modalBody.innerHTML = ""; 
        $.ajax({
          url: "http://www.omdbapi.com/?apikey=dca61bcc&i=" + $(this).data("imdbid"),
          success: (results) => {
            const movieDetail = modalData(results);
            modalBody.innerHTML = movieDetail;
            modalLoadingSpinner.style.display = "none"; 
          },
          error: (e) => {
            console.log("error") 
          }
        });
      });
    },
    error: (e) => {
    console.log("error")
    }
  });
}

function movieDataList(movieData){
  return movieData.map((movie) => {
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
                            <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#exampleModalMovie" data-imdbid="${
                              movie.imdbID
                            }">See Details</a>
                        </div>
                    </div>
                </div> `;
        }).join("");
}

function modalData(movieInfo){
  return `<div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${movieInfo.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item border-0"><h3>${movieInfo.Title} (${movieInfo.Year})</h3></li>
                    <li class="list-group-item border-0 border-bottom"><strong>Genre: </strong>${movieInfo.Genre}</li>
                    <li class="list-group-item border-0 border-bottom"><strong>Director: </strong>${movieInfo.Director}</li>
                    <li class="list-group-item border-0 border-bottom"><strong>Actors: </strong>${movieInfo.Actors}</li>
                    <li class="list-group-item border-0 border-bottom"><strong>Plot: </strong><p>${movieInfo.Plot}</p></li>
                  </ul>
                </div>
              </div>
            </div>`
}
const movieList = document.querySelector('#movieList')

$.ajax({
    url: 'http://www.omdbapi.com/?apikey=dca61bcc&s=avengers',
    success: results => {
        const movies = results.Search
        console.log(movies)
        const movieCard = movies.map((movie)=>{
            return `<div class="col">
                <div class="card shadow">
                    <img src="${movie.Poster.startsWith('http') ? movie.Poster : 'https://via.placeholder.com/300'}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <h6 class="card-subtitle mb-2">${movie.Year}</h6>
                        <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalMovieList">See Details</a>
                    </div>
                </div>
            </div> `
        }).join("")
        movieList.innerHTML = movieCard
    },
    error: (e) => {
        console.log(e.responseText)
    }
})


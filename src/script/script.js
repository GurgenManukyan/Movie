const API_KEY = "7c6e6897-b0ed-49e2-a72c-11877cddcbfc";
const TOP_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?page=1";
const SEARCH_URL = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="; 

getMovie(TOP_URL);
function getMovie(url) {
    fetch(url,{
        headers:{
            "content-type": "application/json",
            "X-API-KEY": API_KEY
        },
    }).then(response =>{
        return response.json()
    }).then(data =>{
        setMovie(data)
    }).catch(data =>{
        alert(new Error(data) );
    }); 
    
}

function setMovie(data){
   const contentEl = document.getElementById('content');
   contentEl.innerHTML = "";
    data.films.forEach(movie => {
        const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
            <div class="movie_image">
            <span class="rating ${geClassByRating(movie.rating)}">${movie.rating}</span>
            <img src="${movie.posterUrl}" alt="${movie.nameEn}">
        </div>
        <div class="movie_container">
            <a href="#" class="movie_name">${movie.nameRu} ${movie.year} год</a>
            <p class="movie_category">${movie.genres.map(genre => ` ${genre.genre}`)}</p>
        </div>
            `
            contentEl.appendChild(movieEl)
    });
}

function geClassByRating(rating){
    if(rating >= 9){
        return "green";
    }else if(rating > 8){
        return "yellow";
    }else{
        return "red";
    }
}


// SEARCH 

const search = document.getElementById('search');
const inputSearch = document.getElementById('search_input');
const form = document.querySelector('form');


form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const apiSearchUrl = `${SEARCH_URL}${inputSearch.value}`;
   if(inputSearch.value){
    getMovie(apiSearchUrl)
    inputSearch.value = "";
   }
})


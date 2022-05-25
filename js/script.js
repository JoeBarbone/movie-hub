var formSubmitEl = document.querySelector("#input-form");
var ratingContainerEl = document.querySelector("#ratings");
var ratingsEl = document.createElement("span");

var ageGroupContainerEl = document.querySelector("#age-group");
var ageGroupEl = document.createElement("p");

var userRatingContainerEl = document.querySelector("#user-rating");
var userRatingEl = document.createElement("p");

var votesContainerEl = document.querySelector("#votes");
var votesEl = document.createElement("p");


var demoRatingContainerEl = document.querySelector("#demo-ratings");
var demoRatingsEl = document.createElement("span");

var formHandler = function(event) {
    event.preventDefault();

    getMovie();
}



var getMovie = function() {
    var requestUrl = 'https://www.omdbapi.com/?apikey=94f7ec29&t='
    var mt = document.getElementById("movie-title").value;
    requestUrl = requestUrl + mt;


    fetch(requestUrl)
        .then(function(response) {
        
        
        return response.json();
        
    })

    .then(function(data) {
            console.log(data);
            //console.log("data.error: " + data.Response);
            // if (data.Response === "False") {
                // document.getElementById("movie-info").textContent = mt + " not found";
            // } else {
                
            

            
            
            document.getElementById("title").innerHTML = data.Title;
            document.getElementById("year").innerHTML = data.Year;
            document.getElementById("rating").innerHTML = data.Rated;
            document.getElementById("actors").innerHTML = data.Actors;
            document.getElementById("poster").innerHTML = "<img class='img-fluid' src='" + data.Poster + "' />";
            document.getElementById("plot").innerHTML = data.Plot;

            document.getElementById("movie-info").style.display = "none";

            document.getElementById("movie-title").value = "";

            var imdbid = data.imdbID;

            document.getElementById("display-card").style.display = "inline";
            document.getElementById("ratings").style.display = "inline";
            document.getElementById("demo-ratings").style.display = "inline";

            

            getRatings(imdbid);
            document.getElementById("movie-title").focus();
            // }
    })
  
}



var getRatings = function(imdbid) {
    ratingContainerEl.innerHTML = "";
    var imdbid = imdbid;
    ratingContainerEl = document.querySelector("#ratings");
    ratingsEl = document.createElement("span");
    


    // account for > 100 per day error message.
    // data.errorMessage 
    

    fetch("https://imdb-api.com/en/API/Ratings/k_e8wpwz9e/" + imdbid)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            var title = data.fullTitle;
            var imdbid = data.imDbId;
            var imdbrating = data.imDb;
            var rt = data.rottenTomatoes;
            var tmdb = data.theMovieDb;
            

            console.log("title: " + title + "\n" + "IMDBID: " + imdbid + "\n" + "Rotten Tomatoes Rating: " + rt + "/100 \n" + "The Movie DB Rating: " + tmdb + "/10");

            ratingsEl.innerHTML = "Title: " + title + "<br />" + "IMDB ID: " + imdbid + "<br />" + "<strong><a href='https://www.imdb.com/title/" + imdbid + "' target='_blank'>" + "IMDB Rating:</strong> " + imdbrating + "/10</a><br />" + "<strong>Spoiled Potatoes Rating:</strong> " + rt + "/100 <br />" + "<strong>The Movie DB Rating:</strong> " + tmdb + "/10"
            ratingContainerEl.appendChild(ratingsEl);
            getDemographicRatings(imdbid);
        })
}



var getDemographicRatings = function(imdbid) {
    fetch("https://imdb-api.com/en/API/UserRatings/k_e8wpwz9e/" + imdbid)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            
            var numberFormatter = Intl.NumberFormat("en-US");
            

            // demoRatingsEl.innerHTML =  
            
            // "<strong>Age under 18:</strong> " + data.demographicAll.agesUnder18.rating +
            // "/10 from " + numberFormatter.format(data.demographicAll.agesUnder18.votes) + " votes <br />" +
            // "<strong>Ages 18 to 29:</strong> " + data.demographicAll.ages18To29.rating +
            // "/10 from " + numberFormatter.format(data.demographicAll.ages18To29.votes) + " votes <br />" +
            // "<strong>Ages 30 to 44:</strong> " + data.demographicAll.ages30To44.rating +
            // "/10 from " + numberFormatter.format(data.demographicAll.ages30To44.votes) + " votes <br />" +
            // "<strong>Age over 45:</strong> " + data.demographicAll.agesOver45.rating +
            // "/10 from " + numberFormatter.format(data.demographicAll.agesOver45.votes) + " votes <br /><br />" +
            // "<strong>All Demographic Data:</strong> " + data.demographicAll.allAges.rating +
            // "/10 from " + numberFormatter.format(data.demographicAll.allAges.votes) + " votes <br />";

            // demoRatingContainerEl.appendChild(demoRatingsEl);

            ageGroupEl.innerHTML = "Age Group<br /><br />" + "Under 18<br />" + "18 to 29<br />" + "30 to 44<br />" + "Over 45<br /><br />" + "Overall";
            ageGroupContainerEl.appendChild(ageGroupEl);


            userRatingEl.innerHTML = "User Rating<br /><br />" + 
                data.demographicAll.agesUnder18.rating + "<br />" +  
                data.demographicAll.ages18To29.rating + "<br />" + 
                data.demographicAll.ages30To44.rating + "<br />" + 
                data.demographicAll.agesOver45.rating  + "<br /><br />" + 
                data.demographicAll.allAges.rating;

            userRatingContainerEl.appendChild(userRatingEl);

            
            votesEl.innerHTML = "Votes<br /><br />" + 
                numberFormatter.format(data.demographicAll.agesUnder18.votes) + "<br />" +
                numberFormatter.format(data.demographicAll.ages18To29.votes) + "<br />" +
                numberFormatter.format(data.demographicAll.ages30To44.votes) + "<br />" +
                numberFormatter.format(data.demographicAll.agesOver45.votes) + "<br /><br />" +
                numberFormatter.format(data.demographicAll.allAges.votes);
            
            votesContainerEl.appendChild(votesEl);


            //demoRatingsEl.innerHTML = ;

            for (var i=0; i < data.ratings.length; i++) {

            //var imdbid = data.imDbId;
            console.log("Rating: " + data.ratings[i].rating + "\n" + "Percent of Votes: " + data.ratings[i].percent + "\n" + "Votes: " + data.ratings[i].votes);

            }
            

        })
}

formSubmitEl.addEventListener("submit", formHandler);
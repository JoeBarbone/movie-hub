// used to read form click (submit button) to use "enter" as well as click
var formSubmitEl = document.querySelector("#input-form");

// used to read the click on the dropdown
// var btnDropDownEl = document.querySelector("#btn-dropdown");

// used to display dropdown
// var dropdownContainerEl = document.querySelector("#movie-history")


// submit button for entered movie
var btnSubmitEl = document.querySelector("#submit");

// movie poster container and display element
var moviePosterContainerEl = document.querySelector("#poster");
var moviePosterEl = document.createElement("div");

// movie info container and movie element (left container/ratings)
var movieInfoContainerEl = document.querySelector("#movie-info");
var movieInfoEl = document.createElement("div");

// demographic ratings container / innerHTML assignment below in getRatings()
var ratingsContainerEl = document.querySelector("#ratings");

// age group demographics container/data
var ageGroupContainerEl = document.querySelector("#age-group");
var ageGroupEl = document.createElement("p");

// user rating demographics container/data 
var userRatingContainerEl = document.querySelector("#user-rating");
var userRatingEl = document.createElement("p");

// votes demographics container/data
var votesContainerEl = document.querySelector("#votes");
var votesEl = document.createElement("p");


//var demoRatingContainerEl = document.querySelector("#demo-ratings");
//var demoRatingsEl = document.createElement("span");

// used to display demographics ratings header ()
var demoRatingsHeaderContainerEl = document.querySelector("#demo-ratings-header")
var demoRatingsHeaderEl = document.createElement("p");

var searchHistoryArr = [ ];





var formHandler = function(event) {
    event.preventDefault();
    getMovie();
}



var getMovie = function() {
    var requestUrl = 'https://www.omdbapi.com/?apikey=94f7ec29&t=' + document.getElementById("movie-title").value;
    //var mt = document.getElementById("movie-title").value;
    //requestUrl = requestUrl + mt;

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
                
            

            
            
            // document.getElementById("title").innerHTML = data.Title;
            // document.getElementById("year").innerHTML = data.Year;
            // document.getElementById("rating").innerHTML = data.Rated;
            // document.getElementById("actors").innerHTML = data.Actors;
            // document.getElementById("poster").innerHTML = "<img class='img-fluid' src='" + data.Poster + "' />";
            // document.getElementById("plot").innerHTML = data.Plot;





            //this was originally used as a box to display the info, but I have since hid it until use
            //document.getElementById("movie-info").style.display = "none";


            moviePosterEl.innerHTML = "<img class='img-fluid' src='" + data.Poster + "' /><br /><br />";
            
            var movieTitle = data.Title;

            movieInfoEl.innerHTML = 
                "<strong>Title: </strong>" + data.Title + "<br />" +
                "<strong>Year: </strong>" + data.Year + "<br />" +
                "<strong>Rated: </strong>" + data.Rated + "<br />" +
                "<strong>Actors: </strong>" + data.Actors + "<br />" +
                "<strong>Plot: </strong>" + data.Plot;

            movieInfoEl.className = "p-3";
            moviePosterContainerEl.appendChild(moviePosterEl);    
            movieInfoContainerEl.appendChild(movieInfoEl);

            var imdbid = data.imdbID;

            // document.getElementById("display-card").style.display = "inline";
            // document.getElementById("ratings").style.display = "inline";
            // document.getElementById("demo-ratings").style.display = "inline";

            var movieTitle = data.Title;
            

            getRatings(imdbid);

            document.getElementById("movie-title").value = "";
            document.getElementById("movie-title").focus();
            saveHistory(movieTitle);    
    })

    
}



var getRatings = function(imdbid) {
    ratingsContainerEl.innerHTML = "";
    var imdbid = imdbid;
    //ratingContainerEl = document.querySelector("#ratings");
    var ratingsEl = document.createElement("div");
    


    // account for > 100 per day error message. if null, then display count message
    // data.errorMessage 
    

     fetch("https://imdb-api.com/en/API/Ratings/k_e8wpwz9e/" + imdbid)
         .then(function(response) {
             return response.json();
         })
         .then(function(data) {
             console.log(data);

            // comment out for testing
            var title = data.fullTitle;
            var imdbid = data.imDbId;
            var imdbrating = data.imDb;
            var rt = data.rottenTomatoes;
            var tmdb = data.theMovieDb;

            // set for testing
            //var title = "Killer Klowns From Outer Space";
            // var imdbid = "tt012968";
            //var imdbid = "tt10954652";
            //var imdbrating = "6.8";
            //var rt = "68.9";
            //var tmdb = "6.8";
            

            //console.log("<h1>Movie Information</h1><br />Title: " + title + "\n" + "IMDBID: " + imdbid + "\n" + "Spoiled Potatoes Rating: " + rt + "/100 \n" + "The Movie DB Rating: " + tmdb + "/10");

            ratingsEl.innerHTML = // "<p class='title is-1'>Movie Information</p>" + 
                "<span class='pl-3 has-text-weight-bold'>Title:</span> " + title + "<br />" + 
                "<span class='pl-3 has-text-weight-bold'>IMDB ID:</span> " + imdbid + "<br /><br /><br />" +
                "<p class='subtitle is-3'>Critic Ratings</p>" + 
                "<strong class='pl-3'><a href='https://www.imdb.com/title/" + imdbid + 
                "' target='_blank'>" + "IMDB Rating:</strong> " + imdbrating + "/10</a><br />" + 
                "<strong class='pl-3'>Spoiled Potatoes Rating:</strong> " + rt + "/100 <br />" + 
                "<strong class='pl-3'>The Movie DB Rating:</strong> " + tmdb + "/10 <br /><br /><br />";
            
            // displays ratings info in top of left-container 
            ratingsContainerEl.appendChild(ratingsEl);
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

            // comment out for testing
            var under18 = data.demographicAll.agesUnder18.rating;
            var ages18To29 = data.demographicAll.ages18To29.rating;
            var ages30To44 = data.demographicAll.ages30To44.rating;
            var agesOver45 = data.demographicAll.agesOver45.rating;
            var allAges = data.demographicAll.allAges.rating;

            // uncomment for testing
            //var under18 = "6.8";
            //var ages18To29 = "6.8";
            //var ages30To44 = "6.8";
            //var agesOver45 = "6.8";
            //var agesAll = "6.8";

            
            var numberFormatter = Intl.NumberFormat("en-US");

            // demoRatingsHeaderEl.innerHTML = "<p class='subtitle is-3'>Demographic Ratings</p>"
            // demoRatingsHeaderContainerEl.appendChild(demoRatingsHeaderEl);

            // sets user ratings headings
            ageGroupEl.innerHTML = "Age Group<br /><br />" + "Under 18<br />" + "18 to 29<br />" + "30 to 44<br />" + "Over 45<br /><br />" + "Overall";
            ageGroupContainerEl.appendChild(ageGroupEl);

            // sets user ratings ratings
            userRatingEl.innerHTML = "User Rating<br /><br />" + 
                under18 + "<br />" +  
                ages18To29 + "<br />" + 
                ages30To44 + "<br />" + 
                agesOver45  + "<br /><br />" + 
                allAges;

            userRatingContainerEl.appendChild(userRatingEl);

            // sets user ratings votes
            // comment out for testing
            var agesUnder18Votes = data.demographicAll.agesUnder18.votes;
            var ages18To29Votes = data.demographicAll.ages18To29.votes;
            var ages30To44Votes = data.demographicAll.ages30To44.votes;
            var agesOver45Votes = data.demographicAll.agesOver45.votes;
            var allAgesVotes = data.demographicAll.allAges.votes;

            
            
            
            // uncomment this setup for testing
            //var agesUnder18Votes = "684";
            //var ages18To29Votes = "32863";
            //var ages30To44Votes = "23993";
            //var agesOver45Votes = "32234";
            //var agesAllVotes = "83235";

            votesEl.innerHTML = "Votes<br /><br />" + 
                // numberFormatter.format(data.demographicAll.agesUnder18.votes) + "<br />" +
                // numberFormatter.format(data.demographicAll.ages18To29.votes) + "<br />" +
                // numberFormatter.format(data.demographicAll.ages30To44.votes) + "<br />" +
                // numberFormatter.format(data.demographicAll.agesOver45.votes) + "<br /><br />" +
                // numberFormatter.format(data.demographicAll.allAges.votes);

                
                numberFormatter.format(agesUnder18Votes) + "<br />" +
                numberFormatter.format(ages18To29Votes) + "<br />" +
                numberFormatter.format(ages30To44Votes) + "<br />" +
                numberFormatter.format(agesOver45Votes) + "<br /><br />" +
                numberFormatter.format(allAgesVotes);
            
            votesContainerEl.appendChild(votesEl);


            
            // demoRatingsEl.innerHTML = ;

            // used for testing
            //for (var i=0; i < data.ratings.length; i++) {

            //var imdbid = data.imDbId;
            //console.log("Rating: " + data.ratings[i].rating + "\n" + "Percent of Votes: " + data.ratings[i].percent + "\n" + "Votes: " + data.ratings[i].votes);

            //}
            

        })
        getViewingOptions(imdbid);
}



var getViewingOptions = function(imdbid) {

    
    // setting IDs to display headings
    var viewOptionsHeadingContainerEl = document.querySelector("#view-options-heading");
    var viewRentOptionsHeadingContainerEl = document.querySelector("#rent-options-heading");
    var viewBuyOptionsHeadingContainerEl = document.querySelector("#buy-options-heading");
    var viewSubOptionsHeadingContainerEl = document.querySelector("#sub-options-heading");

    // creating elements to assign options heading title, IE: Rental, Purchase, Subscription
    var viewOptionsHeadingEl = document.createElement("p");
    var viewRentHeadingEl = document.createElement("p");
    var viewBuyHeadingEl = document.createElement("p");
    var viewSubHeadingEl = document.createElement("p");

    // clear data
    viewOptionsHeadingContainerEl.innerHTML = "";
    viewRentOptionsHeadingContainerEl.innerHTML = "";
    viewBuyOptionsHeadingContainerEl.innerHTML = "";
    viewSubOptionsHeadingContainerEl.innerHTML = "";

    // setting heading data
    viewOptionsHeadingEl.innerHTML = "Viewing Options";
    viewRentHeadingEl.innerHTML = "Rental Options";
    viewBuyHeadingEl.innerHTML = "Purchase Options";
    viewSubHeadingEl.innerHTML = "Subscription Options";


    
    // setting containers to display data
    viewRentContainerEl = document.querySelector("#rent-viewing-options");
    viewBuyContainerEl = document.querySelector("#buy-viewing-options");
    viewSubContainerEl = document.querySelector("#sub-viewing-options");

    
    


    fetch("https://api.watchmode.com/v1/title/" + imdbid + "/sources/?apiKey=QKlb5uqJqrs4TSLGQHRsUwAMgKndbhqCOUaIyCW0")
        .then(function(response) {
        
            return response.json();
        
        })
    
    .then(function(data) {
        console.log(data);
        
        

        // adding data to container element to display
        viewOptionsHeadingContainerEl.appendChild(viewOptionsHeadingEl);
        viewRentOptionsHeadingContainerEl.appendChild(viewRentHeadingEl);
        viewBuyOptionsHeadingContainerEl.appendChild(viewBuyHeadingEl);
        viewSubOptionsHeadingContainerEl.appendChild(viewSubHeadingEl);
        
        var iconPath = "";
    
        for (var i=0; i < data.length; i++) {
    
            var name = data[i].name;
            var price = data[i].price;
            var format = data[i].format;
            var web = data[i].web_url;
            var type = data[i].type;
    
            console.log(format);
            if ((name === "Google Play" || name === "Hulu" || name === "Netflix" || name === "Amazon" || name === "YouTube" || name === "DirecTV On Demand" || name === "Spectrum On Demand") && format === "HD") {
                
                switch (name) {
                    
                    case "Google Play":
                        iconPath = "https://cdn.watchmode.com/provider_logos/googlePlay_100px.png";
                        break;

                    case "Netflix":
                        iconPath = "https://cdn.watchmode.com/provider_logos/netflix_100px.png";
                        break;

                    case "Hulu":
                    iconPath = "https://cdn.watchmode.com/provider_logos/hulu_100px.png";
                    break;

                    case "Amazon":
                    iconPath = "https://cdn.watchmode.com/provider_logos/prime_video_100px.png";
                    break;

                    case "YouTube":
                    iconPath = "https://cdn.watchmode.com/provider_logos/youtubePremium_100px.png";
                    break;

                    case "DirecTV On Demand":
                    iconPath = "https://cdn.watchmode.com/provider_logos/442_autogenerated.png";
                    break;

                    case "Spectrum On Demand":
                    iconPath = "https://cdn.watchmode.com/provider_logos/443_autogenerated.png";
                    break;
                }




                switch (type) {
                    case "rent":
                        
                        // this has been an issue in the past, I keep forgetting to create the element inside the for loop
                        
                        var viewRentEl = document.createElement("p");
                        
                        // clear data
                        viewRentEl.innerHTML = "";

                        viewRentEl.innerHTML = "<img src='" + iconPath + "' />" + "&emsp;" + "Price: $" + price + "&emsp;" + "Format: " + format + "&emsp;" + "<br /><br />";
                        viewRentContainerEl.appendChild(viewRentEl);
                        break;

                    case "buy":
                        
                        // this has been an issue in the past, I keep forgetting to create the element inside the for loop
                        var viewBuyEl = document.createElement("p");
                        
                        // clear data
                        viewBuyEl.innerHTML = "";
                        
                        viewBuyEl.innerHTML = "<img src='" + iconPath + "' />" + "&emsp;" + "Price: $" + price + "&emsp;" + "Format: " + format + "&emsp;" +  "<br /><br />";
                        viewBuyContainerEl.appendChild(viewBuyEl);
                        break;

                    case "sub":
                        
                        // this has been an issue in the past, I keep forgetting to create the element inside the for loop
                        var viewSubEl = document.createElement("p");
                        
                        // clear data
                        viewSubEl.innerHTML = "";

                        viewSubEl.innerHTML = "<img src='" + iconPath + "' />" + "&emsp;" + "&emsp;" + "Format: " + format + "&emsp;" + "&emsp;" + "<br /><br />";
                        viewSubContainerEl.appendChild(viewSubEl);
                        break;

                    
                }
            }
             
        }
        
    })
   
}


var saveHistory = function(movieTitle) {
    
    var existingHistory = JSON.parse(localStorage.getItem("movies"));
  
    if (existingHistory) {

        searchHistoryArr = existingHistory;
        var isExist = searchHistoryArr.includes(movieTitle);
    } 

    if (!isExist) {
        searchHistoryArr.push(movieTitle);
        console.log("Search History Array: " + searchHistoryArr);
        localStorage.setItem("movies", JSON.stringify(searchHistoryArr));
        // createButton(searchCity);
    }
    
}

var loadHistory = function() {
    btnDropDownEl.className = "dropdown is-active";
    
    var existingHistory = JSON.parse(localStorage.getItem("movies"));
  
    if (existingHistory) {

        // searchHistoryArr = existingHistory;
        // var isExist = searchHistoryArr.includes(movieTitle);
    

        for (var i=0; i < existingHistory.length; i++) {
            var dropdownItemEl = document.createElement("p");
            dropdownItemEl.innerHTML = existingHistory[i];
            dropdownItemEl.className = "dropdown-item";
            dropdownContainerEl.appendChild(dropdownItemEl); 
        }
        
    }
    
    
}

// btnDropDownEl.addEventListener("click", loadHistory);
formSubmitEl.addEventListener("submit", formHandler);
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

//-------------------------------------------------
//SPOTIFY

let userInput = process.argv.slice(3).join("+");
// console.log("User Input: "+ userInput);


if(process.argv[2] === "spotify-this-song" && process.argv[3] === undefined){
    spotify
    .search({ type: 'track', query: "the+sign" })
    .then(function(data) {
        console.log("Artist: " + data.tracks.items[3].artists[0].name);
        console.log("Song: " + data.tracks.items[3].name);
        console.log("Link to the song: " + data.tracks.items[3].external_urls.spotify);
        console.log("Album: " + data.tracks.items[3].album.name);
    })
    .catch(function(err) {
        console.log("not working " + err);
    });
}
    else if (process.argv[2] === "spotify-this-song"){
        music(userInput);
    }  
    else if(process.argv[2] === "movie-this"){
        movie(userInput);
    }
    else if(process.argv[2] === "movie-this" && process.argv[3]=== undefined){
        // userInput = "mr+nobody"
        // console.log(userInput);
        // movie();
        axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
            function(response) {
                console.log(response);
                // console.log("Title of the movie: " + response.data.Title);
                // console.log("Released: " + response.data.Released);
                // console.log("IMDB Rating of the movie: " + response.data.imdbRating);
                // console.log("Rotten Tomatoes Rating of the movie " + response.data.Ratings[2]);//Figure it out
                // console.log("Country: " + response.data.Country);
                // console.log("Language: " + response.data.Language);
                // console.log("Plot of the movie: " + response.data.Plot);
                // console.log("Actors: " + response.data.Actors);
      }
    ) .catch(function(err) {
        console.log(err);
        });
    ;


    }





function music(){ 
    spotify
  .search({ type: 'track', query: userInput })
  .then(function(data) {
    //   console.log(data.tracks.items[0].artists[0]);
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Link to the song: " + data.tracks.items[0].external_urls.spotify);
    console.log("Album: " + data.tracks.items[0].album.name);
  })
  .catch(function(err) {
    console.log(err);
    });
}


/// Use switch
//----------------------------------------------------------
//BANDS IN TOWN

// Need axios

// 1. `node liri.js concert-this <artist/band name here>`

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")


//----------------------------------------------------------
//MOVIES 

function movie(){
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
            // console.log(response);
            console.log("Title of the movie: " + response.data.Title);
            console.log("Released: " + response.data.Released);
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie " + response.data.Ratings[2]);//Figure it out
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
  }
) .catch(function(err) {
    console.log(err);
    });
;
}


require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");


let userInput = process.argv.slice(3).join("+");
console.log("User Input: " + userInput);
let randomInput; 
let randomAction;

console.log("Global randomInput: " + randomInput);
console.log("Global randomAction: " + randomAction);



//----------------------------------------------------------
//DO-WHAT-IT-SAYS

fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    var dataArr = data.trim().split(",");
    // console.log(dataArr);
    randomAction = dataArr[0].trim();
    randomInput = dataArr[1].trim();

    // console.log(randomAction);
    // console.log(randomInput);
  });


//-------------------------------------------------
//SPOTIFY

function music() {
    spotify
        .search({
            type: 'track',
            query: userInput
        })
        .then(function (data) {
            //   console.log(data.tracks.items[0].artists[0]);
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Link to the song: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
        })
        .catch(function (err) {
            console.log(err);
        });
}

//----------------------------------------------------------
//MOVIES 

function movie() {
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // console.log(response);
            console.log("Title of the movie: " + response.data.Title);
            console.log("Released: " + response.data.Released);
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie " + response.data.Ratings[2]); //Figure it out
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    ).catch(function (err) {
        console.log(err);
    });;
}


//----------------------------------------------------------
//BANDS IN TOWN

function bands(){
    queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=88d400d4-397f-448a-a027-f72900e7f80f"

    console.log("queryUrl: " + queryUrl);

    axios.get(queryUrl).then(function(response) {
        for(var i =0; i<response.data.length; i++){
            console.log("Name of the venue: " + response.data[i].venue.name);
            console.log("Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
            console.log("Date of the Event: " +  moment(response.data[i].datetime).format("MM/DD/YYYY"))
            console.log("-------------------------------");
        }
      })
      .catch(function(err) {
          console.log("not working: " + err)});
}


//----------------------------------------------------------
//USER INTERACTION

if (process.argv[2] | randomAction === "spotify-this-song" && process.argv[3] === undefined) {
    console.log("hi¨")
    spotify
    .search({
        type: 'track',
        query: "the+sign"
    })
    .then(function (data) {
        console.log("Artist: " + data.tracks.items[3].artists[0].name);
        console.log("Song: " + data.tracks.items[3].name);
        console.log("Link to the song: " + data.tracks.items[3].external_urls.spotify);
        console.log("Album: " + data.tracks.items[3].album.name);
    })
    .catch(function (err) {
        console.log("not working " + err);
    });
} 
else if (process.argv[2] | randomAction === "spotify-this-song") {
    console.log("h¨")
    music(userInput | randomInput);
} 
else if (process.argv[2] === "movie-this" && process.argv[3] === undefined) {
    console.log("this condition is not running");
    axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // console.log(response);
            console.log("Title of the movie: " + response.data.Title);
            console.log("Released: " + response.data.Released);
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie " + response.data.Ratings[2]);//Figure it out
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }).catch(function (err) {
            console.log(err);
    });;
} 
else if (process.argv[2] === "movie-this") {
    movie(userInput);
}
else if (process.argv[2] === "concert-this") {
    bands();
}








//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

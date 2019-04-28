require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);

//-------------------------------------------------
//SPOTIFY

let song = process.argv.slice(3).join("+");


if(process.argv[3] === undefined){
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
        music(song)
    }  




function music(){ 
    spotify
  .search({ type: 'track', query: song })
  .then(function(data) {
    //   console.log(data.tracks.items[0].artists[0]);
    console.log("Artist: " + data.tracks.items[3].artists[0].name);
    console.log("Song: " + data.tracks.items[3].name);
    console.log("Link to the song: " + data.tracks.items[3].external_urls.spotify);
    console.log("Album: " + data.tracks.items[3].album.name);
  })
  .catch(function(err) {
    console.log(err);
    });
}


//check how to join 2 words together
// console.log(song);



/// Use switch




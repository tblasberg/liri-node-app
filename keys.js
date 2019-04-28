console.log('this is loaded');
SPOTIFY_ID="032c3beda97b4f688e4ece024969c56e";
SPOTIFY_SECRET="11ab0c7743004a3192fd32810fedc866";

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
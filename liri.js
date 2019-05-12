require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
const colors = require('colors');
// console.log(spotify);

var userRequest = process.argv.slice(3).join(" ");
var liriDo = process.argv[2];
// console.log(userRequest);

var bandsintownUrl = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp";
// console.log(bandsintownUrl);

switch (liriDo) {
    case 'concert-this':
        // console.log(`Works!`);
        axios.get(bandsintownUrl).then((response) => {
            let arr = response.data;
            console.log(arr);
            arr.forEach(event => {
                let nameOfVenue = `${event.venue.name}.`;
                let venueLocation = `${event.venue.city} ${event.venue.region}, ${event.venue.country}.`;
                let dateEvent = moment(event.datetime).format("YYYY/MM/DD");
                let timeEvent = moment(event.datetime).format("HH:mm:ss");
                // console.log(event);
                console.log(`**********************************************************************************************************`.rainbow);
                console.log(`|                                                         `);
                console.log(`|      Name of the venue ----- ${nameOfVenue}                `.green);
                console.log(`|                                                         `);
                console.log(`|      Venue location    ----- ${venueLocation}              `.cyan);
                console.log(`|                                                         `);
                console.log(`|      Date of the Event ----- ${dateEvent}                   `.magenta);
                console.log(`|                                                         `);
                console.log(`|      Time of the Event ----- ${timeEvent}               `.yellow);
                console.log(`|                                                         `);
                console.log(`**********************************************************************************************************\n\n`.rainbow);
            });
        }).catch((error) => {
            if (error) console.log(error);
        })
        break;
    case 'spotify-this-song':
        if (!userRequest) {
            spotify.search({ type: 'track', query: "Ace of Base, The Sign" }, function (err, data) {
                if (err) console.log('Error occurred: ' + err);
                else {
                let arrAlbum = data.tracks.items;
                    arrAlbum.forEach(album => {
                        let nameArtist = `${album.artists[0].name}.`;
                        let songName = `${album.name}.`;
                        let previewLink = `${album.preview_url}`;
                        let albumName = `${album.album.name}.`
                        console.log(`**********************************************************************************************************`.rainbow);
                        console.log(`|                                                         `);
                        console.log(`|   Name of Artist(s)  ----- ${nameArtist}                `.green);
                        console.log(`|                                                         `);
                        console.log(`|   Song Name          ----- ${songName}              `.cyan);
                        console.log(`|                                                         `);
                        console.log(`|   Preview URL        ----- ${previewLink}                   `.magenta);
                        console.log(`|                                                         `);
                        console.log(`|   Album Name         ----- ${albumName}               `.yellow);
                        console.log(`|                                                         `);
                        console.log(`**********************************************************************************************************\n`.rainbow);
                    });
            }
        });
        } else if (userRequest) {
            spotify.search({ type: 'track', query: userRequest }, function (err, data) {
                if (err) console.log('Error occurred: ' + err);
                else {
                    let arrAlbum = data.tracks.items;
                    arrAlbum.forEach(album => {
                        let nameArtist = `${album.artists[0].name}.`;
                        let songName = `${album.name}.`;
                        let previewLink = `${album.preview_url}`;
                        let albumName = `${album.album.name}.`
                        console.log(`**********************************************************************************************************`.rainbow);
                        console.log(`|                                                         `);
                        console.log(`|   Name of Artist(s)  ----- ${nameArtist}                `.green);
                        console.log(`|                                                         `);
                        console.log(`|   Song Name          ----- ${songName}              `.cyan);
                        console.log(`|                                                         `);
                        console.log(`|   Preview URL        ----- ${previewLink}                   `.magenta);
                        console.log(`|                                                         `);
                        console.log(`|   Album Name         ----- ${albumName}               `.yellow);
                        console.log(`|                                                         `);
                        console.log(`**********************************************************************************************************\n\n`.rainbow);
                    });
                }
            });
        }    
        break;
    // case 'Papayas':
    //     console.log('Mangoes and papayas are $2.79 a pound.');
    //     // expected output: "Mangoes and papayas are $2.79 a pound."
    //     break;
    // default:
    //     console.log('Sorry, we are out of ' + expr + '.');
}
// var axios = require("axios");

// // Store all of the arguments in an array
// var nodeArgs = process.argv;

// // Create an empty variable for holding the movie name
// var movieName = "";

// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
// for (var i = 2; i < nodeArgs.length; i++) {

//     if (i > 2 && i < nodeArgs.length) {
//         movieName = movieName + "+" + nodeArgs[i];
//     } else {
//         movieName += nodeArgs[i];

//     }
// }

// // Then run a request with axios to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// // This line is just to help us debug against the actual URL.
// console.log(queryUrl);

// axios.get(queryUrl).then(
//     function (response) {
//         console.log("Release Year: " + response.data.Year);
//     })
//     .catch(function (error) {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             console.log("---------------Data---------------");
//             console.log(error.response.data);
//             console.log("---------------Status---------------");
//             console.log(error.response.status);
//             console.log("---------------Status---------------");
//             console.log(error.response.headers);
//         } else if (error.request) {
//             // The request was made but no response was received
//             // `error.request` is an object that comes back with details pertaining to the error that occurred.
//             console.log(error.request);
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             console.log("Error", error.message);
//         }
//         console.log(error.config);
//     });

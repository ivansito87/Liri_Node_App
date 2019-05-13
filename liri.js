require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
const colors = require('colors');
var fs = require("fs");

let userRequest = process.argv.slice(3).join(" ");
let liriDo = process.argv[2];

if (liriDo === "do-what-it-says") {

    const contents = fs.readFileSync(__dirname + "/random.txt", "utf8");
    console.log(contents);
    let output = contents.split("\n");
    console.log(output);
    let randomNum = Math.floor(Math.random() * output.length);
    console.log(randomNum);
    let newAction = output[randomNum].split(",");
    console.log(newAction);
    liriDo = newAction[0];
    userRequest = newAction[1];
    console.log(liriDo);
    console.log(userRequest);

}



switch (liriDo) {
    case 'concert-this':
        fs.appendFileSync(__dirname + '/random.txt', liriDo + "," + userRequest + "\n");
        let bandsintownUrl = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp";
        axios.get(bandsintownUrl).then((response) => {
            let arr = response.data;
            console.log(arr);
            arr.forEach(event => {
                let artist = `${event.lineup}`;
                let nameOfVenue = `${event.venue.name}.`;
                let venueLocation = `${event.venue.city} ${event.venue.region}, ${event.venue.country}.`;
                let dateEvent = moment(event.datetime).format("YYYY/MM/DD");
                let timeEvent = moment(event.datetime).format("HH:mm:ss");
                console.log(`**********************************************************************************************************`.rainbow);
                console.log(`|      Artist  --------------- ${artist}                                                                       `.yellow);
                console.log(`|                                                                                                                     `);
                console.log(`|      Name of the venue ----- ${nameOfVenue}                                                                   `.green);
                console.log(`|                                                                                                                     `);
                console.log(`|      Venue location    ----- ${venueLocation}                                                                  `.cyan);
                console.log(`|                                                                                                                     `);
                console.log(`|      Date of the Event ----- ${dateEvent}                                                                   `.magenta);
                console.log(`|                                                                                                                     `);
                console.log(`|      Time of the Event ----- ${timeEvent}                                                                    `.yellow);
                console.log(`|                                                                                                                     `);
                console.log(`**********************************************************************************************************\n\n`.rainbow);
            });
        }).catch((error) => {
            if (error) console.log(error);
        })
        break;
    case 'spotify-this-song':
        if (!userRequest) {
            fs.appendFileSync(__dirname + '/random.txt', liriDo + "," + "Ace of Base, The Sign" + "\n");
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
                        console.log(`|                                                                                                                 `);
                        console.log(`|   Name of Artist(s)  ----- ${nameArtist}                                                                  `.green);
                        console.log(`|                                                                                                                 `);
                        console.log(`|   Song Name          ----- ${songName}                                                                     `.cyan);
                        console.log(`|                                                                                                                 `);
                        console.log(`|   Preview URL        ----- ${previewLink}                                                               `.magenta);
                        console.log(`|                                                                                                                 `);
                        console.log(`|   Album Name         ----- ${albumName}                                                                                                                               `.yellow);
                        console.log(`|                                                                                                                 `);
                        console.log(`**********************************************************************************************************\n`.rainbow);
                    });
                }
            });
        } else if (userRequest) {
            fs.appendFileSync(__dirname + '/random.txt', liriDo + "," + userRequest + "\n");
            spotify.search({ type: 'track', query: userRequest }, function (err, data) {
                if (err) console.log('Error occurred: ' + err);
                else {
                    let arrAlbum = data.tracks.items;
                    arrAlbum.forEach(album => {
                        let nameArtist = `${album.artists[0].name}.`;
                        let songName = `${album.name}.`;
                        let previewLink = `${album.preview_url}`;
                        let albumName = `${album.album.name}.`
                        console.log(`**********************************************************************************************`.rainbow);
                        console.log(`|                                                                                                         `);
                        console.log(`|   Name of Artist(s)  ----- ${nameArtist}                                                          `.green);
                        console.log(`|                                                                                                         `);
                        console.log(`|   Song Name          ----- ${songName}                                                             `.cyan);
                        console.log(`|                                                                                                         `);
                        console.log(`|   Preview URL        ----- ${previewLink}                                                       `.magenta);
                        console.log(`|                                                                                                         `);
                        console.log(`|   Album Name         ----- ${albumName}                                                          `.yellow);
                        console.log(`|                                                                                                         `);
                        console.log(`**********************************************************************************************\n\n`.rainbow);
                    });
                }
            });
        }
        break;
    case 'movie-this':
        if (!userRequest) {
            var omdbUrlNoArgs = "http://www.omdbapi.com/?t=Mr.Nobody.&y=&plot=short&apikey=trilogy";
            fs.appendFileSync(__dirname + '/random.txt', liriDo + "," + "Mr Nobody" + "\n");
            axios.get(omdbUrlNoArgs).then((response) => {
                let movie = response.data;
                let movieTitle = movie.Title;
                let dateReleased = movie.Released;
                let rating = movie.imdbRating;
                let rottenTomatoes = movie.Ratings[1].Value;
                let country = movie.Country;
                let language = movie.Language;
                let plot = movie.Plot;
                let actors = movie.Actors;
                console.log("\n\n");
                console.log(`*****************************************************************************`.rainbow);
                console.log(`|                                                                            `);
                console.log(`|  Title of the movie -  -  -  -  -  -  -  -  -  -   ${movieTitle}           `.cyan);
                console.log(`|  Date Released      -  -  -  -  -  -  -  -  -  -   ${dateReleased}         `.green);
                console.log(`|  Rating of the movie   -  -  -  -  -  -  -  -  -   ${rating}               `.yellow);
                console.log(`|  Rotten Tomatoes Rating of the movie  -  -  -  -   ${rottenTomatoes}       `.magenta);
                console.log(`|  Country of production -  -  -  -  -  -  -  -  -   ${country}              `.blue);
                console.log(`|  Language of the movie -  -  -  -  -  -  -  -  -   ${language}             `.green);
                console.log(`|  Plot   -  -  -  -  -  -  -  -  -  -  -  -  -  -   ${plot}                 `.yellow);
                console.log(`|  Actors -  -  -  -  -  -  -  -  -  -  -  -  -  -   ${actors}               `.magenta);
                console.log(`|                                                                            `);
                console.log(`*****************************************************************************\n\n`.rainbow);
            }).catch((error) => {
                if (error) console.log(error);
            })
        } else if (userRequest) {
            var omdbUrl = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=trilogy";
            fs.appendFileSync(__dirname + '/random.txt', liriDo + "," + userRequest + "\n");
            axios.get(omdbUrl).then((response) => {
                let movie = response.data;
                let movieTitle = movie.Title;
                let dateReleased = movie.Released;
                let rating = movie.imdbRating;
                let rottenTomatoes = movie.Ratings[1].Value;
                let country = movie.Country;
                let language = movie.Language;
                let plot = movie.Plot;
                let actors = movie.Actors;
                console.log("\n\n");
                console.log(`*****************************************************************************`.rainbow);
                console.log(`|                                                                            `);
                console.log(`|  Title of the movie -  -  -  -  -  -  -  -  -  -   ${movieTitle}           `.cyan);
                console.log(`|  Date Released      -  -  -  -  -  -  -  -  -  -   ${dateReleased}         `.green);
                console.log(`|  Rating of the movie   -  -  -  -  -  -  -  -  -   ${rating}               `.yellow);
                console.log(`|  Rotten Tomatoes Rating of the movie  -  -  -  -   ${rottenTomatoes}       `.magenta);
                console.log(`|  Country of production -  -  -  -  -  -  -  -  -   ${country}              `.blue);
                console.log(`|  Language of the movie -  -  -  -  -  -  -  -  -   ${language}             `.green);
                console.log(`|  Plot   -  -  -  -  -  -  -  -  -  -  -  -  -  -   ${plot}                 `.yellow);
                console.log(`|  Actors -  -  -  -  -  -  -  -  -  -  -  -  -  -   ${actors}               `.magenta);
                console.log(`|                                                                            `);
                console.log(`*****************************************************************************\n\n`.rainbow);
            }).catch((error) => {
                if (error) console.log(error);
            })
        }
        break;
    default:
        console.log("No valid argument has been provided, please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says' followed by parameter.");
}





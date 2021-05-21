#! /usr/bin/env node

console.log('This script populates some test movies to the database.');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Movie = require('./models/movie');
var Director = require('./models/director');
var Genre = require('./models/genre');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var directors = [];
var genres = [];
var movies = [];

function directorCreate(
  first_name,
  family_name,
  p_of_birth,
  p_of_death,
  birth_name,
  nickname,
  d_birth,
  d_death,
  cb
) {
  directordetail = {
    first_name: first_name,
    family_name: family_name,
  };
  if (d_birth != false) directordetail.date_of_birth = d_birth;
  if (d_death != false) directordetail.date_of_death = d_death;
  if (p_of_birth != false) directordetail.place_of_birth = p_of_birth;
  if (p_of_death != false) directordetail.place_of_death = p_of_death;
  if (birth_name != false) directordetail.birth_name = birth_name;
  if (nickname != false) directordetail.nickname = nickname;

  var director = new Director(directordetail);

  director.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Director: ' + director);
    directors.push(director);
    cb(null, director);
  });
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });

  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre);
    cb(null, genre);
  });
}

function movieCreate(
  title,
  year,
  duration,
  synopsis,
  imdb,
  director,
  genre,
  cb
) {
  moviedetail = {
    title: title,
    year: year,
    duration: duration,
    synopsis: synopsis,
    director: director,
    imdb: imdb,
  };
  if (genre != false) moviedetail.genre = genre;

  var movie = new Movie(moviedetail);
  movie.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Movie: ' + movie);
    movies.push(movie);
    cb(null, movie);
  });
}

function createGenreDirectors(cb) {
  async.series(
    [
      function (callback) {
        directorCreate(
          'Andy',
          'Serkis',
          'Ruislip, London, England, UK',
          false,
          'Andrew Clement G. Serkis',
          'Gollum',
          '1964-04-20',
          false,
          callback
        );
      },
      function (callback) {
        directorCreate(
          'Alfred',
          'Hitchcock',
          'Leytonstone, London, England, UK',
          'Bel Air, Los Angeles, California, USA',
          'Alfred Joseph Hitchcock',
          'Hitch \nThe Master of Suspense',
          '1899-08-13',
          '1980-04-29',
          callback
        );
      },
      function (callback) {
        directorCreate(
          'Ingmar',
          'Bergman',
          'Uppsala, Uppsala län, Sweden',
          'Fårö, Gotlands län, Sweden',
          'Ernst Ingmar Bergman',
          false,
          '1918-07-14',
          '2007-07-30',
          callback
        );
      },
      function (callback) {
        directorCreate(
          'Steven',
          'Spielberg',
          'Cincinnati, Ohio, USA',
          false,
          'Steven Allan Spielberg',
          false,
          '1946-12-18',
          false,
          callback
        );
      },
      function (callback) {
        directorCreate(
          'Stanley',
          'Kubrick',
          'New York City, New York, USA',
          'Harpenden, Hertfordshire, England, UK',
          false,
          'SK',
          '1928-07-26',
          '1999-03-07',
          callback
        );
      },
      function (callback) {
        genreCreate('Action', callback);
      },
      function (callback) {
        genreCreate('Adventure', callback);
      },
      function (callback) {
        genreCreate('Biography', callback);
      },
      function (callback) {
        genreCreate('Crime', callback);
      },
      function (callback) {
        genreCreate('Drama', callback);
      },
      function (callback) {
        genreCreate('Horror', callback);
      },
      function (callback) {
        genreCreate('Mystery', callback);
      },
      function (callback) {
        genreCreate('Romance', callback);
      },
      function (callback) {
        genreCreate('Sci-Fi', callback);
      },
      function (callback) {
        genreCreate('Thriller', callback);
      },
      function (callback) {
        genreCreate('War', callback);
      },
    ],
    // optional callback
    cb
  );
}

function createMovies(cb) {
  async.parallel(
    [
      function (callback) {
        movieCreate(
          'Breathe',
          '2017',
          '1h58min',
          'The inspiring true love story of Robin (Andrew Garfield) and Diana Cavendish (Claire Foy), an adventurous couple who refuse to give up in the face of a devastating disease. Their heartwarming celebration of human possibility marks the directorial debut of Andy Serkis.',
          '7.2',
          directors[0],
          [genres[7]],
          callback
        );
      },
      function (callback) {
        movieCreate(
          'Psycho',
          '1960',
          '1h49min',
          "A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother.",
          '8.5',
          directors[1],
          [genres[5]],
          callback
        );
      },
      function (callback) {
        movieCreate(
          'Vertigo',
          '1958',
          '2h8min',
          'A former police detective juggles wrestling with his personal demons and becoming obsessed with a hauntingly beautiful woman.',
          '8.3',
          directors[1],
          [genres[6]],
          callback
        );
      },
      function (callback) {
        movieCreate(
          'A Clockwork Orange',
          '1971',
          '2h16min',
          "In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn't go as planned.",
          '8.3',
          directors[4],
          [genres[4]],
          callback
        );
      },
      function (callback) {
        movieCreate(
          'Full Metal Jacket',
          '1987',
          '1h58min',
          'A pragmatic U.S. Marine observes the dehumanizing effects the Vietnam War has on his fellow recruits from their brutal boot camp training to the bloody street fighting in Hue.',
          '8.3',
          directors[4],
          [genres[10]],
          callback
        );
      },
      function (callback) {
        movieCreate(
          'Catch Me If You Can',
          '2002',
          '2h21min',
          'Barely 21 yet, Frank is a skilled forger who has passed as a doctor, lawyer and pilot. FBI agent Carl becomes obsessed with tracking down the con man, who only revels in the pursuit.',
          '8.1',
          directors[3],
          [genres[3]],
          callback
        );
      },
      function (callback) {
        movieCreate(
          'Indiana Jones and the Raiders of the Lost Ark',
          '1981',
          '1h55min',
          "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's Nazis can obtain its awesome powers.",
          '8.4',
          directors[3],
          [genres[1]],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createGenreDirectors, createMovies],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

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
  mini_bio,
  cb
) {
  directordetail = {
    first_name: first_name,
    family_name: family_name,
    mini_bio: mini_bio,
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
          "English film actor, director and author Andy Serkis is known for his performance capture roles comprising motion capture acting, animation and voice work for such computer-generated characters as Gollum in The Lord of the Rings film trilogy (2001-2003) and The Hobbit: An Unexpected Journey (2012), the eponymous King Kong in the 2005 film, Caesar in Rise of the Planet of the Apes (2011) and Dawn of the Planet of the Apes (2014), Captain Haddock / Sir Francis Haddock in Steven Spielberg's The Adventures of Tintin: The Secret of the Unicorn (2011) and Supreme Leader Snoke in Star Wars: Episode VII - The Force Awakens (2015). Serkis earned a Golden Globe Award nomination for his portrayal of serial killer Ian Brady in the British television film Longford (2006), and was nominated for a BAFTA Award for his portrayal of new wave and punk rock musician Ian Dury in the biopic Sex & Drugs & Rock & Roll (2010). In 2015, he had a small role in Avengers: Age of Ultron (2015). Serkis has his own motion capture workshop, The Imaginarium Studios in London, which he will use for his directorial debut, Mowgli: Legend of the Jungle (2018).",
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
          'Hitch, The Master of Suspense',
          '1899-08-13',
          '1980-04-29',
          'Alfred Joseph Hitchcock was born in Leytonstone, Essex, England. He was the son of Emma Jane (Whelan; 1863 - 1942) and East End greengrocer William Hitchcock (1862 - 1914). His parents were both of half English and half Irish ancestry. He had two older siblings, William Hitchcock (born 1890) and Eileen Hitchcock (born 1892). Raised as a strict Catholic and attending Saint Ignatius College, a school run by Jesuits, Hitch had very much of a regular upbringing. His first job outside of the family business was in 1915 as an estimator for the Henley Telegraph and Cable Company. His interest in movies began at around this time, frequently visiting the cinema and reading US trade journals.',
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
          "Ernst Ingmar Bergman was born July 14, 1918, the son of a priest. The film and T.V. series, The Best Intentions (1992) is biographical and shows the early marriage of his parents. The film 'Söndagsbarn' depicts a bicycle journey with his father. In the miniseries Private Confessions (1996) is the trilogy closed. Here, as in 'Den Goda Viljan' Pernilla August play his mother. Note that all three movies are not always full true biographical stories...",
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
          "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.",
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
          "Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school. Hoping that a change of scenery would produce better academic performance, Kubrick's father sent him in 1940 to Pasadena, California, to stay with his uncle, Martin Perveler. Returning to the Bronx in 1941 for his last year of grammar school, there seemed to be little change in his attitude or his results. Hoping to find something to interest his son, Jack introduced Stanley to chess, with the desired result. Kubrick took to the game passionately, and quickly became a skilled player. Chess would become an important device for Kubrick in later years, often as a tool for dealing with recalcitrant actors, but also as an artistic motif in his films.",
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
          [genres[(0, 1)]],
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

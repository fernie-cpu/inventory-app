var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  duration: { type: String, required: true },
  synopsis: { type: String, required: true },
  director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
  imdb: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: true }],
});

MovieSchema.virtual('url').get(function () {
  return '/collection/movie/' + this._id;
});

module.exports = mongoose.model('Movie', MovieSchema);

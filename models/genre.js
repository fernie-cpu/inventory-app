var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GenreSchema = new Schema({
  name: { type: String, minLength: 3, maxLength: 100, required: true },
});

GenreSchema.virtual('url').get(function () {
  return '/collection/genre/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const { DateTime } = require('luxon');

var DirectorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
  place_of_birth: String,
  place_of_death: String,
  birth_name: String,
  nickname: String,
  mini_bio: String,
});

DirectorSchema.virtual('name').get(function () {
  return this.first_name + ' ' + this.family_name;
});

DirectorSchema.virtual('birth_date').get(function () {
  let birth = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
    DateTime.DATE_MED
  );
  return birth;
});

DirectorSchema.virtual('death_date').get(function () {
  let death = DateTime.fromJSDate(this.date_of_death).toLocaleString(
    DateTime.DATE_MED
  );
  return death;
});

DirectorSchema.virtual('url').get(function () {
  return '/collection/director/' + this._id;
});

module.exports = mongoose.model('Director', DirectorSchema);

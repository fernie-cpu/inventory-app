var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DirectorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
  place_of_birth: String,
  place_of_death: String,
  birth_name: String,
  nickname: String,
});

DirectorSchema.virtual('name').get(function () {
  return this.first_name + ' ' + this.family_name;
});

DirectorSchema.virtual('lifespan').get(function () {
  return (
    this.date_of_birth.getYear() - this.date_of_death.getYear()
  ).toString();
});

DirectorSchema.virtual('url').get(function () {
  return '/director/' + this._id;
});

module.exports = mongoose.model('Director', DirectorSchema);

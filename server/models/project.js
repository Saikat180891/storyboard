const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  clientName: {type:String, required: true},
  title: {type:String, required: true},
  chargeCode: {type:String, required: true},
  due_date: {type:String, required: true},
  rCodes: String,
  logo: String
});

module.exports = mongoose.model('Project', projectSchema);
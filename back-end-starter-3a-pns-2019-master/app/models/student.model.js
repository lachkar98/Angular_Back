
const Joi = require('joi');
const BaseModel = require('../utils/base-model');

module.exports = new BaseModel('Student', {
  FirstName: Joi.string().required(),
  LastName: Joi.date().required(),
});

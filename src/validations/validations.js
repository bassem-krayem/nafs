const Joi = require('joi');

// Reusable parts to keep things DRY (Don't Repeat Yourself)
const email = Joi.string().email().lowercase().required();
const password = Joi.string().min(8).required();
const name = Joi.string().min(2).max(30).required();

const signup = Joi.object().keys({
  firstName: name,
  lastName: name,
  email: email,
  password: password,
  role: Joi.string().valid('patient', 'therapist').required(),
});

const login = Joi.object().keys({
  email: email,
  password: password,
});

const updatePassword = Joi.object().keys({
  currentPassword: password,
  password: password,
  passwordConfirm: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Passwords do not match' }),
});

const therapistProfile = Joi.object({
  specialization: Joi.string().required(),
  licenseNumber: Joi.string().required(),
  yearsOfExperience: Joi.number().min(0),
  bio: Joi.string().min(10),
  pricePerSession: Joi.number().positive(),
});

const patientProfile = Joi.object({
  dateOfBirth: Joi.date().less('now'),
  gender: Joi.string().valid('male', 'female', 'other'),
  emergencyContact: Joi.string(),
  bio: Joi.string().max(500),
});

module.exports = {
  signup,
  login,
  updatePassword,
  therapistProfile,
  patientProfile,
};

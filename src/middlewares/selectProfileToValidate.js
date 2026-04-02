const validate = require('./joiValidate');
const {
  therapistProfile,
  patientProfile,
} = require('../validations/validations');

module.exports = (req, res, next) => {
  const schema =
    req.user.role === 'therapist' ? therapistProfile : patientProfile;

  return validate(schema)(req, res, next);
};

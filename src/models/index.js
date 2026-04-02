const User = require('./userModel');
const Patient = require('./patientModel');
const Therapist = require('./therapistModel');
const sequelize = require('../config/db');

// Define Relationships
User.hasOne(Patient, { foreignKey: 'userId', as: 'patientProfile' });
Patient.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Therapist, { foreignKey: 'userId', as: 'therapistProfile' });
Therapist.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Patient,
  Therapist,
  sequelize,
};

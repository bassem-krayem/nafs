const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TherapistProfile = sequelize.define('TherapistProfile', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  yearsOfExperience: DataTypes.INTEGER,
  bio: DataTypes.TEXT,
  pricePerSession: DataTypes.DECIMAL(10, 2),
});

module.exports = TherapistProfile;

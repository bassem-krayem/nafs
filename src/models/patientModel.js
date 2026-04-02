const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PatientProfile = sequelize.define('PatientProfile', {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  dateOfBirth: DataTypes.DATEONLY,
  gender: DataTypes.ENUM('male', 'female', 'other'),
  emergencyContact: DataTypes.STRING,
  bio: DataTypes.TEXT,
});

module.exports = PatientProfile;

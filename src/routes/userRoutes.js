const express = require('express');
const validate = require('../middlewares/joiValidate');
const validations = require('../validations/validations');
const authController = require('../controllers/authController');

const router = express.Router();

// --- PUBLIC ROUTES ---
// Anyone can access these to join the platform
router.post('/signup', validate(validations.signup), authController.signup);
router.post('/login', validate(validations.login), authController.login);

// --- PROTECTED ROUTES ---
// Only logged-in users can access these (using the protect middleware)
router.use(authController.protect);

// 1. Password Management
router.patch(
  '/update-my-password',
  validate(validations.updatePassword),
  (req, res) => {
    // Logic for updating password goes here
    res.send('Password update logic goes here');
  },
);

// 2. Profile Completion (The "Next Step" for your popup)
// These routes will handle the forms for Doctors and Patients
router.post('/complete-patient-profile', (req, res) => {
  // Logic for saving PatientProfile and setting isProfileComplete = true
  res.send('Patient profile logic goes here');
});

router.post('/complete-therapist-profile', (req, res) => {
  // Logic for saving TherapistProfile and setting isProfileComplete = true
  res.send('Therapist profile logic goes here');
});

module.exports = router;

const { Patient, Therapist, User } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.completeProfile = catchAsync(async (req, res, _next) => {
  const userId = req.user.id;
  const role = req.user.role;
  let profile;

  // 1. Check which profile to create based on the Role
  if (role === 'therapist') {
    profile = await Therapist.create({
      ...req.body,
      userId: userId,
    });
  } else if (role === 'patient') {
    profile = await Patient.create({
      ...req.body,
      userId: userId,
    });
  }

  // 2. Update the main User record
  await User.update({ isProfileComplete: true }, { where: { id: userId } });

  res.status(201).json({
    status: 'success',
    message: 'Profile completed successfully!',
    data: {
      profile,
    },
  });
});

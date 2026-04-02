const express = require('express');
const path = require('path');

// calling the required functions, routes,  and assigning them to variables
const userRouter = require('./src/routes/userRoutes');
const AppError = require('./src/utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'Nafs' });
});

// Handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;

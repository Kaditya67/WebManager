var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');
var providersRouter = require('./routes/providers');

var app = express();

// CORS — allow requests from the deployed frontend URL (and localhost for dev).
// Set the ALLOWED_ORIGIN env var in production to your Vercel frontend URL,
// e.g. https://web-manager.vercel.app
var allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.ALLOWED_ORIGIN,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, Postman, same-origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/providers', providersRouter);
app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use(function (err, _req, res, _next) {
  if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(400).json({ message: err.message });
  console.error(err);
  res.status(500).json({ message: 'An unexpected server error occurred.' });
});

module.exports = app;

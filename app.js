const express = require('express'),
     mongoose = require('mongoose'),
     methodOverride = require('method-override'),
     AppError = require('./utility/appError'),
     globalErrorHandler = require('./errorController'),
     Router = require('./Router');
app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
process.on('uncaughtException', err => {
     console.log(err.name, err.message);
     console.log("Shutting down...");
     process.exit(1);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use((req, res, next) => {
     req.requestTime = new Date().toISOString();
     next();
});

// Database connection
const DB = `mongodb://localhost:27017/CRUD-ExpressJS`;
mongoose.connect(DB, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false
}).then(() => {
     console.log('Connected to DB!');
})

// Router
app.use('/', Router);

app.all('*', (req, res, next) => {
     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const server = app.listen(3000, () => {
     console.log("Server start...");
});

process.on('unhandledRejection', err => {
     console.log(err.name, err.message);
     console.log("Shutting down...");
     server.close(() => {
          process.exit(1);
     })
});
const express = require('express'),
     mongoose = require('mongoose'),
     Router = require('./Router');
app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
const DB = `mongodb://localhost:27017/CRUD-ExpressJS`;
mongoose.connect(DB, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
}).then(() => {
     console.log('Connected to DB!');
}).catch(err => {
     console.log('DB ERROR:', err.message);
});

// Router
app.use('/', Router);

app.listen(3000, () => {
     console.log("Server start...");
})
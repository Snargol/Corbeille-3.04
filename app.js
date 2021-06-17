const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const app = express();
const {checkRequestRight} = require('./services/auth.ts')

const usersRouter =require('./routes/users');
const communesRouter =require('./routes/communes');
const restaurantsRouter =require('./routes/restaurants');
const secureRouter = require('./routes/secure');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/communes', communesRouter);

app.use('/restaurants', function (req, res, next) {
    checkRequestRight(req, res, next, app);
});
app.use('/restaurants', restaurantsRouter);

app.use('/secure', function (req, res, next) {
    checkRequestRight(req, res, next, app);
});
app.use('/secure', secureRouter);

const uri = 'mongodb+srv://user1:user1@cluster0.ak193.mongodb.net/myFirstDatabase?retryWrites=true/A4L2/';
mongoose.connect(uri,
    { useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'A4L2'
    })
    .then(() => console.log('Connexion à MongoDB  Commune réussie !'))
    .catch(() => console.log('Connexion à MongoDB Commune échouée !'));

mongoose.connection.on('connected', function() {
    console.log("database is ready now");
});
mongoose.connection.on('disconnected', function() {
    console.log("database is disconnected");
});


/* GET home page. */
app.get('/', function(req, res, next) {
    res.send('Bienvenu sur cette api de corbeille.');
    res.sendStatus(200)
});

module.exports = app;

// const credentials = require('fs').readFileSync('{moncertificat.pem}');
// mongoose.connect('mongodb+srv://cluster0.tosfb.mongodb.net/A4L', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     ssl: true,
//     poolSize: 10, // Maintain up to 10 socket connections
//     sslKey: credentials,
//     sslCert: credentials,
//     authMechanism: 'MONGODB-X509',
//     authSource: '$external'
// })
//     .then(() => console.log('Connexion à MongoDB Certificat A4L réussie !'))
//     .catch(() => console.log('Connexion à MongoDB Certificate A4L échouée !'));

// app.use(express.json());

// app.use((req, res, next) => {
//     console.log('Réception d\'une requête');
//     next();
// });

// app.use((req, res, next) => {
//     res.status(201);
//     next();
// });

app.use((req, res, next) => {
    checkRequestRight(req, res, next, app);
    // next();
});

// app.use((req, res, next) => {
//     console.log('Réponse envoyée avec succès !');
// });

const express = require('express');
const helmet = require('helmet');
const { config, engine } = require('express-edge');
const connectMongo = require('connect-mongo');
const edge = require('edge.js');
const homePage = require('./controllers/homePage');
const contactController = require('./controllers/contactController');
const districtController = require('./controllers/districtController');
const galleryController = require('./controllers/galleryController');
const membersController = require('./controllers/membersController');
const stateController = require('./controllers/stateController');
const dashboardCont = require('./controllers/dashboard');
const loginCont = require('./controllers/login');
const loginUserCont = require('./controllers/loginUser');
const storeUserCont = require('./controllers/storeUser');
const createUserCont = require('./controllers/createUser');
const expressSession = require('express-session');
const storeNotificationCont = require('./controllers/storeNotification');
const notificationInfoCont = require('./controllers/notificationInfo');
const fileUpload = require('express-fileupload');
const uploadImageCont = require('./controllers/uploadImage');
const certificateCont = require('./controllers/certificate');
const addCertificateCont = require('./controllers/addCertificate');
const deleteNotificationCont = require('./controllers/deleteNotification')

var PORT = process.env.PORT || 3000;


const BodyParser = require('body-parser');
const auth = require('./middelware/auth');
const notificationPostCont = require('./controllers/notificationPost');
const mongo = require('mongoose');
const bcrypt = require('bcryptjs');
const logoutCont = require('./controllers/logout');
const redirectIfAuth = require('./middelware/redirectIfAuth');
const app = new express();
const connectFlash = require("connect-flash");
mongo.set('useFindAndModify', false);
mongo.set('useUnifiedTopology', true);
mongo.set('useCreateIndex', true);


mongo.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const mongoStore = connectMongo(expressSession);
mongo.connection.on('connected', () => {
	console.log('Mongoose is Connected!!')
});

app.use(helmet());
app.use(fileUpload());
app.use(connectFlash());

app.use(expressSession({
	secret: process.env.SESSION,
	store: new mongoStore({
		mongooseConnection: mongo.connection
	}),
	resave: true,
	saveUninitialized: true
}));

app.use(express.static('public'));
app.use(engine);
app.set('views', `${__dirname}/views`);
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use('*', (req, res, next) => {
	edge.global('auth', req.session.userId)
	next()
});

app.get('/', homePage);
app.get('/contact', contactController);
app.get('/district', districtController);
app.get('/gallery', galleryController);
app.get('/StateMembers', stateController);
app.get('/members', membersController);
app.get('/auth/register', redirectIfAuth, createUserCont);
app.post('/users/register', redirectIfAuth, storeUserCont);
app.get('/dashboard', auth, dashboardCont);
app.get('/auth/user', redirectIfAuth, loginCont);
app.post('/users/login', redirectIfAuth, loginUserCont);
app.get('/auth/logout', auth, logoutCont);
app.get('/create/new', auth, notificationPostCont);
app.post('/notification/store', auth, storeNotificationCont);
app.use('/notification/:id', notificationInfoCont);
app.post('/image/new', auth, uploadImageCont);
app.use('/certificate/folder', auth, certificateCont);
app.post('/certificate/new', auth, addCertificateCont);
app.get('/delete/notification/:id', deleteNotificationCont);

app.use((req, res) => {
	res.render('NotFound')
});


app.listen(PORT, console.log(`App is listening on ${PORT}`));
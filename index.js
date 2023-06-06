const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//Used For Session Cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
//const sassMiddleware = require('node-sass');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


// const chatServer = require('http').Server(app);
// const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
// chatServer.listen(3000);
// console.log('Chat Server Running at Port 3000');

const chatSockets = require('./config/chat_sockets').chatSockets;
const chatServer = http.createServer(app);
chatSockets(chatServer);
chatServer.listen(9000, () => {
  console.log(`Chat Server Running at Port ${9000}`);
});

// app.use(sassMiddleware({
//     src: '/assets/scss',
//     dest: '/assets/css',
//     debug: true,
//     outputStyle:'extended',
//     prefix: '/css',
// }));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
//Make the Uploads Path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
//Extracts styles and Script from subpages to Layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setup a View Engine

app.set('view engine', 'ejs');
app.set('views', './views');

//Mongo store is used to store session cookie
app.use(session({
    name: 'major-project',
    //To do CHANGE the secret befor deploymeny in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000* 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled',
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//Use Express Router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the Server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});
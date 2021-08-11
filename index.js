const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const configDB = require('./config/database');
require('./app/routes')(app, passport);
require('./config/passport')(passport);

require('./app/models/user');
mongoose.connect(configDB.uri);
app.use(cookieParser());
app.use(bodyParser());

app.use(passport.initialize());
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.session());

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

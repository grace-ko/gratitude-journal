const Entry = require('./models/entry');
const timestamp = require('time-stamp');
const todaysDate = timestamp('YYYY-MM-DD');
const CalendarDates = require("calendar-dates");
const calendarDates = new CalendarDates();

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });
  app.get('/signup', (req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });
  app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });
  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs', {
      user: req.user,
      calendarDates: mainAsync()
    });
  });

  //auth
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
  }));
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
  }));
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  //blog posts
  app.post('/profile', (req, res) => {
    Entry.create({
      content: req.body.entry,
      userid: req.user._id,
      created: todaysDate
    }, (err, entry) => {
      res.redirect('/profile');
    });
  });
}


  const log = console.log;
  const may2018 = new Date(2018, 4);

  mainAsync = async () => {
    const mayDates = await calendarDates.getDates(may2018);
    const mayMatrix = await calendarDates.getMatrix(may2018);
    log(`May, 2018 Dates`, mayDates);
    log(`May, 2018 Matrix`, mayMatrix);
  };


const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
  	return next();
  res.redirect('/');
}

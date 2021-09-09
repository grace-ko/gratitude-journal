const Entry = require('./models/entry');
const year = new Date().getFullYear();
const month = new Date().getMonth();
const date = new Date().getDate();

const todaysDate = `${year}-${month}-${date}`;
console.log(todaysDate);
//const test = require('../public/js/calendar');

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

  app.get('/profile', isLoggedIn, function(req, res) {
    Entry.find({userid:req.user._id, created: todaysDate},function(err, entries){
      res.render('profile.ejs', {
        //mainDate: dateFormat(now, "dddd, mmmm dS, yyyy"),
        todaysDate: todaysDate,
        requestedDate: todaysDate,
        user : req.user,
        entries: entries
      });
    });
  });

  app.delete('/entry/:id', isLoggedIn, (req,res) => {
    Entry.findOneAndRemove({_id:req.params.id}, function(err,data){
        res.send({});
      });
  });
}

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
  	return next();
  res.redirect('/');
}

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });
  app.get('/signup', (req, res) => {
    res.render('signup.ejs');
  });
  app.get('/login', (req, res) => {
    res.render('login.ejs');
  });
  app.get('/profile', (req, res) => {
    res.render('profile.ejs');
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
  }));
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true 
  }));
}

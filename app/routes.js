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

}

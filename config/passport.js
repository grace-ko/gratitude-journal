const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

//signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    (req, email, password, done) => {
      process.nextTick(() => {
        User.findOne({ 'local.email': email }, (err, user) => {
          if (err)
            return done(err);
          if (user) {
            return done(null, false);
          } else {
            const newUser = new User();
            console.log(newUser);
            newUser.local.email = 'kariskalon@gmail.com';
            newUser.local.password = '12345'//newUser.generateHash(password);
            newUser.save(err => {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    ))
}

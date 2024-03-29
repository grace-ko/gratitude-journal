const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

//sign up
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true },
    (req, email, password, done) => {
      process.nextTick(() => {
        User.findOne({'local.email': email}, (err, existingUser) => {
          if (err)
            return done(err);
          if (existingUser)
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          if(req.user) {
            const user = req.user;
            user.local.email = email;
            user.local.password = user.generateHash(password);
            user.save(err => {
              if (err)
                throw err;
              return done(null, user);
            });
          }
          else {
            const newUser = new User();
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.save(err => {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
      });
    });
  }));

//login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true},
    (req, email, password, done) => {
      process.nextTick(() => {
        User.findOne({ 'local.email' :  email }, (err, user) => {
          if (err)
            return done(err);
          if (!user)
            return done(null, false, req.flash('loginMessage', 'No user found.'));
          if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
          else
            return done(null, user);
      });
    });
  }));
};

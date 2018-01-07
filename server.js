const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const KakaoStrategy = require('passport-kakao');
//const LineStrategy = require('passport-line');
const bcrypt = require('bcryptjs');
const { WebUser } = require('./sequelize/models');
const PORT = process.env.PORT || 3000;
const api = require('./backend/routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html'); // For React/Redux
});

app.use(session({
    secret: process.env.SECRET,
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    //FIGURE OUT A WAY TO HANDLE BOTH KAKAO AND LOCAL USERS
    WebUser.findOne({where: {id: id}})
    .then(user => done(null, user.dataValues))
    .catch((err) => {throw new Error(err);});
});

passport.use(new LocalStrategy((username, password, done) => {
    WebUser.findOne({where: {username: username}})
      .then( (user) => {
          if(user) {
              bcrypt.compare(password, user.dataValues.password, (err, res) => {
                  if (res) {
                      return done(null, user.dataValues);
                  }
                  return done(null, false);
              });
          } else {
              return done(null, false);
          }
      })
      .catch((err) => {return done(err);});
}));

//ADD KAKAO STRATEGY

app.use(passport.initialize());
app.use(passport.session());


app.use('/api', api);

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});

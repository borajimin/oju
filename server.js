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
const { User } = require('./sequelize/models');
const PORT = process.env.PORT || 3000;
const oauth = require('./backend/oauth');
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
    User.findOne({where: {id: id}})
    .then(user => done(null, user.dataValues))
    .catch((err) => {throw new Error(err);});
});

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({where: {username: username}})
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
passport.use(new KakaoStrategy({
        clientID: process.env.KakaoClientID,
        clientSecret: process.env.KakaoClientSecret,
        callbackURL: process.env.KakaoCallbackURL
    }, function(accessToken, refreshToken, profile, done){
        User.findOrCreate({
            where: {
                id: profile.id,
                username: profile.username,
                bPictureUrl: profile._json.properties.profile_image,
                sPictureUrl: profile._json.properties.thumbnail_image
            }
        }).spread((user, created) => {
            console.log("User and created", user, created);
            if(created){
                return done(null, user);
            }
            return done(null, user);
        }).catch(e => {
            return done(e);
        })
        // const username = new Promise((resolve, reject) => {
        //     bcrypt.hash(profile.username, parseInt(process.env.SALT), (err, hash) => {
        //         if(err) {
        //             console.log("username", err, hash);
        //             reject();
        //         }
        //         resolve(hash);
        //     });
        // });
        // const bPictureUrl = new Promise((resolve, reject) => {
        //     bcrypt.hash(profile._json.properties.profile_image, parseInt(process.env.SALT), (err, hash) => {
        //         if(err) {
        //             console.log("big picture", err, hash);
        //             reject();
        //         }
        //         resolve(hash);
        //     });
        // });
        // const sPictureUrl = new Promise((resolve, reject) => {
        //     bcrypt.hash(profile._json.properties.thumbnail_image, parseInt(process.env.SALT), (err, hash) => {
        //         if(err) {
        //             console.log("small picture", err, hash);
        //             reject();
        //         }
        //         resolve(hash);
        //     });
        // });
        //
        // Promise.all([username, bPictureUrl, sPictureUrl])
        // .then(userInfo => {
        //     User.findOrCreate({
        //         where: {
        //             'kakao' : profile.id,
        //             'username': userInfo[0],
        //             'bPictureUrl': userInfo[1],
        //             'sPictureUrl': userInfo[2]
        //         }
        //     })
        //     .then((user) => {
        //         console.log(user);
        //         if(user[1]){
        //             bcrypt.compare(profile.id, user[0].dataValues.kakao, (err, res) => {
        //                 if(res) {
        //                     return done(null, user[0].dataValues);
        //                 }
        //                 return done(null, false);
        //             });
        //         } else {
        //             return done(null, user[0].dataValues);
        //         }
        //     })
        //     .catch(err => {
        //         return done(err);
        //     });
        // })
        // .catch(e => {
        //     console.log("Promise all failed.");
        // });
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/oauth', oauth(passport));
app.use('/api', api);

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});

const express = require('express');
const router = express.Router();
const { Member } = require('../sequelize/models');
const bcrypt = require('bcryptjs');
let hashedPassword;

module.exports = passport => {
    // SAMPLE ROUTE
    router.get('/users', (req, res) => {
        res.json({ success: true });
    });

    router.get('/kakao', passport.authenticate('kakao', {
        failureRedirect: '/'
    }));

    router.get('/callback/kakao',
          passport.authenticate('kakao'),
          (req, res) => {
            res.send("successfully loggedIn");
          }
    );

    router.post('/register', (req, res) => {
        Member.findAll({where: {username: req.body.username}})
        .then(members => {
            if(req.body.password === req.body.repeatPassword && !members[0]) {
                bcrypt.hash(req.body.password, process.env.SALT, (err, hash) => {
                    hashedPassword = hash;
                    Member.create({
                        username: req.body.username,
                        password: hashedPassword
                    })
                      .then(() => {
                          res.json({success: true});
                      });
                });
            } else {
                res.json({success: false});
            }
        })
      .catch((err)=>console.log(err));
    });

    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            console.log('HERE');
            user ? req.login(user, error => {
                if(err) {return next(error);}
                return res.json({success: true, user: req.user});
            }) : res.json({success: false});
        })(req, res, next);
    });

    router.use((req, res, next) => {
        console.log(req.user, "Middleware req.user is this");
        if (!req.user) {
            res.status(401).json({success: 'failed'});
        } else {
            next();
        }
    });

    return router;
};

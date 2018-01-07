const express = require('express');
const router = express.Router();
const { WebUser } = require('../sequelize/models');
const bcrypt = require('bcryptjs');
let hashedPassword;

module.exports = passport => {
    // SAMPLE ROUTE
    router.use('/users', (req, res) => {
        res.json({ success: true });
    });

    router.post('/register', (req, res) => {
        WebUser.findAll({where: {username: req.body.username}})
        .then(users => {
            if(req.body.password === req.body.repeatPassword && !users[0]) {
                bcrypt.hash(req.body.password, process.env.SALT, (err, hash) => {
                    hashedPassword = hash;
                    WebUser.create({
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
        console.log(req.user, "MIddleware req.user is this");
        if (!req.user) {
            res.status(401).json({success: 'failed'});
        } else {
            next();
        }
    });

    router.get('/logout', (req, res) => {
        req.logout();
        res.status(200).json({success: true});
    });

    return router;
};

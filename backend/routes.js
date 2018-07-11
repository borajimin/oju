const express = require('express');
const router = express.Router();
const { Member } = require('../sequelize/models');
const bcrypt = require('bcryptjs');
let hashedPassword;

module.exports = () => {

    router.use((req, res, next) => {
        console.log(req.user, "Middleware req.user is this");
        if (!req.user) {
            res.status(401).json({success: 'failed'});
        } else {
            next();
        }
    });
    //get route to show the dashboard
    router.get("/dashboard", (req, res) => {
        res.json(req.user);
    });
    //get route to show pictures.

    //post route to resize & post pictures.

    //get route to prompt 공동체 auth page

    //post route to auth 공동체 members

    router.use('/users', (req, res) => {
        res.send(req.user);
    });

    router.get('/logout', (req, res) => {
        req.logout();
        res.status(200).json({success: true});
    });

    return router;
};

require('dotenv').config()
var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const user = require("../models/user");
const validation = require("express-validator");
const async = require("async");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JWTStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const check = validation.body;
const validateResult = validation.validationResult;

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
}, (jwtPayload, cb) => {

    return cb(null, jwtPayload);
}));


router.post("/signup", [
    check('fullname', 'Name Required').trim().isLength({ min: 2 }).escape(),
    check('mobile', 'Phone No  Required').trim().isMobilePhone().escape(),
    check('password', 'Password  Required').trim().isLength({ min: 6 }).withMessage("Minimum Password Length is 6").escape(),
    (req, res, next) => {
        const errors = validateResult(req);

        if (!errors.isEmpty()) {
            res.status(400).send(errors);
            return;
        } else {
            user.findOne({ mobile: req.body.mobile }).exec().then(function (doc) {
                if (doc) {
                    return res.status(400).json({ message: 'Mobile number already exists' });
                }
                const obj = new user({
                    name: req.body.fullname,
                    mobile: req.body.mobile,
                    password: req.body.password
                });
                obj.save().then(function () {
                    res.status(200).json({ message: 'User registered' });
                }).catch(function (err) {
                    res.status(500).json({ message: err.message });
                });
                // continue with the rest of your code
            }).catch(function (err) {
                return next(err);
            })
        }

    }

]);



router.post("/signin", [
    check('mobile', 'Mobile No Required').trim().escape(),
    check('password', 'Password  Required').trim().escape(),
    async (req, res, next) => {

        const err = validateResult(req);
        if (!err.isEmpty()) {
            res.status(400).send(err);
            return;
        }
        const u = await user.findOne({ mobile: req.body.mobile });
        if (u == null) {
            res.status(409).json({ message: "Credential Invalid" });
            return
        } else {
            let hash = await bcrypt.compare(req.body.password, u.password);
            if (hash) {
                // user verified
                const payload = {
                    sub: u.id,
                    iat: Date.now()
                }
                const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2h", });
                // res.setHeader("Set-Cookie",cookie.serialize('access-token',token,{
                //     // httpOnly:true // disable for testing
                //     sameSite:'strict',
                //     maxAge:180000
                // })) //vulnulrable 
                return res.status(200).send({
                    message: "Successfully Login",
                    user: u.username,
                    token
                })

            } else {
                res.status(409).json({ message: "Credential Invalid" });
                return;
            }
        }



    }
])



router.get("/protected", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const account = await user.findById(req.user.sub).select(["-password"])
    res.json(account);
});


module.exports = router;
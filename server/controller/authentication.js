const jwt = require('jwt-simple');

const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
    //sub is subject
    //iat is issued at time
    //sub and iat are issued by jwt
}

exports.signin = function (req, res, next) {
    //user has already had their email and password authenticated
    //we just need to give them a token
    res.send({ token: tokenForUser(req.user) })
}

exports.signup = function (req, res, next) {
    //console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    //res.send({ success: true })
    if (!email || !password){
        return res.status(422).send({ error: "You must provide email and password "});
    }

    //see if a user with given email exits
    User.findOne({ email: email }, function (err, existingUser) {
        if (err){
            return next(err);
        }

        //if a user with email does exist, return a error
        if (existingUser){
            return res.status(422).send({ error: 'Email in use' });
        }

        //if a user with email does not exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });
        user.save(function (err) {
            if (err){ return next(err); }

            //respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        });//saving in db
    });
};

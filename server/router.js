const Authentication = require('./controller/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    // app.get('/', function (req, res, next) {
    //     res.send(['water', 'fire', 'earth']);
    // });
    app.get('/', requireAuth, function (req, res) {
        res.send({ message: 'secret code is ABC123' });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}

// First we call the model using the above code.
// We pass in the token from the request header and see if we can get the
// User or not, if not then we return a 401 and if it works we pass next()
var config = require('./config');
var jwt = require('jsonwebtoken');

module.exports.verify = (req, res, next) => {
    var bearer = req.headers['authorization'];
    if (typeof bearer !== 'undefined') {
        console.log('Token Found');
        const b = bearer.split(' ');

        const bearerToken = bearer[1];

        console.log('bearer token is', bearerToken);

        req.token = bearerToken;
        next();

    } else {
        console.log('Token not found');
        return res.status(401).send();
    }


};

module.exports.generateToken = function (user, callback) {
console.log(user);
return new Promise(function (resolve, reject) {
    try {
        var token = jwt.sign({
            data: user
        }, config.tokenKey.value, {
            expiresIn: '10 days'
        });
        resolve(token);
    } catch (err) {
        reject(err);
    }
});


// console.log(token);
};


module.exports.isAuthenticated = function (req, res, next) {
    let token = req.get('session_token');
    jwt.verify(token, constants.JWT_SECRET_TOKEN, function (err, decoded) {
        if (err) {
            res.json({
                status: 0,
                status_message: "INVALID_SESSION_TOKEN"
            });
            return false;
        }
        let obj = {
            user_id: decoded.user_id,
        }
        res.locals.user = obj;
        next();
    });
}
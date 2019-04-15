var config = require('./config');
var jwt = require('jsonwebtoken');

module.exports.verify = (req, res, next) => {
    var bearer = req.headers['authorization'];
    if (typeof bearer !== 'undefined') {
        console.log('Token Found');
        // const b = bearer.split(' ');

        // const bearerToken = b[1];

        console.log('bearer token is', bearer);

        req.token = bearer;
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


};


module.exports.isAuthenticated = function (req) {
    var token = req.headers.session_key;
    console.log('is authenticated token value is', token);
    return new Promise(function (resolve, reject) {

        try {
            jwt.verify(token, config.tokenKey.value, function (err, decoded) {
                if (err) {
                    reject(err);
                } else {
                    console.log('Decode is', decoded);
                    req.info = decoded.data;
                    resolve();
                }
            });
        } catch (error) {
            reject(error);

        }
    });
}
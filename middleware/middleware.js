// First we call the model using the above code.
// We pass in the token from the request header and see if we can get the
// User or not, if not then we return a 401 and if it works we pass next()
var config = require('../config');
var hash = require('object-hash');

var middleware = (req, res, next) => {
    var headervalue = config.header.value;
    var reqHeadervalue = req.headers.secret;
    console.log('Header value key is', headervalue);
    console.log('Request Header value key is', req.headers.value);

    console.log('Request body is',req.body);
    console.log('Request url is',req.originalUrl);

    var data = {
        key: headervalue,
        params: req.body,
        url: req.originalUrl
    };
    hashvalue = hash.MD5(data)
    console.log('Hash is', hashvalue);

    if (reqHeadervalue == hashvalue) {
        console.log('Inside MiddleWare, Found The key!');
        next();

    } else if (typeof reqHeadervalue == 'undefined') {
        return res.send(
            JSON.stringify({
                status: 0,
                message: 'Secret key not found'
            })
        );
    } else {
        console.log('Inside MiddleWare, couldn\'t find the key!');

        return res.send(
            JSON.stringify({
                status: 0,
                message: 'secret key does not match'
            })
        );
    }



};

module.exports = {
    middleware
};
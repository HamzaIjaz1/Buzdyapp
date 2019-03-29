// First we call the model using the above code.
// We pass in the token from the request header and see if we can get the
// User or not, if not then we return a 401 and if it works we pass next()
var config = require('../config');
var hash = require('object-hash');

var middleware = (req, res, next) => {
    var headervalue = config.header.value;
    var reqHeadervalue = req.headers.value;
    console.log('Header value key is', headervalue);
    console.log('Request Header value key is', req.headers.value);


    var data = {
        key: headervalue,
        params: req.body
    };
    console.log('Hash is', hash.MD5(data));

    if (reqHeadervalue == headervalue) {
        console.log('Inside MiddleWare, Found The key!');
        next();

    } else if (typeof reqHeadervalue == 'undefined') {
        res.send({
            status: 0,
            message: 'Api key not found'
        });
    } else {
        console.log('Inside MiddleWare, couldn\'t find the key!');
        res.send({
            status: 0,
            message: 'Api key does not match'
        });
    }



};

module.exports = {
    middleware
};
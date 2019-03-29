var authHelper = require('../authHelper');


var auth = (req, res, next) => {
    authHelper.isAuthenticated(req).then(
        function () {
            console.log('Successfull token auth');
            next();
        },

        function (error) {
            console.log('auth FAILED', error);
            res.send(
                JSON.stringify({
                    status: 0,
                    message: 'Invalid Authentication Token',
                })
            );
        }
    )
};

module.exports = {
    auth
};
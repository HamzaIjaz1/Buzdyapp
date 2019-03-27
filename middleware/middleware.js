// First we call the model using the above code.
// We pass in the token from the request header and see if we can get the
// User or not, if not then we return a 401 and if it works we pass next()
var config = require ('../config');

var middleware = (req,res,next)=>{
    var headervalue = config.header.value;   
    console.log('Header value key is', headervalue);
    console.log('Request Header value key is', req.headers.value);

if (req.headers.value == headervalue){
    console.log('Inside MiddleWare, Found The key!');
    next();

}else{
    console.log('Inside MiddleWare, couldn\'t find the key!');
        return res.status(401).send();
}
    
 

};

module.exports = {middleware};

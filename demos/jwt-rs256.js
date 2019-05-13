
var jwt = require('jsonwebtoken');
var fs = require('fs');


var privateKey = fs.readFileSync('./demos/private.key');

var payload = {
  name: 'Alice'
};

// expiration is given in seconds
var token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: 120,
    subject: "1"
});


console.log('RSA 256 JWT', token);







var jwt = require('jsonwebtoken');


// verify an existing JWT
// var existingToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE1MDI4ODkxOTF9._tPQtlZz2GhXHXATn5W09K4XCG0Z5LyEQqikJf3qXF8';
var existingToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE1NTc2OTA3MjR9.FtwKVhlGdBKRgFwyqDdt2xfaddG6hjdcT35IkmQ2JLs';


var secretKey = 'secret-key';



const verify = jwt.verify(existingToken, secretKey);


console.log("Decoded JWT:", verify);








var crypto = require('argon2');

var password = 'monkey';

async function createHash() {
  try {
// we will use another hash other SHA-256 during the course, this is just for demo purposes
    var hash = await crypto.hash(password).then(passwordDigest => {
      console.log("The result of hashing " + password + " is:\n\n" + passwordDigest + "\n\n");
    }).catch(reason => console.error("Error generating password hash: " + reason))

  } catch (e) {

  }
}

createHash();

// You should see in the console 000c285457fc971f862a79b786476c78812c8897063c6fa9c045f579a3b2d63f

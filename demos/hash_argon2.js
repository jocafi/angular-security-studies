

var crypto = require('argon2');

var password = 'monkey';

async function createHash() {
  try {
    var hash = await crypto.hash(password).then(passwordDigest => {
      console.log("The result of hashing " + password + " is:\n\n" + passwordDigest + "\n\n");
    }).catch(reason => console.error("Error generating password hash: " + reason))

  } catch (e) {

  }
}

createHash();

// You should see in the console $argon2i$v=19$m=4096,t=3,p=1$dO1S8Mv2FpjU18qBu3BnGQ$BovV2AkIQahrBTePHS2HVT9Ua8U8A/MHJvAhx+Gl1IM

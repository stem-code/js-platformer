const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = "924571599288-a8jgnkghenkmcpjkh5hhn3sbetmra0k3.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

exports.verify = async function(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}
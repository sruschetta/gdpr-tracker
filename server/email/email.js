const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.compose'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

let subject = '';
let body = '';
let to = '';


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


function makeBody(to, subject, message, filename) {
  var boundary = 'gc0p4Jq0M2Yt08jU534c0p';
  var nl = '\n';
  var attach = new Buffer(fs.readFileSync(require('path').resolve(__dirname, '../upload/' + filename ))) .toString('base64');
  var str = [
        "MIME-Version: 1.0",
        "Content-Transfer-Encoding: 7bit",
        "to: " + to,
        "subject: " + subject,
        "Content-Type: multipart/alternate; boundary=" + boundary + nl,
        "--" + boundary,
        "Content-Type: text/html; charset=UTF-8",
        "Content-Transfer-Encoding: 7bit" + nl,
        message+ nl,
        "--" + boundary,
        "--" + boundary,
        "Content-Type: Application/pdf; name=" + filename,
        "Content-Disposition: attachment; filename=" + filename,
        "Content-Transfer-Encoding: base64" + nl,
        attach,
        "--" + boundary + "--"

    ].join("\n");

    var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    return encodedMail;
}


function sendMessage(auth) {
    var gmail = google.gmail('v1');
    var raw = makeBody(to, subject, body, 'caleffi-privacy.pdf');
    gmail.users.messages.send({
        auth: auth,
        userId: 'me',
        resource: {
            raw: raw
        }
    }, function(err, response) {});
}


module.exports = function sendEmail(_to, _subject, _body){

  to = _to;
  subject = _subject;
  body = _body;

  fs.readFile(require('path').resolve(__dirname, 'credentials.json'), (err, content) => {
    if (err)
      return console.log('Error loading client secret file:', err);

    authorize(JSON.parse(content), sendMessage);
  });
}

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

const REQUIRE_AUTH = true;
const AUTH_TOKEN = 'an-example-token';

app.get('/', function (req, res) {
  res.send('Use the /webhook endpoint.')
})
app.get('/webhook', function (req, res) {
  res.send('You must POST your request')
})

app.post('/webhook', function (req, res) {
  // we expect to receive JSON data from api.ai here.
  // the payload is stored on req.body
  console.log(req.body)

  // we have a simple authentication
  if (REQUIRE_AUTH) {
    if (req.headers['auth-token'] !== AUTH_TOKEN) {
      return res.status(401).send('Unauthorized')
    }
  }

  // and some validation too
  if (!req.body || !req.body.result || !req.body.result.parameters) {
    return res.status(400).send('Bad Request')
  }

  // the value of Action from api.ai is stored in req.body.result.action
  console.log('* Received action -- %s', req.body.result.action);

  // parameters are stored in req.body.result.parameters
  var userName = req.body.result.parameters['given-name'];
  
                                  var http = require('http');
                                var options = {
                                  host: 'dweet.io',
                                  path: '/get/latest/dweet/for/braamwatts'
                                };
                                callback = function(response) {
                                  var str = '';
                                  response.on('data', function (chunk) {
                                  str += chunk;
                                  });
                                  response.on('end', function () {

                                var myJSON = JSON.parse(str);
                                // console.log(myJSON);
                                  var tweedeobj = myJSON["with"];
                                  //console.log(tweedeobj[0]["content"]["totalkrag"]);
                                  speech = tweedeobj[0]["content"]["totalkrag"].toString();
                                console.log(speech);
                                });
                                }
                                http.request(options, callback).end();
  var webhookReply = "Hey Braam, a few moments ago your power consumption was " + speech + "Watts" ;
  
  // var webhookReply = 'Hello ' + userName + '! Welcome from the webhook.';
  
  
  
  // override
  // var webhookReply = "hello van die onderwereld";
  
  // the most basic response
  res.status(200).json({
    source: 'webhook',
    speech: webhookReply,
    displayText: webhookReply
  })
})

app.listen(app.get('port'), function () {
  console.log('* Webhook service is listening on port:' + app.get('port'))
})

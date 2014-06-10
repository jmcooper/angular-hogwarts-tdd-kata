var express = require("express"),
    app = express(),
    bodyParser = require('body-parser')
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 4567;

app.get('/test', function (req, res) {
  res.redirect('/test/HogwartsTests.html');
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/'));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

app.listen(port, function(err) {
  console.log('Server listening on %d', port);
  console.log('The app is at http://localhost:%d/app', port);
  console.log('The test runner is at http://localhost:%d/test', port);
});

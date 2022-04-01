
//ASI ESTABA ORIGINALMENTE

const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/proyecto-tomas-ruiz-diaz-argentino'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/proyecto-tomas-ruiz-diaz-argentino/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5000);

/*function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

const express = require('express');
const app = express();

app.use(requireHTTPS);
app.use(express.static('./dist/proyecto-tomas-ruiz-diaz-argentino'));          

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/proyecto-tomas-ruiz-diaz-argentino/'}),
);

app.listen(process.env.PORT || 8080);*/
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const { setupRoutes } = require('./routes');
const pool = require('./db-config');

const PORT = process.env.DB_PORT || 5000;

app.set('port', (process.env.PORT || 5000));
pool.getConnection(function (err, conn) {
  if (err) {
    console.error(`error connecting${err.stack}`);
  } else {
    console.log(`connected as id ${conn.threadId}`);
  }
  /*   pool.releaseConnection(conn); */
});

app.get('/', function(request, response) {
  var result = 'App is running'
  response.send(result);
}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port ', app.get('port'));
});

app.use(cors());
app.use(express.json());

setupRoutes(app);

app.listen(PORT, () =>
  console.log(`Express server is running on port`)
);
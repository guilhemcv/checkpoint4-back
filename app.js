const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const { setupRoutes } = require('./routes');
const pool = require('./db-config');

const PORT = process.env.DB_PORT;

pool.getConnection(function (err, conn) {
  if (err) {
    console.error(`error connecting${err.stack}`);
  } else {
    console.log(`connected as id ${conn.threadId}`);
  }
  /*   pool.releaseConnection(conn); */
});

app.use(cors());
app.use(express.json());

setupRoutes(app);

app.listen(PORT, () =>
  console.log(`Express server is running`)
);
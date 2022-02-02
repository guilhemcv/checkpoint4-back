const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const { setupRoutes } = require('./routes');
const connection = require('./db-config');

const PORT = process.env.DB_PORT || 8000;

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log(
      'connected to database with threadId :  ' + connection.threadId
    );
  }
});

app.use(cors());
app.use(express.json());

setupRoutes(app);

app.listen(PORT, () =>
  console.log(`Express server is running on port ${PORT}`)
);
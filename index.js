const express = require('express');
const mongoose = require('mongoose');

const app = express();

const productRoutes = require('./src/routes/ProductRoute');
const studentRoutes = require('./src/routes/StudentRoutes');

app.use(express.json());

app.use('/', productRoutes, studentRoutes);

mongoose
  .connect('mongodb+srv://sophiebenadev_db_user:xXbOf5UqzxLUTe0P@firstbdd.wlt7qs0.mongodb.net/?appName=firstbdd')
  .then(() => console.log('Connecté à MongoDB'))
  .catch((error) => console.log(error));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
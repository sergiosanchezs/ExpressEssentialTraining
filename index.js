const express = require('express');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const path = require('path');
const data = require('./data/data.json');
dotenv.config(); // loading .env file

const app = express();
const PORT = process.env.PORT || 3000;

// this is for images folder on path /
app.use(express.static('public'));

// method to use JSON
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this is for images folder on path images
app.use('/images', express.static('images'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', (req, res) => {
  // get data first
  res.json(data);
});

// JSON data
// { "name": "JSON is cool" }
// URLEncoded data
// name=URLEncoded+is+cool

app.post('/newItem', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.get(
  '/item/:id',
  (req, res, next) => {
    // this is the middleware that pulls the data
    let userId = Number(req.params.id);
    console.log(userId);
    // console.log(data.find(user => user.id == userId));
    console.log(data[userId]);
    // middleware that uses the request object
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    // everything above is middleware
    res.json(data[userId]);
    next();
  },
  (req, res) => console.log('Did you get the right data?'),
);

app
  .route('/item')
  .get((req, res) => {
    // res.send(`A get request with /item route on port ${PORT}`),
    // res.download('images/rocket.jpg'),
    // res.redirect('http://www.linkedin.com'),
    // res.end(),
    throw new Error();
  })
  .post((req, res) => {
    console.log(req.body);
    res.send(req.body);
  })
  .put((req, res) => res.send(`A put request with /item route on port ${PORT}`))
  .delete((req, res) =>
    res.send(`A delete request with /item route on port ${PORT}`),
  );

// Error handling function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Red Alert! Red Alert!: ${err.stack}`);
});

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
  // console.log(data);
});

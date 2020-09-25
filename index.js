const express = require('express');
const dotenv = require('dotenv');
const data = require('./data/data.json');
dotenv.config(); // loading .env file

const app = express();
const PORT = process.env.PORT || 3000;

// this is for images folder on path /
app.use(express.static('public'));

// this is for images folder on path images
app.use('/images', express.static('images'));

app.get('/', (req, res) => {
  // get data first
  res.json(data);
});

app.get(
  '/item/:id',
  (req, res, next) => {
    let userId = Number(req.params.id);
    console.log(userId);
    // console.log(data.find(user => user.id == userId));
    console.log(data[userId]);
    res.json(data[userId]);
    next();
  },
  (req, res) => console.log('Did you get the right data?'),
);

app
  .route('/item')
  .get(
    (req, res) => res.send(`A get request with /item route on port ${PORT}`),
    // res.download('images/rocket.jpg'),
    // res.redirect('http://www.linkedin.com'),
    // res.end(),
  )
  .post((req, res) =>
    res.send(`A post request with /item route on port ${PORT}`),
  )
  .put((req, res) => res.send(`A put request with /item route on port ${PORT}`))
  .delete((req, res) =>
    res.send(`A delete request with /item route on port ${PORT}`),
  );

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
  // console.log(data);
});

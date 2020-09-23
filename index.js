// import express = require('express');
import express from 'express';

const app = express();
// console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));

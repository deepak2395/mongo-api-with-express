const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = 'mongodb+srv://<user>:<pass>@back-api-1uqs2.mongodb.net/iAuthor?retryWrites=true&w=majority'

//const dbRoute = "mongodb+srv://<user>:<pass>@cluster0-rwgsz.azure.mongodb.net/test?retryWrites=true&w=majority";

// connects our back end code with the database
mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

let db = mongoose.connection;

db.once('open', () => {
  console.log('connected to the database')
  /*  // define Schema
   var BookSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    star: String
  });

  // compile schema to model
  var Book = mongoose.model('Book1', BookSchema);

  // a document instance
  var book1 = new Book({ name: 'Introduction to Mongoose12', price: 1021, quantity: 2521, star: '32star' });

  // save model to database
  book1.save(function (err, book) {
    if (err) return console.error(err);
    console.log(book.name + " saved to bookstore collection.");
  }); */

  // define Schema
  var BookSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
  });

  // compile schema to model
  var Book = mongoose.model('Book', BookSchema, 'docupload');

  // documents array
  var books = [{ name: 'Mongoose Tutorial1', price: 101, quantity: 251 },
  { name: 'NodeJS tutorial1', price: 151, quantity: 51 },
  { name: 'MongoDB Tutorial1', price: 201, quantity: 21 }];

  // save multiple documents to the collection referenced by Book Model
 /*  Book.collection.insertMany(books, function (err, docs) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
    }
  }); */

  Book.find((err, data) => {
    if (err) {
      return { success: false, error: err }
    } else {
      console.log({ success: true, data: data })
      return { success: true, data: data }
    }
  });

  //console.log(JSON.stringify(db.bookstore.find()))
});

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/dd', (req, res) => {
  return res.json({ success: true, data: 'dzfsdg' });
});


// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, message, phone } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.phone = phone;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


const Animal = require('./Animal');

router.post('/putanimal', (req, res) => {
  const newAnimal = new Animal({
    name: 'a',
    isEndangered: true
  })
  newAnimal
    .save()
    .then(item => console.log(item))
    .catch(err => console.log("err " + err));
});


const Publisher = require('./Publisher');

const Game = require('./Game');

router.post('/createPublisher', (req, res) => {
  createPublisher(req.body.companyName, req.body.firstParty, req.body.website)
});

router.post('/createGame', (req, res) => {
  createGame(req.body.title, req.body.publisher)
});

router.post('/listGames', async (req, res) => {
  var val = await listGames()
  res.send(val)
});


async function createPublisher(companyName, firstParty, website) {
  const newpublisher = new Publisher({
    companyName,
    firstParty,
    website
  });

  const result = await newpublisher.save();
  console.log(result);
}

async function createGame(title, publisher) {
  const newgame = new Game({
    title,
    publisher
  });

  const result = await newgame.save();
  console.log(result);
}

async function listGames() {
  return new Promise(async (resolve, reject) => {
    const games = await Game
      .find()
      .populate('publisher')
      .select('title publisher');
    console.log(games);
    resolve(games)
  })
}


// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
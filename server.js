const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const Link = require('./Link');
const Meta = require('./Meta');
const Endnote = require('./Endnote');
const Html = require('./Html');
const Xml = require('./Xml');

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
});

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
/* app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); */

app.use(bodyParser.json({
  limit: '80mb'
}));
app.use(bodyParser.urlencoded({
  limit: '80mb',
  extended: true,
  parameterLimit: 1000000
}));
app.use(logger('dev'));


router.post('/createlink', (req, res) => {
  let newLink = new Link();

  const { title, xml, html, endnote, metadata } = req.body;

  newLink.title = title;
  newLink.xml = xml;
  newLink.html = html;
  newLink.endnote = endnote;
  newLink.metadata = metadata;
  newLink.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/createendnote', (req, res) => {
  let newEndnote = new Endnote();

  const { EndnoteContent } = req.body;

  newEndnote.EndnoteContent = EndnoteContent;
  newEndnote.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/createmeta', (req, res) => {
  let newMeta = new Meta();

  const { MetaContent } = req.body;

  newMeta.MetaContent = MetaContent;
  newMeta.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/createxml', (req, res) => {
  let newXml = new Xml();

  const { XmlContent } = req.body;

  newXml.XmlContent = XmlContent;
  newXml.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/createhtml', (req, res) => {
  let newHtml = new Html();

  const { HtmlContent } = req.body;

  newHtml.HtmlContent = HtmlContent;
  newHtml.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


router.post('/getlink', (req, res) => {
  // let getLink = new Link();

  const varq = Link.find({ title: 'Demo_A_0001.xml' }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  }).populate('xml')/* .populate({ path: 'xml', select: 'XmlContent' }) */
 
/*   .populate('Endnote').populate('xml').populate({ select: 'XmlContent' }).populate('Metadata').exec();
  ({ path: 'members', select: 'name band' }) */
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
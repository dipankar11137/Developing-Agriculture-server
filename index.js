const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yow9vhz.mongodb.net/?retryWrites=true&w=majority`;

const uri =
  'mongodb+srv://developing_agriculture:Ok7qWBeRv9jhBPTJ@cluster0.tkczuor.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    // console.log("database connect");

    const productsCollection = client
      .db('developingAgriculture')
      .collection('products');
    const buyProductsCollection = client
      .db('developingAgriculture')
      .collection('buy');

    // get products
    app.get('/products', async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });
    // post all products
    app.post('/products', async (req, res) => {
      const newProducts = req.body;
      const result = await productsCollection.insertOne(newProducts);
      res.send(result);
    });
    // all products filter by  category
    app.get('/product/:productsCategory', async (req, res) => {
      const productsCategory = req.params.productsCategory;
      const query = { productsCategory };
      const cursor = productsCollection.find(query);
      const item = await cursor.toArray();
      res.send(item);
    });
    // Delete one Products
    app.delete('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productsCollection.deleteOne(query);
      res.send(result);
    });

    // get all services by id
    app.get('/buy/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const products = await productsCollection.findOne(query);
      res.send(products);
    });

    // post Buy products
    app.post('/buyProduct', async (req, res) => {
      const newProducts = req.body;
      const result = await buyProductsCollection.insertOne(newProducts);
      res.send(result);
    });
    // get all buy products
    app.get('/bookProducts', async (req, res) => {
      const query = {};
      const cursor = buyProductsCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });

    // Delete one buy Products
    app.delete('/bookProducts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await buyProductsCollection.deleteOne(query);
      res.send(result);
    });
    // get buy by email
    app.get('/buyProducts/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = buyProductsCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running Developing Agriculture ');
});

app.listen(port, () => {
  console.log('Developing Agriculture  server is running ');
});

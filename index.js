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
    // const jobCollection = client.db('dailyNeeds').collection('jobs');
    // const userCollection = client.db('dailyNeeds').collection('users');
    // const allServicesCollection = client
    //   .db('dailyNeeds')
    //   .collection('services');
    // const bookingCollection = client
    //   .db('dailyNeeds')
    //   .collection('bookingServices');

    // // // // // // // // // // // // //

    // // // post User  buyProduct
    // app.post('/user', async (req, res) => {
    //   const newProduct = req.body;
    //   const result = await userCollection.insertOne(newProduct);
    //   res.send(result);
    // });
    // // get User
    // app.get('/users', async (req, res) => {
    //   const query = {};
    //   const cursor = userCollection.find(query);
    //   const mainProducts = await cursor.toArray();
    //   res.send(mainProducts);
    // });

    // //                    Jobs
    // // get Jobs
    // app.get('/jobs', async (req, res) => {
    //   const query = {};
    //   const cursor = jobCollection.find(query);
    //   const jobs = await cursor.toArray();
    //   res.send(jobs);
    // });
    // // post Jobs
    // app.post('/jobs', async (req, res) => {
    //   const newProduct = req.body;
    //   const result = await jobCollection.insertOne(newProduct);
    //   res.send(result);
    // });
    // // g

    // // //                        ALl services
    // // All Services Collection
    // app.post('/allServices', async (req, res) => {
    //   const newProduct = req.body;
    //   const result = await allServicesCollection.insertOne(newProduct);
    //   res.send(result);
    // });

    // // get all services
    // app.get('/allServices', async (req, res) => {
    //   const query = {};
    //   const cursor = allServicesCollection.find(query);
    //   const mainProducts = await cursor.toArray();
    //   res.send(mainProducts);
    // });
    // // all service filter by service category
    // app.get('/allServices/:service', async (req, res) => {
    //   const service = req.params.service;
    //   const query = { service };
    //   const cursor = allServicesCollection.find(query);
    //   const user = await cursor.toArray();
    //   res.send(user);
    // });
    // // get all services by id
    // app.get('/allServicesId/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const products = await productsCollection.findOne(query);
    //   res.send(products);
    // });
    // // // Delete one Service
    // app.delete('/allServices/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await allServicesCollection.deleteOne(query);
    //   res.send(result);
    // });
    // // post  book services
    // app.post('/bookService', async (req, res) => {
    //   const newProduct = req.body;
    //   const result = await bookingCollection.insertOne(newProduct);
    //   res.send(result);
    // });
    // // get Book Service
    // app.get('/bookService', async (req, res) => {
    //   const query = {};
    //   const cursor = bookingCollection.find(query);
    //   const mainProducts = await cursor.toArray();
    //   res.send(mainProducts);
    // });
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

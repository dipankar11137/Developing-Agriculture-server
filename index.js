const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

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

    const productsCollection = client
      .db('developingAgriculture')
      .collection('products');

    // get products
    app.get('/products', async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });
    // all products filter by  category
    app.get('/product/:productsCategory', async (req, res) => {
      const productsCategory = req.params.productsCategory;
      const query = { productsCategory };
      const cursor = productsCollection.find(query);
      const item = await cursor.toArray();
      res.send(item);
    });
    // all products filter by  id
    // app.get('/productId/:_id', async (req, res) => {
    //   const productsCategory = req.params._id;
    //   const query = { _id };
    //   const cursor = productsCollection.find(query);
    //   const item = await cursor.toArray();
    //   res.send(item);
    // });
    // // get product by id
    // app.get('/product/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const products = await productsCollection.findOne(query);
    //   res.send(products);
    // });
    // post all products
    app.post('/products', async (req, res) => {
      const newProducts = req.body;
      const result = await productsCollection.insertOne(newProducts);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running development-agriculture-e-serve ');
});

app.listen(port, () => {
  console.log('development-agriculture-e-serve  server is running ');
});

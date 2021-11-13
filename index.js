
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0.m7hfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
	const productCollection = client.db("johnsCamera").collection("products");
	const allProductsCollection = client.db("johnsCamera").collection("allProducts");
	const reviewCollection = client.db("johnsCamera").collection("review");

	console.log('database connected successfully, yey!');

	// products Api
	app.get("/products", async (req, res) => {
		const result = await productCollection.find({}).toArray();
		res.send(result);
	});


	// allProducts Api

	app.get("/allProducts", async (req, res) => {
		const result = await allProductsCollection.find({}).toArray();
		res.send(result);
	});

	// add service

	app.post("/review", async (req, res) => {
		const result = await reviewCollection.insertOne(req.body);
		res.send(result);
		console.log(result);
	});

	// get all reviews
	app.get("/allReview", async (req, res) => {
		const result = await reviewCollection.find({}).toArray();
		res.send(result);
		console.log(result);
	});


});



// async function run() {
// 	try {
// 		await client.connect();
// 		const database = client.db('johnsCamera');
// 		const productCollection = database.collection('products');
// 		const allProductsCollection = database.collection('allProducts');

// 		const reviewCollection = database.collection('addReview');

// 		console.log('database connected successfully, yey!');

// 		// users: get
// 		// users : post 


// 		// get products api 
// 		app.get('/products', async (req, res) => {
// 			const cursor = productCollection.find({});
// 			const products = await cursor.toArray();
// 			res.send(products);
// 		})

// 		// get allProducts api 
// 		app.get('/allProducts', async (req, res) => {
// 			const cursor = allProductsCollection.find({});
// 			const allProducts = await cursor.toArray();
// 			res.send(allProducts);
// 		})

// 	}
// 	finally {
// 		// await client.close();
// 	}

// }
// run().catch(console.dir);


app.get('/', (req, res) => {
	res.send('Johns Camera Server is running')
})


app.listen(port, () => {
	console.log('running sever on port', port);
})


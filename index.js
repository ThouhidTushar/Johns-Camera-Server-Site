
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
	const orderCollection = client.db("johnsCamera").collection("orders");



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


	// single product

	app.get("/singleProduct/:id", async (req, res) => {
		// console.log(req.params.id);
		const result = await productCollection
			.find({ _id: ObjectId(req.params.id) })
			.toArray();
		res.send(result[0]);
		// console.log(result[0]);
	})


	// confirm order
	app.post("/confirmOrder", async (req, res) => {
		const result = await orderCollection.insertOne(req.body);
		res.send(result);
	});

	// my confirmOrder

	app.get("/myOrders/:email", async (req, res) => {
		const result = await orderCollection
			.find({ email: req.params.email })
			.toArray();
		res.send(result);
	});

	// delete order

	app.delete("/deleteOrder/:id", async (req, res) => {
		const result = await orderCollection.deleteOne({
			_id: ObjectId(req.params.id),
		});
		res.send(result);
	});


	app.delete("/deleteAllOrder/:id", async (req, res) => {
		const result = await orderCollection.deleteOne({
			_id: ObjectId(req.params.id),
		});
		res.send(result);
	});


	// add review

	app.post("/review", async (req, res) => {
		const result = await reviewCollection.insertOne(req.body);
		res.send(result);

	});

	// get all reviews
	app.get("/allReview", async (req, res) => {
		const result = await reviewCollection.find({}).toArray();
		res.send(result);

	});


	// get all Orders
	app.get("/allOrders", async (req, res) => {
		const result = await orderCollection.find({}).toArray();
		res.send(result);
		console.log(result);
	});

});


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


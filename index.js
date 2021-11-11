
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0.m7hfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
	try {
		await client.connect();
		const database = client.db('johnsCamera');
		const productCollection = database.collection('products');
		const productCollection = database.collection('allProducts');

		console.log('database connected successfully');

		// get products api 
		app.get('/products', async (req, res) => {
			const cursor = productCollection.find({});
			const products = await cursor.toArray();
			res.send(products);
		})

		// get allProducts api 
		app.get('/allProducts', async (req, res) => {
			const cursor = allProductCollection.find({});
			const allProducts = await cursor.toArray();
			res.send(allProducts);
		})

	}
	finally {
		// await client.close();
	}

}
run().catch(console.dir);


app.get('/', (req, res) => {
	res.send('Johns Camera Server is running')
})

// app.get('/hello', (req, res) => {
// 	res.send('hello updated here')
// })

app.listen(port, () => {
	console.log('running sever on port', port);
})


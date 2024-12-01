// Database id , pass -> CoffeeMaster, DPlisWNUxzRsbgaB

// server(backend) -> start (Deafult)
const express = require('express');
const cors = require('cors');
const app=express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// for data encryption
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// to show the data encription in the server side console

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);


// const uri = "mongodb+srv://CoffeeMaster:DPlisWNUxzRsbgaB@cluster0.fqi16.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fqi16.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 console.log(uri);


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // GET (Read) - DB theke data gula nie server a dekhate hobe
    app.get('/coffee',async (req,res)=>{
      // find multiple data
        const cursor = coffeeCollection.find({});
        const result = await cursor.toArray();
        res.json(result); 
    });

    // DB -  Create DB Connection --
    const coffeeCollection = client.db('coffeeDB').collection('Coffee');

    // POST (Creat) - Form (client sider) er data gula server a (backend) pathabo - s1
    app.post('/coffee',async (req,res)=>{
        const newCoffee = req.body;
        console.log(newCoffee);
        // post request er data gula mongoDB te save kore
         const result = await coffeeCollection.insertOne(newCoffee);
         res.json(result);
    });
 
    // DELETE (Delete) - DB theke data gula delete kore server a dekhate hobe
    app.delete('/coffee/:id',async (req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      // single delete
      const result = await coffeeCollection.deleteOne(query);
      res.json(result);
    });

    // PUT - UPDATE - DB theke data gula update kore server a dekhate hobe
    app.get('/coffee/:id',async (req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      // single data find
      const result = await coffeeCollection.findOne(query);
      res.json(result);
    });


    // PUT - UPDATE  - DB theke data gula update kore server a dekhate hobe
    app.put('/coffee/:id',async (req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};
      const updatedCoffee = req.body;
      console.log(updatedCoffee);

      const coffee = {
        $set: {
          name: updatedCoffee.name,
          quantity: updatedCoffee.quantity,
          supplier: updatedCoffee.supplier,
          taste: updatedCoffee.taste,
          category: updatedCoffee.category,
          details: updatedCoffee.details,
          photo: updatedCoffee.photo,
        },
      };
      // sigle data update
      const result = await coffeeCollection.updateOne(filter,coffee,options);
      res.send(result);
    })  



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
















// server(backend) -> start (Deafult)
app.get('/', (req, res) => {
    res.send('Espresso Emporium making server is running');
});




// server(backend) -> start (Deafult)
app.listen(port, () => {
    console.log(`Coffee server is running on port ${port}`);
});
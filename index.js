const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;


// user :vacationPlanner ,pass :ip4yl8gT8YeIDd54

// middleware
app.use(cors());
app.use(express.json());

// connection with mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qaigm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {
        await client.connect();
        // console.log('connected to mongodb');
        const database = client.db("ruksatVacationPlanner");
        const serviceCollection = database.collection('serviceInfo');

// GET Services API
app.get('/services' , async(req, res) =>{
    const cursor = serviceCollection.find({});
    const services = await cursor.toArray();
    res.send(services);
  
})
// GET Single Service
app.get('/services/:id' , async(req, res)=>{
    const id = req.params.id;
    // console.log('geeting single id');
    const query = {_id : ObjectId(id)};
    const service = await serviceCollection.findOne(query);
    res.json(service);

})
// POST API
app.post('/services' , async( req, res) =>{
    const service = req.body;
    // console.log('hit the post api',service);
    const result = await serviceCollection.insertOne(service);
    res.json(result);
})


    }
    finally{
        // await client.close();
    }

}

run().catch(console.dir);


// testing on server
app.get('/', (req, res) =>{
    res.send('Welcome to my VACATION  server');
})

// server running check
app.listen(port , ()=>{
    console.log('Running Vacation Server on port', port);
})
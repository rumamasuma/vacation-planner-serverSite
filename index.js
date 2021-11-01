const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

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
        const bookingCollection = database.collection('serviceBooking');

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
 
//    GET API for Booking
app.get('/booking' , async(req, res) =>{
    const cursor = bookingCollection.find({});
    const bookingResult = await cursor.toArray();
    res.json(bookingResult);

})


// POST API FOR BOOKINGS
app.post('/booking', async(req, res) =>{
     const booking = req.body;
    // console.log('hit the post api for booking', booking);
   const result = await bookingCollection.insertOne(booking);
   res.json(result);

})
// DELETE API
 app.delete('/booking/:id', async(req, res) =>{
     const id = req.params.id;
     const query = {_id : ObjectId(id)};
     const result = await bookingCollection.deleteOne(query);
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
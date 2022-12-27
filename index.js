const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
require('dotenv').config()


//setup mongodb
// dbuser name: foodService
// dbuser password: Nfjkb8oebzOepDG5


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b986vqn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    const foodCollection = client.db("foodServices").collection("foods")

    const foodReviewCollection = client.db("foodServices").collection("reviews")
    app.get('/services', async (req, res) => {
      const query = {}
      const cursor = foodCollection.find(query).limit(3)
      const result = await cursor.toArray()
      res.send(result)


    })
    app.get('/servicesDetails', async (req, res) => {
      const query = {}
      const cursor = foodCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)

    })


    app.get('/viewDetails/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await foodCollection.findOne(query)
      res.send(result)
    })

    app.post('/reviews', async (req, res) => {
      const info = req.body;
      console.log(info)
      const result = await foodReviewCollection.insertOne(info)
      console.log(result)
      res.send(result)
    })

    app.get('/singleReviews', async(req,res)=>{
      const query = {serviceId: "serviceId"}
      const result = await foodReviewCollection.find(query).toArray()
      res.send(result)
      
    })

    app.get('/myReviews', async(req,res)=>{
      const query= {}
      const result = await foodReviewCollection.find(query).toArray()
      res.send(result)
    })


  }
  finally {

  }


}
run().catch(error => console.log(error))

app.get('/', (req, res) => {
  res.send('server setup sucessfully')

})
app.listen(port, () => console.log(`server setup completely ${port}`))
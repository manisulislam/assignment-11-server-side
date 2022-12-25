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


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b986vqn.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try{
    const foodCollection = client.db("foodServices").collection("foods")
    
    


  }
  finally{

  }
  

}
run().catch(error => console.log(error))

app.get('/', (req, res)=>{
    res.send('server setup sucessfully')

})
app.listen(port , ()=> console.log(`server setup completely ${port}`))
const  express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require("body-parser");
const morgan = require("morgan");

const MONGODB_URI = process.env.MONGODB_URI
const port = process.env.PORT;

//Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));

//Importing Routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')
const transactionRoutes = require('./routes/transactions')

//Router Middlewares
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/transactions', transactionRoutes);

//Pinging route
app.get("/ping", (req, res) => res.status(200).send("Welcome to genesys bank!"));


app.use("**",(req, res) =>res.status(404).send({message: "Route not found"}))

app.use((error, req, res, next) =>{
    console.log(error);
    res.status(400).send({message: "something went wrong", error: error})
  })

  //Listening to server
app.listen(port, async () => {
    try {
     await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
      });
      console.log(`:::Connected to MongoDB Database`);
  
    } catch (error) {
      console.log(`::: Could not connect to database`);
    }
  
    console.log(`Server is running...listening on http://localhost:${port}`);
    });
const  express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require("body-parser");
const morgan = require("morgan");

const MONGODB_URI = process.env.MONGODB_URI
const port = process.env.PORT || 8080;

//Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

//Importing Routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/users')
const transactionRoutes = require('./routes/transactions')

//Router Middlewares
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);


app.get("/ping", (req, res) => res.status(200).send("Welcome!"));

app.use("**",(req, res) =>res.status(404).send({message: "Route not found"}))

app.use((error, req, res, next) =>{
    console.log(error);
    res.status(400).send({message: "something went wrong", error: error})
  })

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
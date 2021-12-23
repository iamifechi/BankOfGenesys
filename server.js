const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:',{

})


const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.post('/api/register', async(req, res)=>{
    console.log(req.body)
    res.json({ status : 'ok'})
})



app.listen(8080, ()=>{
    console.log('Server is running...listening on port 8080')
})
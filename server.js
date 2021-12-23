const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost:27017/register-user-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json())

app.get('/ping', (req, res)=>{
    console.log("::: in the server :::")
    res.status(200).send("Welcome!")
})

app.post('/api/register', async(req, res)=>{
    console.log(req.body)
    const {email, username, password : plainPassWord} = req.body
    const password = await bcrypt.hash(plainPassWord, 10)

    try{
        const response = await User.create({
            email,
            username,
            password
        })
        console.log('User registeration successful', response)
    }catch (error){
        console.log(error)
        return res.json({status: 'error'})
    }

    res.json({ status : 'ok'})
})



app.listen(8080, ()=>{
    console.log('Server is running...listening on port 8080')
})
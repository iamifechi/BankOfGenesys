const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{ type: String, required: true, unique: true},
    username:{ type: String, required: true, unique: true},
    password:{ type: String, required: true}
},
    { collection: 'users'}
)

const model = mongoose.model('userSchema', userSchema)

module.exports = model
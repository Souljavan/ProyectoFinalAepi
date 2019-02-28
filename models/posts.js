const mongoose =require('mongoose');
const Schema = mongoose.Schema

let PostsSchema = new Schema ({
    Titular: String,
    imagen: String,
    texto: String,
    categoria: {type: Schema.Types.ObjectId, ref:'Categories'}
    })

module.exports = mongoose.model('Posts', PostsSchema);
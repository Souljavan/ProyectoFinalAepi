const mongoose =require('mongoose');
const Schema = mongoose.Schema

let CategoriesSchema = new Schema ({
    nombre:String,
    descripcion:String
    })

module.exports = mongoose.model('categories', CategoriesSchema);
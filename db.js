let mongoose =require('mongoose');

// Base de datos MLab
//Usuario: Blogmongo
//Password: mongo12345
let mongoUrl ='mongodb://Blogmongo:mongo12345@ds239055.mlab.com:39055/blogproyectofinalmena';

mongoose.connect(mongoUrl,{ useNewUrlParser: true });
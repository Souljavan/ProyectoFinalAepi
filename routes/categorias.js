var express = require('express');
var router = express.Router();
const categoriesmodel = require("../models/categories")

/* Ruta para listar las categorias */
router.get('/', function(req, res) {
    categoriesmodel.find((err, categorias) => {
        if (err) return res.json({ error: err.message });
        res.render('Categorias/listacategorias', { categori: categorias });
    });
});


/* Ruta Formulario nueva categoria */
router.get('/new', function(req, res) {
    res.render('Categorias/nuevacategoria');
});


/* Ruta Creacion nueva categoria */
router.post('/create', function (req, res) {
    categoriesmodel.create(req.body, (err, Categoria) => {
        if (err) return res.json({ error: err.message });
        res.redirect('/Categorias');
    })
    
});

/* Ruta Formulario edita categoria */
router.get('/edit/:idCategoria', function (req, res) {
    categoriesmodel.findById(req.params.idCategoria, (err, categoria) => {
        if (err) return res.json({ error: err.message });
        res.render('Categorias/editacategoria', {
            category:categoria
        })
    })
});
  

/* Ruta edita categoria */
router.post('/edit', function (req, res) {
    categoriesmodel.findById(req.body.id, (err, category) => {
              
        category.nombre = req.body.nombre;
        category.descripcion = req.body.descripcion;
        category.save()
        if (err) return res.json({ error: err.message });
        res.redirect('/Categorias');

    })
});
  
/* Ruta Formulario elimina categoria */
router.get('/delete/:idCategoria', function (req, res) {
    categoriesmodel.findById(req.params.idCategoria, (err, categoria) => {
        if (err) return res.json({ error: err.message });
        res.render('Categorias/borracategoria', {
            category:categoria
        })
    })
});

/* Ruta elimina categoria */
router.post('/delete', function (req, res) {
    categoriesmodel.deleteOne({ _id: req.body.id }, (err, category)=> {
        if (err) return res.json({ error: err.message });
        res.redirect('/Categorias');
    })
});

/*******/
/* API */
/*******/


/* Ruta muestra categorias */
router.get('/api/', function(req, res) {
    categoriesmodel.find((err, categorias) => {
        if (err) return res.json({ error: err.message });
        res.json(categorias);
    });
});

/* Ruta muestra categoria por id */
router.get('/api/:idCategoria', function (req, res) {
    categoriesmodel.findById(req.params.idCategoria, (err, categoria) => {
        if (err) return res.json({ error: err.message });
        res.json(categoria);
    });
});

/* Ruta crea categorias */

router.post('/api/create', (req, res) => {
    if ((req.body.nombre == "") || (req.body.descripcion == "") || (req.body.id == "")) {
        res.json({error:"La peticion de los campos id,nombre, descripcion  no puede estar vacia"});
    }
    else if ((req.body.nombre == null) || (req.body.descripcion == null) || (req.body.id == null)){
        res.json({error:"La peticion debe llegar con los campos id,nombre, descripcion"});
    }
    else {
         categoriesmodel.create(req.body , (err, categoria)=>{
            if (err) return res.json({ error: err.message });
            res.json(categoria);
        })
    }
})

/* Ruta edita categorias */

router.post('/api/edit', (req, res) => {
    if ((req.body.nombre == "") || (req.body.descripcion == "") || (req.body.id == "")) {
        res.json({error:"La peticion de los campos id,nombre, descripcion  no puede estar vacia"});
    }
    else if ((req.body.nombre == null) || (req.body.descripcion == null) || (req.body.id == null)){
        res.json({error:"La peticion debe llegar con los campos id,nombre, descripcion"});
    }
    else {
        categoriesmodel.findById(req.body.id, (err, category) => {
        category.nombre = req.body.nombre;
        category.descripcion = req.body.descripcion;
        category.save()
        if (err) return res.json({ error: err.message });
        res.json(category);
        })
    }

})


/* Ruta elimina categorias */

router.post('/api/delete', (req, res) => {
    if ((req.body.id == "")|| (req.body.id == null)){
        res.json({error:"En la peticion de borrar el campo ID debe existir y no llegar vacio"});
    }
    else {
        categoriesmodel.deleteOne({ _id: req.body.id }, (err, category)=> {
            if (err) return res.json({ error: err.message });
            res.json(category);
        })
    }
    

})

module.exports = router;

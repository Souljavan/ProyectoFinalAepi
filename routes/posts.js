var express = require('express');
var router = express.Router();
const Postsmodel = require("../models/posts")
const categoriesmodel = require("../models/categories")


/* Ruta para listar todos los posts */
router.get('/', function(req, res) {
  Postsmodel.find((err, Posts) => {
    if (err) return res.json({ error: err.message });
      res.render('Posts/listaposts', { Post: Posts });
  });
});

/* Ruta para listar un post concreto */
router.get('/post/:idposts', function (req, res) {
  Postsmodel.findById(req.params.idposts, (err, Posts) => {
      if (err) return res.json({ error: err.message });
      categoriesmodel.findById(Posts.categoria, (err, categoria) => {//Busco nombre categoria
          if (err) return res.json({ error: err.message });  
          res.render('Posts/listapost', { Post: Posts, categor:categoria });
      })
  });
});



/* Ruta Formulario nuevo Post */
router.get('/new', function (req, res) {
  // Cargo Formulario nuevo Post pasandole las categorias
  categoriesmodel.find((err, categorias) => {
    if (err) return res.json({ error: err.message });
    res.render('Posts/nuevopost', { categori: categorias });
  });
  
});

/* Ruta Creacion nuevo Post */
router.post('/create', function (req, res) {
  Postsmodel.create(req.body, (err, Post) => {
    if (err) return res.json({ error: err.message });
    res.redirect('/posts');
})

})



/* Ruta Formulario elimina Post */
router.get('/delete/:idposts', function (req, res) {
  Postsmodel.findById(req.params.idposts, (err, Posts) => {
    if (err) return res.json({ error: err.message });
      res.render('Posts/borrapost', {  Post: Posts })
  })
});


/* Ruta elimina post */
router.post('/delete', function (req, res) {
  Postsmodel.deleteOne({ _id: req.body.id }, (err, Posts)=> {
      if (err) return res.json({ error: err.message });
      res.redirect('/Posts');
  })
});





/* Ruta Formulario edita categoria */
router.get('/edit/:idPost', function (req, res) {
  Postsmodel.findById(req.params.idPost, (err, Posts) => {
      if (err) return res.json({ error: err.message });
      
      categoriesmodel.findById(Posts.categoria, (err, categoriapost) => {//Busco nombre categoria del post editado
        if (err) return res.json({ error: err.message });
        
        categoriesmodel.find((err, categorias) => { //Busco resto de categorias
          if (err) return res.json({ error: err.message });
          res.render('Posts/editapost', { Post: Posts, categorypost:categoriapost, categor:categorias })
        });
          
      })
  })
});


/* Ruta edita categoria */
router.post('/edit', function (req, res) {
  Postsmodel.findById(req.body.id, (err, Post) => {
            
    Post.Titular = req.body.Titular;
    Post.imagen = req.body.imagen;
    Post.texto = req.body.texto;
    Post.categoria = req.body.categoria;
    Post.save()
      if (err) return res.json({ error: err.message });
      res.redirect('/Posts');

  })
});






/*******/
/* API */
/*******/

/* Ruta para listar todos los posts */
router.get('/api', function (req, res) {
  Postsmodel.find((err, Posts) => {
    if (err) return res.json({ error: err.message });
    res.json(Posts);
  });
});

/* Ruta para listar un post concreto */
router.get('/api/:idposts', function (req, res) {
  Postsmodel.findById(req.params.idposts, (err, Posts) => {
      if (err) return res.json({ error: err.message });
      res.json(Posts);
      })
  });

  /* Ruta Creacion nuevo Post */
router.post('/api/create', function (req, res) {
  if ((req.body.Titular == "") || (req.body.texto == "") || (req.body.imagen == "")|| (req.body.categoria == "")) {
    res.json({error:"Los campos Titular, texto, imagen y categoria  no pueden estar vacios"});
  }
  else if ((req.body.Titular == null) || (req.body.texto == null) || (req.body.imagen == null)|| (req.body.categoria == null)) {
    res.json({error:"La peticion debe contener los campos Titular, text, categoria e imagen"});
  }
  else {
    Postsmodel.create(req.body, (err, Post) => {
      if (err) return res.json({ error: err.message });
      res.json(Post);
    })
}

})



/* Ruta edita categoria */
router.post('/api/edit', function (req, res) {
  if ((req.body.Titular == "") || (req.body.texto == "") || (req.body.imagen == "") || (req.body.categoria == "")|| (req.body.id == "")) {
    res.json({ error: "Los campos id,Titular, texto, imagen y categoria  no pueden estar vacios" });
  }
  else if ((req.body.Titular == null) || (req.body.texto == null) || (req.body.imagen == null) || (req.body.categoria == null)|| (req.body.id == null )) {
    res.json({ error: "La peticion debe contener los campos Id, Titular, text, categoria e imagen" });
  }
  else {

    Postsmodel.findById(req.body.id, (err, Post) => {
            
      Post.Titular = req.body.Titular;
      Post.imagen = req.body.imagen;
      Post.texto = req.body.texto;
      Post.categoria = req.body.categoria;
      Post.save()
      if (err) return res.json({ error: err.message });
      res.json(Post);

    })
  }
});


/* Ruta elimina post */
router.post('/api/delete', function (req, res) {
  if ((req.body.id == "") || (req.body.id == null)) {
    res.json({ error: "En la peticion de borrar el campo ID debe existir y no llegar vacio" });
  } else {
    Postsmodel.deleteOne({ _id: req.body.id }, (err, Posts) => {
      if (err) return res.json({ error: err.message });
      res.json(Posts);
    })
  }
});

module.exports = router;

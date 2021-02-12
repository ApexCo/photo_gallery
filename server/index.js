const express = require('express');
const path = require('path');
// const compression = require('compression');
const controllers = require('./controllers/galleryController.js');

const app = express();
const port = 3017;

// app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/:id', express.static(path.join(__dirname, '../client/dist')));

app.use('/:id/bundle', express.static(path.join(__dirname, '../client/dist/bundle.js')));

app.get('/api/galleries/:id', controllers.getGalleryById);
app.post('/api/properties', controllers.addProperty);
app.delete('/api/properties/:id', controllers.deleteProperty);
app.patch('/api/properties/:id', controllers.updateProperty);

app.listen(port);

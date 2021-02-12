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
app.get('/api/properties/:id', controllers.getPropertyById);
app.get('/api/photos/:id', controllers.getPhotoById);
app.post('/api/properties', controllers.addProperty);
app.post('/api/photos', controllers.addPhoto);
app.delete('/api/properties/:id', controllers.deleteProperty);
app.patch('/api/properties/:id', controllers.updateProperty);

app.listen(port);

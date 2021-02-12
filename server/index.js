const express = require('express');
const path = require('path');
const controllers = require('./controllers/galleryController.js');

const app = express();
const port = 3017;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/:id', express.static(path.join(__dirname, '../client/dist')));
app.use('/:id/bundle', express.static(path.join(__dirname, '../client/dist/bundle.js')));

app.get('/api/galleries/:id', controllers.getGalleryById);
app.get('/api/properties/:id', controllers.getPropertyById);
app.get('/api/photos/:id', controllers.getPhotoById);
app.post('/api/properties', controllers.addItem);
app.post('/api/photos', controllers.addItem);
app.delete('/api/properties/:id', controllers.deleteItem);
app.delete('/api/photos/:id', controllers.deleteItem);
app.patch('/api/properties/:id', controllers.updateItem);
app.patch('/api/photos/:id', controllers.updateItem);

app.listen(port);

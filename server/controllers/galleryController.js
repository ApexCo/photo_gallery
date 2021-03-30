const models = require('../models/galleryModels.js');

const getGalleryById = (req, res) => {
  const { id } = req.params;
  models.getGalleryById(id, (err, docs) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(docs);
    }
  });
};

const getPropertyById = (req, res) => {
  const { id } = req.params;
  models.getPropertyById(id, (err, docs) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(docs);
    }
  });
};

const getPhotoById = (req, res) => {
  const { id } = req.params;
  models.getPhotoById(id, (err, docs) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(docs);
    }
  });
};

const addItem = (req, res) => {
  const item = req.body;
  let endpoint = req.url.match(/\/api\/(.+)\/|\/api\/(.+)/);
  endpoint = endpoint[1] || endpoint[2];
  models.addItem(endpoint, item, (err, response) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).json(response);
    }
  });
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  let endpoint = req.url.match(/\/api\/(.+)\/|\/api\/(.+)/);
  endpoint = endpoint[1] || endpoint[2];
  models.deleteItem(endpoint, id, (err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
};

const updateItem = (req, res) => {
  const { id } = req.params;
  const item = req.body;
  let endpoint = req.url.match(/\/api\/(.+)\/|\/api\/(.+)/);
  endpoint = endpoint[1] || endpoint[2];
  models.updateItem(endpoint, item, id, (err, response) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(response);
    }
  });
};

module.exports = {
  getGalleryById,
  getPropertyById,
  getPhotoById,
  addItem,
  deleteItem,
  updateItem,
};

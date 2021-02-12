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

const addProperty = (req, res) => {
  const property = req.body;
  models.addProperty(property, (err, response) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).json(response);
    }
  });
};

module.exports = {
  getGalleryById,
  addProperty,
};

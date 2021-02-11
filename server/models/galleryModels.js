const { pool, query } = require('../../database');

const getGalleryById = (id, cb) => {
  query(`SELECT *
  FROM properties
  LEFT JOIN photos
  ON photos.property_id = properties.id where properties.id = $1;`, [id], (err, docs) => {
    if (err) {
      cb(err);
    } else {
      cb(err, docs);
    }
  });
};

module.exports = {
  getGalleryById,
};

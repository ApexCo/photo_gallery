const { query } = require('../../database');

const getGalleryById = (id, cb) => {
  query(`SELECT *
  FROM properties
  LEFT JOIN photos
  ON photos.property_id = properties.id where properties.id = $1;`, [id], (err, response) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      console.log(response.rows);
      cb(null, response.rows);
    }
  });
};

module.exports = {
  getGalleryById,
};

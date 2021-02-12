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
      const data = {};
      if (response.rows.length !== 0) {
        const record = response.rows[0];
        data.location = { city: record.city, state: record.stateloc, country: record.country };
        data._id = record.property_id;
        data.title = record.title;
        data.reviews = record.reviews;
        data.rating = record.rating;
        data.isSuperhost = record.is_superhost;
        const gallery = [];
        response.rows.forEach((row) => {
          gallery.push({
            property_id: row.property_id,
            photo_name: row.photo_name,
            photo_url: row.photo_url,
            thumbnail_url: row.thumbnail_url,
            photo_description: row.photo_description,
            is_verified: row.is_verified,
          });
        });
        data.gallery = gallery;
      }
      cb(null, [data]);
    }
  });
};

module.exports = {
  getGalleryById,
};

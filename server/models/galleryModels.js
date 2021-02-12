/* eslint-disable no-underscore-dangle */
const { query } = require('../../database');

const getGalleryById = (id, cb) => {
  query(`SELECT *
  FROM properties
  LEFT JOIN photos
  ON photos.property_id = properties.id WHERE properties.id = $1;`, [id], (err, response) => {
    if (err) {
      cb(err);
    } else {
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

const getPropertyById = (id, cb) => {
  query(`SELECT *
  FROM properties
  WHERE id = $1
  LIMIT 1;`, [id], (err, response) => {
    if (err) {
      cb(err);
    } else {
      const data = {};
      if (response.rows.length !== 0) {
        const record = response.rows[0];
        data.location = { city: record.city, state: record.stateloc, country: record.country };
        data._id = record.property_id;
        data.title = record.title;
        data.reviews = record.reviews;
        data.rating = record.rating;
        data.isSuperhost = record.is_superhost;
        data.gallery = [];
      }
      cb(null, [data]);
    }
  });
};

const addProperty = (property, cb) => {
  const keys = Object.keys(property);
  const values = [];
  const numberedKeys = keys.map((key, i) => {
    values.push(property[key]);
    return `$${i + 1}`;
  });
  query(`INSERT INTO
  properties(${keys.join(', ')})
  VALUES(${numberedKeys.join(', ')})
  returning *`, values, (err, response) => {
    if (err) {
      cb(err);
    } else {
      cb(null, response.rows[0]);
    }
  });
};

const deleteProperty = (id, cb) => {
  query(`DELETE FROM
  properties WHERE id=$1;`, [id], (err, response) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      cb(null, response.rows[0]);
    }
  });
};

const updateProperty = (changes, id, cb) => {
  const values = [id];
  const keys = Object.entries(changes).map((entry, i) => {
    values.push(entry[1]);
    return `${entry[0]} = $${i + 2}`;
  });
  query(`UPDATE properties SET
  ${keys.join(', ')}
  WHERE id = $1
  returning *`, values, (err, response) => {
    if (err) {
      cb(err);
    } else {
      cb(null, response.rows[0]);
    }
  });
};

module.exports = {
  getGalleryById,
  getPropertyById,
  addProperty,
  deleteProperty,
  updateProperty,
};

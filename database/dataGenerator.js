const faker = require('faker');
const fs = require('fs');

const generateGallery = (property_id) => {
  const photos = [];
  const total = Math.floor(Math.random() * 16) + 5;
  const start = Math.floor(Math.random() * 1000) + 1;
  for (let i = 1; i <= total; i += 1) {
    photos.push({
      property_id,
      photo_name: faker.random.words(),
      photo_url: `https://abphotos.s3-us-west-2.amazonaws.com/image${(start + i) % 1000}.jpg`,
      photo_description: faker.random.words(Math.floor(Math.random() * 4) + 2),
      is_verified: faker.random.boolean(),
    });
  }
  if (property_id % 10000 === 0) {
    console.log(`Created gallery #${property_id}`);
  }
  return photos;
};

const generateProperty = () => {
  const property = {
    title: faker.random.words(Math.floor(Math.random()) + 2),
    reviews: Math.floor(Math.random() * (30) + 10),
    rating: Math.random() * 2 + 3,
    is_superhost: faker.random.boolean(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
  };
  return property;
};

const photoWriter = fs.createWriteStream('/users/adambrent/Desktop/allPhotos.csv');
photoWriter.write('property_id,photo_name,photo_url,photo_description,is_verified\n', 'utf8');

function writeAllPhotos(totalGalleries, writer, encoding = 'utf8', callback) {
  let i = 0;
  function write() {
    let ok = true;
    do {
      i += 1;
      const gallery = generateGallery(i);
      let data = '';
      for (let photo = 0; photo < gallery.length; photo++) {
        let { property_id, photo_name, photo_url, photo_description, is_verified } = gallery[photo];
        data += `${property_id},${photo_name},${photo_url},${photo_description},${is_verified}\n`;
      }
      if (i === totalGalleries) {
        writer.write(data, encoding, callback);
      } else {
      // see if we should continue, or wait
      // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i < totalGalleries && ok);
    if (i < totalGalleries) {
    // had to stop early!
    // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

const propertyWriter = fs.createWriteStream('/users/adambrent/Desktop/properties.csv');
propertyWriter.write('title,reviews,rating,is_superhost,city,state,country\n', 'utf8');

function writeAllProperties(totalProperties, writer, encoding = 'utf8', callback) {
  let i = 0;
  function write() {
    let ok = true;
    do {
      i += 1;
      const property = generateProperty();
      let data = '';
      let { title, reviews, rating, is_superhost, city, state, country } = property;
      data += `${title},${reviews},${rating.toFixed(2)},${is_superhost},${city},${state},${country}\n`;
      if (i === totalProperties) {
        writer.write(data, encoding, callback);
      } else {
      // see if we should continue, or wait
      // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i < totalProperties && ok);
    if (i < totalProperties) {
    // had to stop early!
    // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

writeAllPhotos(1000000, photoWriter, 'utf8', () => { console.log('Done with photos!'); });
writeAllProperties(1000000, propertyWriter, 'utf8', () => { console.log('Done with properties!'); });

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

const generateUser = () => {
  const user = {
    username: faker.internet.userName().toLowerCase(),
    pw: faker.internet.password(8),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  };
  return user;
};

const generatePropertyList = (user_id) => {
  const title = faker.random.words(Math.floor(Math.random() * 2) + 1);
  const propertyList = {
    user_id,
    title: `${title[0].toUpperCase() + title.slice(1)} List`,
  };
  return propertyList;
};

const generatePropertyListProperties = (list_id) => {
  const properties = [];
  const allProperties = [];
  let total;
  const weighted = Math.floor(Math.random() * 2);
  weighted === 0 ? total = Math.floor(Math.random() * 2) + 1 : total = Math.floor(Math.random() * 20) + 1;
  for (let i = 1; i <= total; i += 1) {
    let property_id = Math.floor(Math.random() * 1000000) + 1;
    while (allProperties.includes(property_id)) {
      property_id = Math.floor(Math.random() * 1000000) + 1;
    }
    allProperties.push(property_id);
    properties.push({
      property_id,
      list_id,
    });
  }
  return properties;
};

// const photoWriter = fs.createWriteStream('/users/adambrent/Desktop/allPhotos.tsv');
// photoWriter.write('property_id\tphoto_name\tphoto_url\tphoto_description\tis_verified\n', 'utf8');

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
        data += `${property_id}\t${photo_name}\t${photo_url}\t${photo_description}\t${is_verified}\n`;
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

// const propertyWriter = fs.createWriteStream('/users/adambrent/Desktop/properties.tsv');
// propertyWriter.write('title\treviews\trating\tis_superhost\tcity\tstate\tcountry\n', 'utf8');

function writeAllProperties(totalProperties, writer, encoding = 'utf8', callback) {
  let i = 0;
  function write() {
    let ok = true;
    do {
      i += 1;
      const property = generateProperty();
      let data = '';
      let { title, reviews, rating, is_superhost, city, state, country } = property;
      data += `${title}\t${reviews}\t${rating.toFixed(2)}\t${is_superhost}\t${city}\t${state}\t${country}\n`;
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

// const userWriter = fs.createWriteStream('/users/adambrent/Desktop/users.tsv');
// userWriter.write('username\tpw\tfirstname\tlastname\n', 'utf8');

function writeAllUsers(totalUsers, writer, encoding = 'utf8', callback) {
  let i = 0;
  let allUsernames = [];
  function write() {
    let ok = true;
    do {
      i += 1;
      let user = generateUser();
      while (allUsernames.includes(user.username)) {
        user = generateUser();
      }
      allUsernames.push(user.username);
      let data = '';
      let { username, pw, firstname, lastname } = user;
      data += `${username}\t${pw}\t${firstname}\t${lastname}\n`;
      if (i === totalUsers) {
        writer.write(data, encoding, callback);
      } else {
      // see if we should continue, or wait
      // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i < totalUsers && ok);
    if (i < totalUsers) {
    // had to stop early!
    // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

// const propertyListWriter = fs.createWriteStream('/users/adambrent/Desktop/propertyLists.tsv');
// propertyListWriter.write('user_id\ttitle\n', 'utf8');

function writeAllPropertyLists(totalPropertyLists, writer, encoding = 'utf8', callback) {
  let i = 0;
  function write() {
    let ok = true;
    do {
      i += 1;
      const propertyList = generatePropertyList(Math.floor(Math.random() * 100000) + 1);
      let data = '';
      const { user_id, title } = propertyList;
      data += `${user_id}\t${title}\n`;
      if (i === totalPropertyLists) {
        writer.write(data, encoding, callback);
      } else {
      // see if we should continue, or wait
      // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i < totalPropertyLists && ok);
    if (i < totalPropertyLists) {
    // had to stop early!
    // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

const propertyListPropertiesWriter = fs.createWriteStream('/users/adambrent/Desktop/propertyListProperties.tsv');
propertyListPropertiesWriter.write('list_id\tproperty_id\n', 'utf8');

function writeAllPropertyListProperties(totalListedProperties, writer, encoding = 'utf8', callback) {
  let i = 0;
  function write() {
    let ok = true;
    do {
      i += 1;
      const properties = generatePropertyListProperties(i);
      let data = '';
      for (let property = 0; property < properties.length; property++) {
        let { list_id, property_id } = properties[property];
        data += `${list_id}\t${property_id}\n`;
      }
      if (i === totalListedProperties) {
        writer.write(data, encoding, callback);
      } else {
      // see if we should continue, or wait
      // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i < totalListedProperties && ok);
    if (i < totalListedProperties) {
    // had to stop early!
    // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

// writeAllPhotos(1000000, photoWriter, 'utf8', () => { console.log('Done with photos!'); });
// writeAllProperties(1000000, propertyWriter, 'utf8', () => { console.log('Done with properties!'); });
// writeAllUsers(100000, userWriter, 'utf8', () => { console.log('Done with users!'); });
// writeAllPropertyLists(25000, propertyListWriter, 'utf8', () => { console.log('Done with property lists!'); });
writeAllPropertyListProperties(25000, propertyListPropertiesWriter, 'utf8', () => { console.log('Done with property list properties!'); });

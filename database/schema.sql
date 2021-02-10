CREATE TABLE properties (
  id serial,
  title VARCHAR(100) NOT NULL,
  reviews int DEFAULT 0,
  rating real DEFAULT null,
  is_superhost BOOLEAN DEFAULT false,
  city VARCHAR(100) NOT NULL,
  stateLoc VARCHAR(25) NOT NULL,
  country VARCHAR(60) NOT NULL,
  created_date timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE photos (
  id serial,
  property_id int NOT NULL,
  photo_name VARCHAR(100),
  photo_url VARCHAR(100),
  thumbnail_url VARCHAR(100) DEFAULT NULL,
  photo_description VARCHAR(100),
  is_verified BOOLEAN DEFAULT false,
  created_date timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id serial,
  username VARCHAR(30) NOT NULL,
  pw VARCHAR(20) NOT NULL,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  created_date timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE (username)
);

CREATE TABLE property_lists (
  id serial,
  user_id int NOT NULL,
  title VARCHAR(60) NOT NULL,
  created_date timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE property_list_properties (
  id serial,
  list_id int NOT NULL,
  property_id int NOT NULL,
  created_date timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (list_id) REFERENCES property_lists(id) ON DELETE CASCADE,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
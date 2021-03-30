# photo_gallery

> Photo Gallery Module for HomeHub

## Related Projects

  - https://github.com/The-Casuals/checkout-service
  - https://github.com/The-Casuals/reviews
  - https://github.com/The-Casuals/photo_carousel


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## API Documentation

**POST** `/api/property/`  
*Creates a new property record with the info contained in the request body.*  
Success Status Code: `201`  

**GET** `/api/property/:{propertyId}`  
*Gets the info for the property with the specified id. Will also support query by title and location.*  

Example: `GET /api/property/?title=sunny%20villa`  
Path Parameters:
`propertyId`: property record id  
Success Status Code: `200`  
Returns: JSON  
```json
  {
    id: int,
    title: string,
    reviews: int,
    rating: int,
    is_superhost: bool,
    city: string,
    stateLoc: string,
    country: string,
    created_date: date
  }
```  

**PATCH** `/api/property/:{propertyId}`  
*Updates the record for the specified property id with the fields and values to update contained in the request body.*  
Path Parameters:
`propertyId`: property record id  
Success Status Code: `200`  

**DELETE** `/api/property/:{propertyId}`  
*Deletes the property record for the specified id. Associated photo records (with this id as the foreign key) will also be deleted.*
Path Parameters:
`propertyId`: property record id  
Success Status Code: `204`  

**POST** `/api/photos/`
*Creates a new photo record with the info contained in the request body.*
Success Status Code: `201`  

**GET** `/api/photos/:{propertyId}`
*Gets the photo records that have the specified property id as their foreign key. Will also support query by name and description.*  
Example: GET /api/photo/?name=`porch%20view`  
Path Parameters:
`propertyId`: property record id  
Success Status Code: `200`  
Returns: JSON  
```json
  {
    id: int,
    property_id: int,
    photo_name: string,
    photo_url: string,
    thumbnail_url: string,
    photo_description: string,
    is_verified: bool, 
    created_date: date
  }
```  

**PATCH** `/api/photos/:{photoId}`
*Updates the record for the specified photo id with the fields and values to update contained in the request body.*  
Path Parameters:
`photoId`: photo record id  
Success Status Code: `200`

**DELETE** `/api/property/:{photoId}`  
*Deletes the photo record for the specified id.*  
Path Parameters:  
`photoId`: photo record id  
Success Status Code: `204`

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

/**
 * MongoDB URI
 * Link for database access
 */
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/star_fighter';


/**
 * MongoDB DBName
 * name of database
 */
const MONGODB_DBNAME = 'star_fighter';

/**
 * Mongo Client
 * get connection from database
 */
const MongoClient = require('mongodb').MongoClient;


module.exports = {
    MONGODB_URI,
    MONGODB_DBNAME,
    MongoClient,
};
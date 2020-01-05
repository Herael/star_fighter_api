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


/**
 * dateNow
 * get and format the current datetime
 */
function dateNow(){
    var dateNow = new Date();
    var day = dateNow.getDate();
    var month = dateNow.getMonth();
    var year = dateNow.getFullYear();
    var hour = dateNow.getHours();
    var minutes = dateNow.getMinutes();
    var seconds = dateNow.getSeconds();
    month += 1;
    const dateFormatted = formatDigits(day) + '/' + formatDigits(month) + '/' + year + ' ' + formatDigits(hour) + ':' + formatDigits(minutes) + ':' + formatDigits(seconds);
    return dateFormatted;
}

/**
 * formatDigits
 * add 0 when number < 10
 */
function formatDigits(number){
    if(number < 10) {
        number = ('0' + number);
    }
    return number;
}

/**
 *
 * @param min
 * @param max
 * @returns {number}
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    MONGODB_URI,
    MONGODB_DBNAME,
    MongoClient,
    dateNow,
    getRandomInt,
};
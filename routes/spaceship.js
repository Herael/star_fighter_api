const {MONGODB_URI} = require('../tools');
const {MONGODB_DBNAME} = require('../tools');
const {MongoClient} = require('../tools');
const {dateNow} = require('../tools');
const ObjectId = require('mongodb').ObjectId;


const express = require('express');
const router = express.Router();
const MONGODB_COLLEC = 'spaceship';


/**
 * @GET | GET Spaceship
 *
 * @Route("/all")
 */
router.get('/all', async function(req, res, next) {

    const client = new MongoClient(MONGODB_URI);
    client.connect().then(async function(response) {
       const db = client.db(MONGODB_DBNAME);
       const spaceships = await db.collection(MONGODB_COLLEC).find().toArray();

        client.close();
        res.status(200).send({
            error: null,
            spaceships: spaceships
        });
    }).catch(function (error) {
        console.log("Error server " + error.stack);
        res.status(500).send({
            error: error.stack,
            spaceships: []
        });
    });
});


/**
 * @POST | CREATE Spaceship
 *
 * @Route("/add")
 */
router.post('/add', async function(req, res){

    const name = req.body.name;

    const client = new MongoClient(MONGODB_URI);
    client.connect()
        .then(async function(response){

            const db = client.db(MONGODB_DBNAME);
            const spaceshipWithSameName = await db.collection(MONGODB_COLLEC).find({ name: req.body.name }).toArray();

            if(spaceshipWithSameName.length > 0){
                res.status(400).send({
                    error: 'This spaceship already exists'
                });
            } else {
                const newSpaceship = {
                    name: name,
                    createdAt: dateNow(),
                };
                await db.collection(MONGODB_COLLEC).insertOne(newSpaceship);
                const spaceshipInDb = await db.collection(MONGODB_COLLEC).find({ name: name}).toArray();
                console.log(spaceshipInDb[0]);
                res.status(200).send({
                    error: null,
                    _id: ObjectId(spaceshipInDb[0]._id),
                    name: spaceshipInDb[0].name,
                    createdAt: spaceshipInDb[0].createdAt
                });
            }
            client.close();
        }).catch(function(error){
        res.status(500).send({
            error: error
        });
        client.close();
    });
});


module.exports = router;
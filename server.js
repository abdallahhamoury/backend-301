const axios = require('axios');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json());
const Schema = require('./Schema');
const apiDataHandler = require('./ApiData');

mongoose.connect(`${process.env.MONGO_LINK}`, { useNewUrlParser: true, useUnifiedTopology: true });

const FavModul = mongoose.model('FavList', Schema);

server.get('/test', testhandler);
server.get('/getDataFromApi', apiDataHandler);
server.get('/getfav', getFavHandler);
server.post('/addFav', addFavHandler);
server.delete('/deleteFav/:favId', deleteFavHandler);
server.put('/updateFav/:favId', updateFavHandler);

function getFavHandler(req, res) {
    let email = req.query.email;
    FavModul.find({ email: email }, (err, resultData) => {
        if (err) {
            console.log("error in geting data");
        } else {
            console.log(resultData);
            res.send(resultData);
        }
    })
}

async function addFavHandler(req, res) {
    console.log("in addFav handler");
    console.log(req.body);
    let email = req.query.email;
    let { name, image, price } = req.body;
    await FavModul.create({ name, image, price, email });
    res.send("data added")
}

async function deleteFavHandler(req, res) {
    let id = req.params.favId;
    FavModul.remove({ _id: id }, (err, deletedData) => {
        if (err) {
            console.log(err);
        } else {
            console.log("deleted", deletedData);
            getFavHandler(req, res);
        }
    })
}

async function updateFavHandler(req, res) {
    let id = req.params.favId;
    let { name, image, price, email } = req.body;
    FavModul.findByIdAndUpdate(id, { name, image, price, email }, (err, updateFav) => {
        if (err) {
            console.log("err");
        } else {
            console.log("data updated");
            getFavHandler(req, res);
        }
    })
}

function testhandler(req, res) {
    console.log("all is good");
}

server.listen(PORT, () => {
    console.log(`listen on PORT${PORT}`);
})